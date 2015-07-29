/*
 * BrainBrowser: Web-based Neurological Visualization Tools
 * (https://brainbrowser.cbrain.mcgill.ca)
 *
 * Copyright (C) 2011
 * The Royal Institution for the Advancement of Learning
 * McGill University
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * Author: Nicolas Kassis
 * Author: Tarek Sherif <tsherif@gmail.com> (http://tareksherif.ca/)
 * Author: Willis Pinaud <willispinaud@gmail.com>
 */

/**
 * Represents a blended volume
 */

(function () {
    "use strict";

    //Create a new instance of VolumeViewer
    var VolumeViewer = BrainBrowser.VolumeViewer;
    //A new canvas dedicated for plotting
    var image_creation_context = document.createElement("canvas").getContext("2d");
    //Declaration of the name of the overlay function as a child of volume_loaders
    //options.volumes include all the loaded volume
    VolumeViewer.volume_loaders.overlay = function (options, callback) {
        options = options || {};
        var volumes = options.volumes || [];

        var overlay_volume = {
            type: "overlay",
            position: {},
            position_continuous: {},
            header: volumes[0] ? volumes[0].header : {},
            intensity_min: 0,
            intensity_max: 255,
            volumes: [],
            blend_ratios: [],
            to_switch: [],
            to_hide: [],
            images_order: [0, 1, 2], //@TODO: change this to a true constant who will display all the slices
            mask_overlay: false,

            //return all the slices (x,y,z)
            slice: function (axis, slice_num, time) {
                slice_num = slice_num === undefined ? this.position[axis] : slice_num;
                time = time === undefined ? this.current_time : time;

                var overlay_volume = this;
                var slices = [];

                overlay_volume.volumes.forEach(function (volume) {
                    var slice = volume.slice(axis, slice_num, time);
                    slices.push(slice);
                });

                return {
                    height_space: slices[0].height_space,
                    width_space: slices[0].width_space,
                    slices: slices
                };
            },

            getSliceImage: function (slice, zoom, contrast, brightness) {
                zoom = zoom || 1;

                var slices = slice.slices;
                var images = [];
                var max_width = 0;
                var max_height = 0;

                slices.forEach(function (slice, i) {
                    var volume = overlay_volume.volumes[i];
                    var color_map = volume.color_map;
                    var intensity_min = volume.intensity_min;
                    var intensity_max = volume.intensity_max;

                    var error_message;

                    if (!color_map) {
                        error_message = "No color map set for this volume. Cannot render slice.";
                        overlay_volume.triggerEvent("error", {message: error_message});
                        throw new Error(error_message);
                    }

                    var source_image = image_creation_context.createImageData(slice.width, slice.height);

                    color_map.mapColors(slice.data, {
                        min: intensity_min,
                        max: intensity_max,
                        contrast: contrast,
                        brightness: brightness,
                        destination: source_image.data
                    });

                    max_width = Math.max(max_width, slice.width);
                    max_height = Math.max(max_height, slice.height);

                    images.push(source_image);

                });
                //Launch the blendImages function to get the stack of images in output
                return blendImages(
                    images,
                    overlay_volume.blend_ratios,
                    image_creation_context.createImageData(max_width, max_height),
                    overlay_volume.mask_overlay,
                    overlay_volume.to_switch,
                    overlay_volume.to_hide,
                    overlay_volume.images_order
                );
            },

            getIntensityValue: function (x, y, z, time) {
                x = x === undefined ? this.position.xspace : x;
                y = y === undefined ? this.position.yspace : y;
                z = z === undefined ? this.position.zspace : z;
                time = time === undefined ? this.current_time : time;

                var overlay_volume = this;
                var values = [];

                overlay_volume.volumes.forEach(function (volume) {
                    var header = volume.header;

                    if (x < 0 || x > header.xspace.space_length ||
                        y < 0 || y > header.yspace.space_length ||
                        z < 0 || z > header.zspace.space_length) {
                        values.push(0);
                    }

                    var slice = volume.slice("zspace", z, time);
                    var data = slice.data;
                    var slice_x, slice_y;

                    if (slice.width_space.name === "xspace") {
                        slice_x = x;
                        slice_y = y;
                    } else {
                        slice_x = y;
                        slice_y = z;
                    }

                    values.push(data[(slice.height_space.space_length - slice_y - 1) * slice.width + slice_x]);
                });

                return values.reduce(function (intensity, current_value, i) {
                    return intensity + current_value * overlay_volume.blend_ratios[i];
                }, 0);
            },

            setMaskOverlay: function (mask) {
                overlay_volume.mask_overlay = mask;
            }
        };

        volumes.forEach(function (volume) {
            overlay_volume.volumes.push(volume);
            overlay_volume.blend_ratios.push(1 / volumes.length);
        });

        if (BrainBrowser.utils.isFunction(callback)) {
            callback(overlay_volume);
        }
    };

    // Blend the pixels of several images using the alpha value of each
    function blendImages(images, blend_ratios, target, mask_overlay, to_switch, to_hide, images_order) {
        var num_images = images.length;
        var tmp = 0;

        if (num_images === 1) {
            return images[0];
        }

        //Switch two different position
        if (to_switch.length == 2) {
            console.log(to_switch);
            x = to_switch[0];
            y = to_switch[1];
            tmp = images[y];
            images[y] = images[x];
            images[x] = tmp;
        }

        var target_data = target.data;
        var width = target.width;
        var height = target.height;
        var y, x;
        var i;
        var image, image_data, pixel, alpha, current;
        var row_offset;

        //var first_image = images[0].data; //initialized with the first image as background

        //This will be used to keep the position in each image of its next pixel
        var image_iter = new Uint32Array(images.length);
        var alphas = new Float32Array(blend_ratios);

        for (y = 0; y < height; y += 1) {
            row_offset = y * width;

            for (x = 0; x < width; x += 1) {
                pixel = (row_offset + x) * 4;
                alpha = 0;

                //loop re-writed to plot images in the right order i = 0; i < cars.length; i++
                for (num_images in images_order) {
                    if (!($.inArray(images_order[num_images], to_hide) > -1)){
                        image = images[images_order[num_images]];

                        if (y < image.height && x < image.width)  {

                            image_data = image.data;

                            //current = image_iter[num_images];

                            //Red
                            if ((image_data[pixel] > blend_ratios[1])) {
                                target_data[pixel] = image_data[pixel];
                                target_data[pixel + 2] = image_data[pixel + 2];
                                target_data[pixel + 1] = image_data[pixel + 1];
                            }
                            /*//Green
                            if ((image_data[pixel + 1] > blend_ratios[1])) {
                                target_data[pixel + 1] = image_data[pixel + 1];
                            }
                            //Blue
                            if ((image_data[pixel + 2] > blend_ratios[1])) {
                                target_data[pixel + 2] = image_data[pixel + 2];
                            }*/

                            /*
                             if(mask_overlay){
                             var image_alpha = image_data[current + 3]/255*alphas[i];
                             //Red
                             target_data[pixel] = target_data[pixel]*(1-image_alpha) + image_data[current]*image_alpha;
                             //Green
                             target_data[pixel + 1] = target_data[pixel + 1]*(1-image_alpha) + image_data[current + 1]*image_alpha;
                             //Blue
                             target_data[pixel + 2] = target_data[pixel + 2]*(1-image_alpha) + image_data[current + 2]*image_alpha;
                             }
                             */


                            target_data[pixel + 3] = 255; //Time value @TODO: will be a problem with 4D volume...
                            //alpha = alphas[num_images];

                            //image_iter[num_images] += 4;
                        }
                    }
                }
            }
        }

        return target;

    }

}());

