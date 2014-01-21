/// <reference path="../../def/jquery.d.ts" />
/// <reference path="../../def/requirejs.d.ts" />
define(["require", "exports", "app/view/MainView"], function(require, exports, __mainView__) {
    var mainView = __mainView__;
    

    var MainController = (function () {
        function MainController() {
        }
        MainController.init = function (fb) {
            mainView.MainView.init(fb);

            fb.login();
        };

        MainController.postStories = function (fb) {
            mainView.MainView.postStories(fb);
        };
        return MainController;
    })();
    exports.MainController = MainController;
});
//# sourceMappingURL=MainController.js.map
