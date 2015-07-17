<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="Willis Pinaud">
        <title>Spinal Cord Toolbox Web</title>
        <link rel="shortcut icon" href="${request.static_url('spinaltoobox:static/img/gt_favicon.png')}">
        <link rel="stylesheet" media="screen" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
        <link rel="stylesheet" href="${request.static_url('spinaltoobox:static/css/bootstrap.min.css')}">
        <link rel="stylesheet" href="${request.static_url('spinaltoobox:static/css/font-awesome.min.css')}">
        <!-- Custom styles for our template -->
        <link rel="stylesheet" href="${request.static_url('spinaltoobox:static/css/bootstrap-theme.css')}" media="screen">
        <link rel="stylesheet" href="${request.static_url('spinaltoobox:static/css/main.css')}">
        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
	<script src="${request.static_url('spinaltoobox:static/js/html5shiv.js')}" ></script>
	<script src="${request.static_url('spinaltoobox:static/js/respond.min.js')}" ></script>
	<![endif]-->

    </head>
    <body class="home">

        <!-- The nav-bar-->
        <%include file="nav_bar.mako"/>
        <!--/The nav-bar -->

        <div>
            <!-- this is where contents of template inheriting from this layout will be inserted -->
          ${next.body()}
            <!-- this is where contents of template inheriting from this layout will be inserted -->
        </div>

         <!-- The footer-->
        <%include file="footer.mako"/>
        <!--/The footer -->

        <!-- JavaScript libs are placed at the end of the document so the pages load faster -->

        <script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
        <script src="${request.static_url('spinaltoobox:static/js/headroom.min.js')}"></script>
        <script src="${request.static_url('spinaltoobox:static/js/jQuery.headroom.min.js')}"></script>
        <script src="${request.static_url('spinaltoobox:static/js/template.js')}"></script>
        <script src="${request.static_url('spinaltoobox:static/js/deform.js')}"></script>
        <script src="${request.static_url('spinaltoobox:static/js/viewer/jquery-1.6.4.min.js')}"></script>
        <script src="${request.static_url('spinaltoobox:static/js/viewer/jquery-ui-1.8.10.custom.min.js')}"></script>
        <script type="text/javascript">
            deform.load()
        </script>
        <script type="text/javascript">
            $("#view_more").click(function() {
                $('html, body').animate({
                    scrollTop: $("#more").offset().top
                }, 1200, "easeInOutExpo");
            });
        </script>
    </body>
</html>