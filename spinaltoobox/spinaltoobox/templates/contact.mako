<%inherit file="main_template.mako"/>

<header id="head" class="secondary"></header>

<!-- container -->
<div class="container">

    <ol class="breadcrumb">
        <li><a href="${request.route_url('home')}">Home</a></li>
        <li class="active">Contact us</li>
    </ol>

    <div class="row">

        <!-- Article main content -->
        <article class="col-sm-9 maincontent">
            <header class="page-header">
                <h1 class="page-title">Contact us</h1>
            </header>

            <p>
                We’d love to hear from you. Interested in working together? Fill out the form below with some info about your project and we will get back to you as soon as we can. Please allow a couple days for us to respond.
            </p>
            <br>
                <form action="mailto:youraddr@domain.tld" method="post" enctype="text/plain">
                    <div class="row">
                        <div class="col-sm-4">
                            <input class="form-control" type="text" placeholder="Name">
                        </div>
                        <div class="col-sm-4">
                            <input class="form-control" type="text" placeholder="Email">
                        </div>
                        <div class="col-sm-4">
                            <input class="form-control" type="text" placeholder="Phone">
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-sm-12">
                            <textarea placeholder="Type your message here..." class="form-control" rows="9"></textarea>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-sm-6">
                            <label class="checkbox"><input type="checkbox"> Sign up for newsletter</label>
                        </div>
                        <div class="col-sm-6 text-right">
                            <input class="btn btn-action" type="submit" value="Send message">
                        </div>
                    </div>
                </form>

        </article>
        <!-- /Article -->

        <!-- Sidebar -->
        <aside class="col-sm-3 sidebar sidebar-right">

            <div class="widget">
                <h4>Address</h4>
                <address>
                    2900 Boulevard Edouard-Montpetit, Montréal, QC H3T 1J4
                </address>
                <h4>Building</h4>
                <address>
                    École Polytechnique de Montréal
                </address>
            </div>

        </aside>
        <!-- /Sidebar -->

    </div>
</div>	<!-- /container -->

<section class="container-full top-space">
    <div id="map"></div>
</section>

<!-- Google Maps -->
<script src="https://maps.googleapis.com/maps/api/js?key=&amp;sensor=false&amp;extension=.js"></script>
<script src="${request.static_url('spinaltoobox:static/js/google-map.js')}"></script>