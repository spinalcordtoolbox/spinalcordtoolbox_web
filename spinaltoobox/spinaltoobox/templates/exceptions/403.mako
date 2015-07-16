<%inherit file="../main_template.mako"/>

<header id="head" class="secondary"></header>
<div class="container">

    <ol class="breadcrumb">
        <li><a href="${request.route_url('home')}">Home</a></li>
        <li class="active">Acess Denied</li>
    </ol>
    <div>
        <header class="page-header">
                <h1 class="page-title">403 Forbidden</h1>
            </header>
        <h2>You do not have permission to access this page!</h2>
        <h3>Try to <a href="${request.route_url('signin')}">Sign in</a>.</h3>


    </div>
</div>