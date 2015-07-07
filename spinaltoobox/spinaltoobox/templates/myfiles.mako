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



        <h3>My Files</h3>
        <div class="container">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Image Name</th>
                <th>Stat</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              <tr class="warning">
                <td>Brain</td>
                <td>Running</td>
                <td>1 980ko</td>
              </tr>
              <tr class="success">
                <td>Spinal Cord</td>
                <td>Complete</td>
                <td>123ko</td>
              </tr>
              <tr class="danger">
                <td>Mouse brain</td>
                <td>Error</td>
                <td>0ko</td>
              </tr>
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
