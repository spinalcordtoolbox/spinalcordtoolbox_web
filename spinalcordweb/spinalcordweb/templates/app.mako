<%inherit file="main_template.mako"/>

<header id="head" class="secondary"></header>


<!DOCTYPE html>
<html>
  <head>
    <link href="/static/styles/foundation.css" rel="stylesheet" type="text/css">
    <link href="/static/styles/main.css" rel="stylesheet" type="text/css">
    <script src="/static/scripts/modernizr.js"></script>
    <link type="text/css" href="${request.static_url('spinalcordweb:static/css/volume-viewer-demo.css')}" rel="Stylesheet" />
    <link type="text/css" href="${request.static_url('spinalcordweb:static/css/common.css')}" rel="Stylesheet" />
    <link type="text/css" href="${request.static_url('spinalcordweb:static/css/ui-darkness/jquery-ui-1.8.10.custom.css')}" rel="Stylesheet" />
  </head>
  <body ng-app="app">
    <div ui-view>
      stuff goes here
    </div>

    <script src="/static/scripts/jquery.min.js"></script>
    <script src="/static/scripts/foundation.min.js"></script>
    <script src="/static/scripts/vendor.js"></script>
    <script src="/static/scripts/views.js"></script>
    <script src="/static/scripts/app.js"></script>
    <script src="/static/scripts/main.js"></script>

    
    <script>
     $(document).foundation();
    </script>


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
    <script src="${request.static_url('spinalcordweb:static/js/volume-viewer.js')}"></script>


  </body>
</html>
