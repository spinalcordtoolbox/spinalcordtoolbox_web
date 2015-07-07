
<!-- Fixed navbar -->
<div class="navbar navbar-inverse navbar-fixed-top headroom">
    <div class="container">
        <div class="navbar-header">
            <!-- Button for smallest screens -->
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="${request.route_url('home')}">
                <img src="${request.static_url('spinaltoobox:static/img/logo.png')}" alt="Progressus HTML5 template">
            </a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav pull-right">
                <li class="active">
                    <a href="${request.route_url('home')}">Home</a>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Viewer<b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="${request.route_url('upload')}">Upload</a>
                        </li>
                        <li class="active">
                            <a href="${request.route_url('brainbrowser')}">Viewer</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="${request.route_url('myfiles')}">My Files</a>
                </li>
                <li>
                    <a href="http://sourceforge.net/p/spinalcordtoolbox/wiki/Home/">Documentation</a>
                </li>
                <li>
                    <a href="${request.route_url('contact')}">Contact</a>
                </li>
                <li>
                    <a class="btn" href="${request.route_url('signin')}">SIGN IN / SIGN UP</a>
                </li>
            </ul>
        </div>
        <!--/.nav-collapse -->
    </div>
</div>
<!-- /.navbar -->