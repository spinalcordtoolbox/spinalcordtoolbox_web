<link rel="stylesheet" href="${request.static_url('spinaltoobox:static/css/form.css')}">
<%page args="form"/>

<div class="row widget">
    <div class="col-xs-12">
        <header class="page-header">
            <h1 class="page-title">The Toolbox</h1>
        </header>
    </div>
</div>
<div class="row widget toolbox">
    <div class="col-xs-12">
        <h4>Configure the toolbox.</h4>
        <p>${form | n}</p>
        <p><a href="${request.route_url('home')}">Go Back</a></p>

    </div>
    <div class="col-xs-12">
        <h4>Nice picture.</h4>
        <p><img src="http://news360x.fr/wp-content/uploads/2015/04/197jtJO820150228124411brain.jpg" alt=""></p>
        <p>Qui, debitis, ad, neque reprehenderit laborum soluta dolor voluptate eligendi enim consequuntur eveniet recusandae rerum? Atque eos corporis provident tenetur.</p>
    </div>
</div>

<script src="${request.static_url('spinaltoobox:static/js/deform.js')}"></script>
<script type="text/javascript">
    deform.load()
</script>



