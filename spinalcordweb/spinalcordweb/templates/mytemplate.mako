<!DOCTYPE html>
<html lang="${request.locale_name}">
  <head>
     <script type="text/javascript" src="${request.static_url('spinalcordweb:static//jquery.js')}"></script>
     <script type="text/javascript" src="${request.static_url('spinalcordweb:static/hello_ajax.js')}"></script>
  </head>
  <body>
    <h1>${project}</h1>
    <button onclick="do_some_ajax()">Do some ajax</button>
    <input type="text" value="Hello now.." id="ajax-me"/>
  </body>
</html>