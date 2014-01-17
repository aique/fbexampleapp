/// <amd-dependency path="section" />
/// <reference path="./def/jquery.d.ts" />
/// <reference path="./def/requirejs.d.ts" />
define(["require", "exports", "app/controller/MainController", "app/library/Facebook", "section"], function(require, exports, __mainController__, __fbLib__) {
    var mainController = __mainController__;

    var fbLib = __fbLib__;

    $(function () {
        var section = require("section");

        var fb = new fbLib.Facebook();

        window.addEventListener("onLoadFbSdkEvent", function (ev) {
            mainController.MainController.init(fb);

            switch (section.value) {
                case ("fb_news"):
                    fb.printNews();

                    break;

                case ("fb_pictures"):
                    fb.printPictures();

                    break;
            }
        });
    });
});
//# sourceMappingURL=main.js.map
