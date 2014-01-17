<?php

    require "../cfg/Config.php";
    require "../lib/facebook/facebook.php";
    require "../lib/DBManager.php";
    require "../model/facebook/post/Post.php";
    require "../model/FacebookModel.php";

    $postId = "";

    if(isset($_GET["newId"]))
    {
        $postId = $_GET["newId"];
    }

    $facebookSdk = new Facebook(
        array(
            'appId'  => Config::FB_APP_ID,
            'secret' => Config::FB_APP_SECRET
        )
    );

    $user = $facebookSdk->getUser();

    if($user)
    {
        try
        {
            $facebookModel = new FacebookModel($facebookSdk);

            if($facebookModel->storeFbPost($postId))
            {
                echo "Noticia almacenada con éxito";
            }
        }
        catch(FacebookApiException $e)
        {
            echo "Error: " . $e->getMessage();
        }
    }
    else
    {
        echo "Error:  usuario no logueado";
    }