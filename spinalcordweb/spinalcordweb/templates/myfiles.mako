<%inherit file="main_template.mako"/>

<header id="head" class="secondary"></header>

<!-- container -->
<div class="container">

    <ol class="breadcrumb">
    <li><a href="${request.route_url('home')}">Home</a></li>
    <li class="active">My files</li>
    </ol>

    <div class="row">

    <!-- Article main content -->
    <article class="col-sm-8 maincontent">
        <header class="page-header">
            <h1 class="page-title">Manage my files.</h1>
        </header>


        <h3>Upload a file</h3>
        <!-- Upload -->
            <div class="container">
            <div class="panel-body">

              <!-- Standar Form -->
              <h4>Select files from your computer</h4>
              <form action="/upload" method="POST" accept-charset="utf-8"
              enctype="multipart/form-data" id="js-upload-form">
                <div class="form-inline">
                  <div class="form-group">
                    <input type="file" name="files-nii" id="files-nii" multiple>
                  </div>
                  <button type="submit" class="btn btn-sm btn-primary" id="js-upload-submit">Upload files</button>
                </div>
              </form>

              <!-- Drop Zone -->
              <h4>Or drag and drop files below</h4>
              <div class="upload-drop-zone" id="drop-zone">
                Just drag and drop files here
              </div>
            </div>
            </div>
        <!-- Upload -->


        <h3>My Files</h3>
        <div class="container">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Image Name</th>
                <th>Type</th>
                <th>Size</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            % for item in user:
            <tr class="success" >
                <td style="vertical-align: middle;">${item.filename}</td>
                <td style="vertical-align: middle;">${item.type}</td>
                <td style="vertical-align: middle;">${item.size}kb</td>
                <td style="vertical-align: middle;"><form action="/display_file" method="post" accept-charset="utf-8">
                    <input type="hidden" name="go_viewer" id="go_viewer" value="${item.localpath}">
                    <button type="submit" class="btn btn-success pull-right navbar-btn">View</button>
                  </form></td>
                <td style="vertical-align: middle;"><form action="/delete_file" method="post" accept-charset="utf-8">
                    <input type="hidden" name="delete_file" id="delete_file" value="${item.id}">
                    <button type="submit" class="btn btn-warning pull-right navbar-btn">Delete</button>
                  </form></td>
            </tr>
            % endfor
            </tbody>
          </table>
        </div>

    </article>
    <!-- /Article -->



    <!--
    <aside class="col-sm-4 sidebar sidebar-right">

    <div class="widget">
        <h4>Vacancies</h4>
        <ul class="list-unstyled list-spaces">
            <li><a href="">Lorem ipsum dolor</a><br><span class="small text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, laborum.</span></li>
            <li><a href="">Totam, libero, quis</a><br><span class="small text-muted">Suscipit veniam debitis sed ipsam quia magnam eveniet perferendis nisi.</span></li>
            <li><a href="">Enim, sequi dignissimos</a><br><span class="small text-muted">Reprehenderit illum quod unde quo vero ab inventore alias veritatis.</span></li>
            <li><a href="">Suscipit, consequatur, aut</a><br><span class="small text-muted">Sed, mollitia earum debitis est itaque esse reiciendis amet cupiditate.</span></li>
            <li><a href="">Nam, illo, veritatis</a><br><span class="small text-muted">Delectus, sapiente illo provident quo aliquam nihil beatae dignissimos itaque.</span></li>
        </ul>
    </div>

    </aside>
    -->

    </div>
</div>	<!-- /container -->
