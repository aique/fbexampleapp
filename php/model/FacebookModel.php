<?php

/**
 * Class FacebookModel
 *
 *      Clase propia para gestionar lo relacionado con Facebook.
 */
class FacebookModel
{
    private $sdk;

    public function __construct(Facebook $sdk)
    {
        $this->sdk = $sdk;
    }

    public function storeFbPost($postId)
    {
        $success = false;

        // Se obtiene el detalle del post

        $postDetail = $this->sdk->api('/' . $postId);

        if($postDetail)
        {
            if(isset($postDetail["from"]["name"]) && isset($postDetail["message"]))
            {
                $id = $postId;
                $from = $postDetail["from"]["name"];
                $content = $postDetail["message"];

                $post = new Post();
                $post->setId($id);
                $post->setFrom($from);
                $post->setContent($content);

                DBManager::getInstance()->connect();

                $query = "INSERT INTO fb_post (id,from_name,content) VALUES ('".$post->getId()."','".$post->getFrom()."','".$post->getContent()."')";

                DBManager::getInstance()->query($query);

                DBManager::getInstance()->disconnect();

                $success = true;
            }
        }

        return $success;
    }
}