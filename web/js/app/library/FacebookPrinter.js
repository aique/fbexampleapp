/// <reference path="../../def/jquery.d.ts" />
define(["require", "exports"], function(require, exports) {
    var FacebookPrinter = (function () {
        function FacebookPrinter() {
        }
        FacebookPrinter.printNews = function (news) {
            var newsList = $(".fb_news");

            var numNews = news.length;

            for (var i = 0; i < numNews && i < this.MAX_NEWS; i++) {
                var currentNew = news[i];
                var id = currentNew.id;
                var message = currentNew.message;
                var author = currentNew.from.name;

                if (message != undefined) {
                    if (message != "") {
                        if (message.length > 50) {
                            message = message.substr(0, 50) + "...";
                        }

                        newsList.append($("<li>", { text: author + " - " + message + " " }).append($("<a>", { href: "#", class: "fb_new_item", id: id, text: "guardar en base de datos" })));
                    }
                }
            }
        };

        FacebookPrinter.printPhotos = function (photos) {
            var photosList = $(".fb_pictures");

            var numPhotos = photos.length;

            for (var i = 0; i < numPhotos; i++) {
                var currentPhoto = photos[i];
                var url = currentPhoto.images[2].source;

                photosList.append($("<img>", { src: url, width: 300, height: 300 }));
            }
        };
        FacebookPrinter.MAX_NEWS = 10;
        return FacebookPrinter;
    })();
    exports.FacebookPrinter = FacebookPrinter;
});
//# sourceMappingURL=FacebookPrinter.js.map
