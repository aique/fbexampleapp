/// <reference path="../../def/jquery.d.ts" />
/// <reference path="../../def/requirejs.d.ts" />
/// <reference path="../../def/facebook.d.ts" />
define(["require", "exports"], function(require, exports) {
    

    var MainView = (function () {
        function MainView() {
        }
        MainView.init = function (fb) {
            this.initStatus(fb);
        };

        MainView.hideAccountData = function () {
            $("#fb_login_button").css("display", "block");
            $("#fb_logged_data").css("display", "none");
        };

        MainView.hidePrivateAccess = function () {
            $(".private_zone_link").css("visibility", "hidden");
        };

        MainView.initStatus = function (fb) {
            this.stylesInitStatus();
            this.functionalityInitStatus(fb);
        };

        MainView.stylesInitStatus = function () {
            $("#fb_logged_data").css("display", "none");
            $(".private_zone_link").css("visibility", "hidden");
        };

        MainView.functionalityInitStatus = function (fb) {
            $("#fb_login").on("click", function (ev) {
                fb.doFbLogin();
            });
        };

        MainView.loginSuccessStatus = function (accessToken) {
            this.showAccountData(accessToken);
            this.showPrivateAccess();
        };

        MainView.showAccountData = function (accessToken) {
            var classRef = this;

            FB.api('/me', 'get', { access_token: accessToken }, function (response) {
                $("#fb_login_button").css("display", "none");
                $("#fb_logged_data").css("display", "block");
                $("#fb_name").text(response.name);

                classRef.loadFbLogout();
            });
        };

        MainView.showPrivateAccess = function () {
            $(".private_zone_link").css("visibility", "visible");
        };

        MainView.loadFbLogout = function () {
            var classRef = this;

            $("#fb_logout").on("click", function (ev) {
                ev.preventDefault();

                FB.logout(function () {
                    classRef.hideAccountData();
                    classRef.hidePrivateAccess();
                });
            });
        };

        MainView.setFbNewsFunctionality = function () {
            $(".fb_new_item").on("click", function (ev) {
                ev.preventDefault();

                $.ajax({
                    url: "/users/aique/pruebas/fb/FbExampleApp/php/ajax/store_fb_new.php",
                    data: { newId: this.id },
                    success: function (response) {
                        alert(response);
                    }
                });
            });
        };
        return MainView;
    })();
    exports.MainView = MainView;
});
//# sourceMappingURL=MainView.js.map
