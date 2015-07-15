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
                 %if request.matched_route.name=='home':
                    <li class="active">
                 %else:
                    <li>
                 %endif
                    <a href="${request.route_url('home')}">Home</a>
                 </li>
                %if request.matched_route.name=='upload' or request.matched_route.name=='brainbrowser':
                    <li class="dropdown active">
                %else:
                    <li>
                %endif
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Viewer<b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        %if request.matched_route.name=='upload':
                            <li class="active">
                        %else:
                            <li>
                        %endif
                            <a href="${request.route_url('upload')}">Upload</a>
                        </li>
                        %if request.matched_route.name=='brainbrowser':
                            <li class="active">
                        %else:
                            <li>
                        %endif
                            <a href="${request.route_url('brainbrowser')}">Viewer</a>
                        </li>
                    </ul>
                </li>
                %if request.matched_route.name=='myfiles':
                    <li class="active">
                %else:
                    <li>
                %endif
                <a href="${request.route_url('myfiles')}">My Files</a>
                </li>
                <li>
                    <a href="http://sourceforge.net/p/spinalcordtoolbox/wiki/Home/">Documentation</a>
                </li>
                %if request.matched_route.name=='contact':
                    <li class="active">
                %else:
                    <li>
                %endif
                    <a href="${request.route_url('contact')}">Contact</a>
                </li>

                % if request.authenticated_userid:
                        <li><a class="btn" href="${request.route_url('signout')}">SIGN OUT</a>
                %else:
                        %if request.matched_route.name=='signin':
                            <li class="active">
                        %else:
                            <li>
                        %endif
                            <a class="btn" href="${request.route_url('signin')}">SIGN IN / SIGN UP</a>
                %endif

                </li>



            </ul>
        </div>
        <!--/.nav-collapse -->
    </div>
</div>
<!-- /.navbar -->