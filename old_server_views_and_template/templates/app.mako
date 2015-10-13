
<header id="head" class="secondary"></header>


<!DOCTYPE html>
<html>
  <head>

    <link href="/static/styles/foundation.css" rel="stylesheet" type="text/css">
    <link href="/static/styles/main.css" rel="stylesheet" type="text/css">
    <script src="/static/scripts/modernizr.js"></script>
    <link rel="stylesheet" type="text/css" href="${request.static_url('server:static/css/bootstrap.min.css')}">
    <link rel="stylesheet" type="text/css" href="${request.static_url('server:static/jstree/themes/default/style.min.css')}">
  </head>
  <body ng-app="app">
    <div ui-view>
      stuff goes here
    </div>

    <script type="text/javascript" src="${request.static_url('server:static/jstree/jquery-1.11.3.min.js')}"></script>
    <script type="text/javascript" src="/static/scripts/foundation.min.js"></script>
    <script type="text/javascript" src="/static/scripts/vendor.js"></script>
    <script type="text/javascript" src="${request.static_url('server:static/jstree/jstree.js')}"></script>
    <script type="text/javascript" src="${request.static_url('server:static/jstree/jsTree.directive.js')}"></script>
    <script type="text/javascript" src="/static/scripts/views.js"></script>
    <script type="text/javascript" src="/static/scripts/app.js"></script>
    <script type="text/javascript" src="/static/scripts/main.js"></script>

    <script type="text/javascript" src="${request.static_url('server:static/jstree/jstree.js')}"></script>



    <script>
     $(document).foundation();
    </script>

  </body>
</html>
