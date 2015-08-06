<%inherit file="main_template.mako"/>

<link type="text/css" href="${request.static_url('spinalcordweb:static/css/bootstrap/dist/css/bootstrap.min.css')}" rel="Stylesheet"/>
<link type="text/css" href="${request.static_url('spinalcordweb:static/css/volume-viewer-demo.css')}" rel="Stylesheet"/>
<link type="text/css" href="${request.static_url('spinalcordweb:static/css/common.css')}" rel="Stylesheet"/>
<link type="text/css" href="${request.static_url('spinalcordweb:static/css/ui-darkness/jquery-ui-1.8.10.custom.css')}"
      rel="Stylesheet"/>

<header id="head" class="secondary"></header>
<!-- container -->
<div class="container-no-float">
    <div class="row">
    <!--upper selection bar-->
    <div id="brainbrowser-wrapper">
        <div id="volume-viewer">
            <div id="global-controls" class="volume-viewer-controls">

                <span class="control-heading">Volume selection:</span>
                <select id="volume-selection">
                </select>

                <span class="control-heading">Volume type:</span>
                <select id="volume-type">
                    <option value="structural">Structural</option>
                    <option value="functional">Functional</option>
                    <option value="file">Load your own volume!</option>
                </select>
                <span class="control-heading">Panel size:</span>
                <select id="panel-size">
                    <option value="64">64</option>
                    <option value="128">128</option>
                    <option value="256" SELECTED>256</option>
                    <option value="350">350</option>
                    <option value="512">512</option>
                </select>
            <span id="sync-volumes-wrapper">
              <input type="checkbox" class="button" id="sync-volumes"><label for="sync-volumes">Synchronize</label>
            </span>
                <span id="screenshot" class="button">Screenshot</span>

                <div id="volume-file" class="file-select">
                    <div>
                        <span class="control-heading">Header file: </span><input type="file" name="header-file"
                                                                                 id="header-file">
                    </div>
                    <div>
                        <span class="control-heading">Raw data file: </span><input type="file" name="raw-data-file"
                                                                                   id="raw-data-file">
                    </div>
                    <div id="volume-file-hint">
                        Use
                        <a href="scripts/minc2volume-viewer.js" target="_blank">minc2volume-viewer.js</a>
                        or
                        <a href="scripts/minc2volume-viewer.py" target="_blank">minc2volume-viewer.py</a>
                        to convert your MINC files into the header and raw data files required by the volume viewer
                        (requires
                        installation of the <a href="http://www.bic.mni.mcgill.ca/ServicesSoftware/MINC"
                                               target="_blank">MINC tools</a>).
                    </div>
                    <div id="volume-file-submit">
                        <span class="button">Load</span>
                    </div>
                </div>
                <div class="instructions">Shift-click to drag. Hold ctrl to measure distance.</div>
            </div>
        </div>
    </div>

    <!-- Overlay Viewer and Control Inputs -->
    <script id="overlay-ui-template" type="x-volume-ui-template">
        <div id="overlay" class="col-sm-12">
        <!--Overlay Viewer-->
        <!--@TODO: change the style to be responsive - cf old brainbrowser custom-->
        <div id="overlay_viewer" class="overlay-viewer-display ">
        </div>

        <!--Control input for overlay-->

        <div class="volume-viewer-controls volume-controls overlay-volume-controls">
            <div id="intensity-value-div-{{VOLID}}">
                <span class="control-heading" data-volume-id="{{VOLID}}">
                  Value:
                </span>
                <span id="intensity-value-{{VOLID}}" class="intensity-value"></span>
            </div>

            <div class="form-inline blend-div" data-volume-id="{{VOLID}}">
                <span class="control-heading" id="blend-heading{{VOLID}}">Blend (0.0 to 255.0):</span>
                <input class="control-inputs" value="0" id="blend-val-min"/>
                <input class="control-inputs" value="100" id="blend-val-max"/>

                <div id="blend-slider" class="slider volume-viewer-blend"></div>
                <input type="checkbox" class="button" id="switch_button"><label
                    for="switch_button">switch_button</label>

                <input type="text" id="order_input"/>
                <input type="button" class="btn-xs" value="OK" id="order_button"/>

            </div>

            <div class="contrast-div" data-volume-id="{{VOLID}}">
                <span class="control-heading" id="contrast-heading{{VOLID}}">Contrast (0.0 to 2.0):</span>
                <input class="control-inputs" value="1.0" id="contrast-val"/>

                <div id="contrast-slider" class="slider volume-viewer-contrast"></div>
            </div>

            <div > <!--style="display: flex;"-->
            <div id="sortable">
                <ul id="list_sortable">
                </ul>
            </div>
            <span class="glyphicon glyphicon-trash trash" ></span>
            </div>
            <div class="brightness-div" data-volume-id="{{VOLID}}">
                <span class="control-heading" id="brightness-heading{{VOLID}}">Brightness (-1 to 1):</span>
                <input class="control-inputs" value="0" id="brightness-val"/>

                <div id="brightness-slider" class="slider volume-viewer-brightness"></div>
            </div>
        </div>
    </div>
    </script>

    <!-- Single Volume Viewer (hided) and Control Inputs-->
    <script id="volume-ui-template" type="x-volume-ui-template">

        <div id="volume-panel-{{VOLID}}">

            <!--Normal viewer - Always Hidden-->
            <div class="volume-viewer-display" style="display:none;">
            </div>


            <!--Control input for classic viewers-->

            <div class="volume-viewer-controls volume-controls single-volume-controls" >
                <div class="coords">
                    <div class="control-heading" id="voxel-coordinates-heading-{{VOLID}}">
                        Voxel Coordinates:
                    </div>
                    <div class="voxel-coords" data-volume-id="{{VOLID}}">
                        I:<input id="voxel-i-{{VOLID}}" class="input-sm control-inputs">
                        J:<input id="voxel-j-{{VOLID}}" class="input-sm control-inputs">
                        K:<input id="voxel-k-{{VOLID}}" class="input-sm control-inputs">
                    </div>
                    <div class="control-heading" id="world-coordinates-heading-{{VOLID}}">
                        World Coordinates:
                    </div>
                    <div class="world-coords" data-volume-id="{{VOLID}}">
                        X:<input id="world-x-{{VOLID}}" class="input-sm control-inputs">
                        Y:<input id="world-y-{{VOLID}}" class="input-sm control-inputs">
                        Z:<input id="world-z-{{VOLID}}" class="input-sm control-inputs">
                    </div>
                </div>

                <div id="intensity-value-div-{{VOLID}}">
                    <span class="control-heading" data-volume-id="{{VOLID}}">
                      Value:
                    </span>
                    <span id="intensity-value-{{VOLID}}" class="input-sm intensity-value"></span>
                </div>

                <div id="color-map-{{VOLID}}">
                    <span class="control-heading" id="color-map-heading-{{VOLID}}">
                      Color Map:
                    </span>
                </div>

                <div id="color-map-file-{{VOLID}}" class="color-map-file-div" data-volume-id="{{VOLID}}">
                    <span class="control-heading">Color map file: </span><input type="file"
                                                                                name="color-map-file-{{VOLID}}"
                                                                                class="color-map-file">
                </div>

                <div class="threshold-div" data-volume-id="{{VOLID}}">
                    <div class="control-heading">
                        Threshold:
                    </div>
                    <div class="thresh-inputs">
                        <input id="min-threshold-{{VOLID}}" class="input-sm control-inputs thresh-input-left"
                               value="0"/>
                        <input id="max-threshold-{{VOLID}}" class="input-sm control-inputs thresh-input-right"
                               value="255"/>
                    </div>
                    <div class="slider volume-viewer-threshold" id="threshold-slider-{{VOLID}}"></div>
                </div>

                <div id="time-{{VOLID}}" class="time-div" data-volume-id="{{VOLID}}" style="display:none">
                    <span class="control-heading">Time:</span>
                    <input class="control-inputs" value="0" id="time-val-{{VOLID}}"/>

                    <div class="slider volume-viewer-threshold" id="time-slider-{{VOLID}}"></div>
                    <input type="checkbox" class="button" id="play-{{VOLID}}"><label
                        for="play-{{VOLID}}">Play</label>
                </div>

                <div class="contrast-div" data-volume-id="{{VOLID}}">
                    <span class="control-heading" id="contrast-heading{{VOLID}}">Contrast (0.0 to 2.0):</span>
                    <input class="control-inputs" value="1.0" id="contrast-val"/>

                    <div id="contrast-slider" class="slider volume-viewer-contrast"></div>
                </div>

                <div class="brightness-div" data-volume-id="{{VOLID}}">
                    <span class="control-heading" id="brightness-heading{{VOLID}}">Brightness (-1 to 1):</span>
                    <input class="control-inputs" value="0" id="brightness-val"/>

                    <div id="brightness-slider" class="slider volume-viewer-brightness"></div>
                </div>

                <div class="alpha-div" data-volume-id="{{VOLID}}">
                    <span class="control-heading" id="alpha-heading{{VOLID}}">Alpha (0 to 1):</span>
                    <input class="control-inputs" value="1" id="alpha-val"/>

                    <div id="alpha-slider" class="slider volume-viewer-alpha"></div>
                </div>

                <div id="slice-series-{{VOLID}}" class="slice-series-div" data-volume-id="{{VOLID}}">
                    <div class="control-heading" id="slice-series-heading-{{VOLID}}">All slices:</div>
                    <span class="slice-series-button button" data-axis="xspace">Sagittal</span>
                    <span class="slice-series-button button" data-axis="yspace">Coronal</span>
                    <span class="slice-series-button button" data-axis="zspace">Transverse</span>
                </div>

            </div>

        </div>
    </script>

    <!--The Loader    -->

    <div class="col-lg-offset-5 col-md-offset-5 col-xs-offset-5" id="loading" style="display: none; margin-top: 10%;"><img
            src="${request.static_url('spinalcordweb:static/img/ajax-loader.gif')}"/></div>


    <div id="brainbrowser"></div>

    <input type="hidden" id='nii_path' value="${file_path}"/>
        </div>
</div>

<script src="${request.static_url('spinalcordweb:static/js/viewer/ui.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/viewer/brainbrowser/brainbrowser.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/viewer/brainbrowser/core/tree-store.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/viewer/brainbrowser/lib/config.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/viewer/brainbrowser/lib/utils.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/viewer/brainbrowser/lib/events.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/viewer/brainbrowser/lib/loader.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/viewer/brainbrowser/lib/color-map.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/viewer/brainbrowser/volume-viewer.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/viewer/brainbrowser/volume-viewer/lib/display.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/viewer/brainbrowser/volume-viewer/lib/panel.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/viewer/brainbrowser/volume-viewer/lib/utils.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/viewer/brainbrowser/volume-viewer/modules/loading.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/viewer/brainbrowser/volume-viewer/modules/rendering.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/viewer/brainbrowser/volume-viewer/volume-loaders/overlay.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/viewer/brainbrowser/volume-viewer/volume-loaders/minc.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/viewer/brainbrowser/volume-viewer/volume-loaders/nifti1.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/viewer/gunzip.min.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/volume-viewer.config.js')}"></script>
<script src="${request.static_url('spinalcordweb:static/js/volume-viewer-PolyCustom.js')}"></script>