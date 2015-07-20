<%inherit file="main_template.mako"/>

<!-- Header -->
<header id="head">
    <div class="container">
        <div class="row">
            <h1 class="lead">LIGHT, MULTIPLATFORM, FREE</h1>
            <p class="tagline">SpinalCordToolbox: an awesome toolbox developped by NeuroPoly</p>
            <p><a class="btn btn-default btn-lg" id="view_more" role="button">MORE INFO</a> <a class="btn btn-action btn-lg" href="${request.route_url('brainbrowser')}" role="button">GO TO VIEWER</a></p>
        </div>
    </div>
</header>
<!-- /Header -->
<!-- Intro -->
<div class="container text-center">
    <br>
    <br>
    <h2 class="thin">The best toolbox for spinal cord reconstruction.</h2>
    <p class="text-muted">
    The Spinal Cord Toolbox is a comprehensive and open-source library of analysis tools for MRI, FMRI and DTI of spinal cord imaging data. Future upgrades will include new versions of the template and other methods for processing multi-parametric MRI data.</p>
</div>
<!-- /Intro-->
<!-- Highlights - jumbotron -->
<p id="more"/>
<div class="jumbotron top-space">
    <div class="container">
        <h3 class="text-center thin">Reasons to use this toolbox</h3>
        <div class="row">
            <div class="col-md-3 col-sm-6 highlight">
                <div class="h-caption">
                    <h4><i class="fa fa-cogs fa-5"></i>Smart toolbox</h4>
                </div>
                <div class="h-body text-center">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque aliquid adipisci aspernatur. Soluta quisquam dignissimos earum quasi voluptate. Amet, dignissimos, tenetur vitae dolor quam iusto assumenda hic reprehenderit?</p>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 highlight">
                <div class="h-caption">
                    <h4><i class="fa fa-flash fa-5"></i>Web integration</h4>
                </div>
                <div class="h-body text-center">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, commodi, sequi quis ad fugit omnis cumque a libero error nesciunt molestiae repellat quos perferendis numquam quibusdam rerum repellendus laboriosam reprehenderit! </p>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 highlight">
                <div class="h-caption">
                    <h4><i class="fa fa-heart fa-5"></i>Light and reusable</h4>
                </div>
                <div class="h-body text-center">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, vitae, perferendis, perspiciatis nobis voluptate quod illum soluta minima ipsam ratione quia numquam eveniet eum reprehenderit dolorem dicta nesciunt corporis?</p>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 highlight">
                <div class="h-caption">
                    <h4><i class="fa fa-smile-o fa-5"></i>Author's support</h4>
                </div>
                <div class="h-body text-center">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, excepturi, maiores, dolorem quasi reprehenderit illo accusamus nulla minima repudiandae quas ducimus reiciendis odio sequi atque temporibus facere corporis eos expedita? </p>
                </div>
            </div>
        </div>
        <!-- /row  -->
    </div>
</div>
<!-- /Highlights -->
<!-- container -->
<div class="container">
    <h2 class="text-center top-space">Frequently Asked Questions</h2>
    <br>
    <div class="row">
        <div class="col-sm-6">
            <h3>How can I load images?</h3>
            <p>hendrerit, elit nisl posuere tortor, id suscipit diam dui sed nisi. Morbi sollicitudin massa vel tortor consequat, eget semper nisl fringilla. Maecenas at hendrerit odio. Sed in mi eu quam suscipit bibendum quis at orci. Pellentesque fermentum nisl purus, et iaculis lectus pharetra sit amet.<br></p>
        </div>
        <div class="col-sm-6">
            <h3>Why are you asking me to register?</h3>
            <p>Loentum, erat at aliquet hendrerit, elit nisl posuere tortor, id suscipit diam dui sed nisi. Morbi sollicitudin massa vel tortor consequat, eget semper nisl fringilla. Maecenas at hendrerit odio. Sed in mi eu quam suscipit bibendum quis at orci. Pellentesque fermentum nisl purus, et iaculis lectus pharetra sit amet.</p>
        </div>
    </div>
    <!-- /row -->
    <div class="row">
        <div class="col-sm-6">
            <h3>Can I use this viewer for reasearch purpose?</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar faucibus neque, nec rhoncus nunc ultrices sit amet. Curabitur ac sagittis neque, vel egestas est. Aenean elementum, erat at aliquet hendrerit, elit nisl posuere tortor, id suscipit diam dui sed nisi. Morbi sollicitudin massa vel tortor consequat, eget semper nisl fringilla. Maecenas at hendrerit odio. Sed in mi eu quam suscipit bibendum quis at orci. Pellentesque fermentum nisl purus, et iaculis lectus pharetra sit amet.</p>
        </div>
        <div class="col-sm-6">
            <h3>Where can I find more help?</h3>
            <p>Phasellus pulvinar faucibus neque, nec rhoncus nunc ultrices sit amet. Curabitur ac sagittis neque, vel egestas est. Aenean elementum, erat at aliquet hendrerit, elit nisl posuere tortor, id suscipit diam dui sed nisi. Morbi sollicitudin massa vel tortor consequat, eget semper nisl fringilla. Maecenas at hendrerit odio. Sed in mi eu quam suscipit bibendum quis at orci. Pellentesque fermentum nisl purus, et iaculis lectus pharetra sit amet.</p>
        </div>
    </div>
    <!-- /row -->
    <div class="jumbotron top-space">
        <h4>Dicta, nostrum nemo soluta sapiente sit dolor quae voluptas quidem doloribus recusandae facere magni ullam suscipit sunt atque rerum eaque iusto facilis esse nam veniam incidunt officia perspiciatis at voluptatibus. Libero, aliquid illum possimus numquam fuga.</h4>
        <p class="text-right"><a class="btn btn-primary btn-large">Learn more »</a></p>
    </div>
</div>
<!-- /container -->
<!-- Social links. @TODO: replace by link/instructions in template -->
<section id="social">
    <div class="container">
        <div class="wrapper clearfix">
            <!-- AddThis Button BEGIN -->
            <div class="addthis_toolbox addthis_default_style">
                <a class="addthis_button_facebook_like" fb:like:layout="button_count"></a>
                <a class="addthis_button_tweet"></a>
                <a class="addthis_button_linkedin_counter"></a>
                <a class="addthis_button_google_plusone" g:plusone:size="medium"></a>
            </div>
            <!-- AddThis Button END -->
        </div>
    </div>
</section>

