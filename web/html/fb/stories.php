<?php include "../common/header.php"; ?>

<script type="text/javascript">define("section", {value: "fb_stories"});</script>

<h1 id="main_title">Historias publicadas</h1>

</div>

<div id="menu_container">

    <?php include "../common/menu.php"; ?>

    <?php include "./common/menu.php"; ?>

</div>

<div id="page_content">

    <div>
        En este ejemplo se creará una historia a partir del componente <a href="https://developers.facebook.com/docs/reference/ogaction/og.likes"><code>og.likes</code></a> de la API.
        Tan sólo posteará que te gusta un <a href="http://techcrunch.com/2013/02/06/facebook-launches-developers-live-video-channel-to-keep-its-developer-ecosystem-up-to-date/">artículo en TechCrunch</a>.
        La historia sólo será visible para tí.
    </div>

    <div>
        <input class="post_fb_history" type="button" value="Crear historia" />
    </div>

    <div id="result"></div>

</div>

<?php include "../common/footer.php"; ?>