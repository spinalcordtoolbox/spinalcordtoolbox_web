<%inherit file="main_template.mako"/>
<header id="head" class="secondary"></header>

<link rel="stylesheet" href="${request.static_url('server:static/css/form.css')}">

${form | n}

 <p><a href="${request.route_url('home')}">Go Back</a></p>

<script src="${request.static_url('server:static/js/deform.js')}"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="text/javascript">
   deform.load()
</script>