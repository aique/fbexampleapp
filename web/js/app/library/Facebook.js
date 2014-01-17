/// <reference path="../../def/jquery.d.ts" />
/// <reference path="../../def/requirejs.d.ts" />
/// <reference path="../../def/facebook.d.ts" />
define(["require", "exports", "app/cfg/Config", "app/view/MainView", "app/library/Cookie", "app/library/FacebookPrinter"], function(require, exports, __cfg__, __mainView__, __cookieLib__, __fbPrinterLib__) {
    var cfg = __cfg__;
    var mainView = __mainView__;

    
    var cookieLib = __cookieLib__;
    var fbPrinterLib = __fbPrinterLib__;

    var Facebook = (function () {
        function Facebook() {
            this.accessToken = null;
            this.loadSdk();
        }
        Facebook.prototype.loadSdk = function () {
            $.getScript(document.location.protocol + '//connect.facebook.net/en_US/all.js', function () {
                FB.init({
                    appId: cfg.Config.FB_APP_ID,
                    status: true,
                    cookie: true,
                    xfbml: true
                });

                var event = new Event("onLoadFbSdkEvent");
                window.dispatchEvent(event);
            });
        };

        Facebook.prototype.login = function () {
            this.checkRequestedAccessToken();
            this.checkLoginStatus();
        };

        Facebook.prototype.checkRequestedAccessToken = function () {
            this.accessToken = cookieLib.Cookie.getCookie("fb_access_token");
        };

        Facebook.prototype.checkLoginStatus = function () {
            var classRef = this;

            FB.Event.subscribe('auth.authResponseChange', function (response) {
                if (response.status === 'connected') {
                    classRef.accessToken = response.authResponse.accessToken;
                    cookieLib.Cookie.setCookie("fb_access_token", classRef.accessToken, 1);
                    mainView.MainView.loginSuccessStatus(classRef.accessToken);
                }
            });
        };

        Facebook.prototype.doFbLogin = function () {
            var classRef = this;

            FB.login(function (response) {
                var authResponse = response.authResponse;

                if (authResponse) {
                    classRef.accessToken = authResponse.accessToken;
                    cookieLib.Cookie.setCookie("fb_access_token", classRef.accessToken, 1);
                }
            }, { scope: 'read_stream,user_photos' });
        };

        Facebook.prototype.printNews = function () {
            this.checkAccessToken();

            var accessToken = this.accessToken;

            FB.api('/me/permissions', 'get', { access_token: accessToken }, function (response) {
                if (response.data) {
                    if (response.data[0].read_stream == 1) {
                        FB.api('/me/home', 'get', { access_token: accessToken }, function (response) {
                            var news = response.data;

                            if (news != undefined) {
                                fbPrinterLib.FacebookPrinter.printNews(news);
                                mainView.MainView.setFbNewsFunctionality();
                            }
                        });
                    }
                }
            });
        };

        Facebook.prototype.printPictures = function () {
            this.checkAccessToken();

            var accessToken = this.accessToken;

            FB.api('/me/permissions', 'get', { access_token: accessToken }, function (response) {
                if (response.data) {
                    if (response.data[0].user_photos == 1) {
                        FB.api('/me/albums', 'get', { access_token: accessToken }, function (response) {
                            var albums = response.data;

                            if (albums != undefined) {
                                var profileAlbum = null;

                                var numAlbums = albums.length;

                                for (var i = 0; i < numAlbums && !profileAlbum; i++) {
                                    var currentAlbum = albums[i];

                                    if (currentAlbum.name == "Profile Pictures") {
                                        profileAlbum = currentAlbum;
                                    }
                                }

                                if (profileAlbum) {
                                    FB.api('/' + profileAlbum.id + '/photos', 'get', { access_token: accessToken }, function (response) {
                                        var photos = response.data;

                                        if (photos) {
                                            fbPrinterLib.FacebookPrinter.printPhotos(photos);
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        };

        Facebook.prototype.checkAccessToken = function () {
            FB.api('/me', 'get', { access_token: this.accessToken }, function (response) {
                var error = response.error;

                if (error != undefined) {
                    // TODO volver a loguer al usuario
                }
            });
        };
        return Facebook;
    })();
    exports.Facebook = Facebook;
});
//# sourceMappingURL=Facebook.js.map
