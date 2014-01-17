/// <reference path="../../def/jquery.d.ts" />

export class FacebookPrinter
{
    private static MAX_NEWS = 10;

    public static printNews(news: any)
    {
        var newsList = $(".fb_news");

        var numNews = news.length;

        for(var i = 0 ; i < numNews && i < this.MAX_NEWS ; i++)
        {
            var currentNew = news[i];
            var id = currentNew.id;
            var message = currentNew.message;
            var author = currentNew.from.name;

            if(message != undefined)
            {
                if(message != "")
                {
                    if(message.length > 50)
                    {
                        message = message.substr(0, 50) + "...";
                    }

                    newsList.append($("<li>", {text: author + " - " + message + " "}).append($("<a>", {href: "#", class: "fb_new_item", id: id, text: "guardar en base de datos"})));
                }
            }
        }
    }

    public static printPhotos(photos: any)
    {
        var photosList = $(".fb_pictures");

        var numPhotos = photos.length;

        for(var i = 0 ; i < numPhotos ; i++)
        {
            var currentPhoto = photos[i];
            var url = currentPhoto.images[2].source;

            photosList.append($("<img>", {src: url, width: 300, height: 300}));
        }
    }
}