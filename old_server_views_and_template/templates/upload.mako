<%inherit file="main_template.mako"/>
<header id="head" class="secondary"></header>
<!-- container -->
<div class="container">

    <ol class="breadcrumb">
    <li><a href="${request.route_url('home')}">Home</a></li>
    <li class="active">Upload</li>
    </ol>

    <div class="row">

    <!-- Article main content -->
    <article class="col-sm-8 maincontent">
        <header class="page-header">
            <h1 class="page-title">Upload Files.</h1>
        </header>
<!-- Upload -->
<div class="container">
  <div class="panel panel-default">
    <div class="panel-heading"><strong>Upload Files:</strong> <small>Upload new NIFTI files.</small></div>
    <div class="panel-body">

      <!-- Standar Form -->
      <h4>Select files from your computer</h4>
      <form action="/upload" method="post" accept-charset="utf-8"
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

      <input type="file" class="upload-drop-zone" style="color: white;" id="drop-zone">
        Just drag and drop files here
      </input>
    </div>
  </div>
</div> <!-- /container -->
<!-- Upload -->
        </article>
      </div>
  </div>

<script src="${request.static_url('server:static/js/upload.js')}"></script>