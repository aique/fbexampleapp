/// <reference path="../../def/jquery.d.ts" />
/// <reference path="../../def/requirejs.d.ts" />
/// <reference path="../../def/facebook.d.ts" />

import cfg = require("app/cfg/Config");
import mainView = require("app/view/mainView");

import requestLib = require("app/library/Request");
import cookieLib = require("app/library/Cookie");
import fbPrinterLib = require("app/library/FacebookPrinter");

export class Facebook
{
    private accessToken: any;

    constructor()
    {
        this.accessToken = null;
        this.loadSdk();
    }

    public loadSdk()
    {
        $.getScript(document.location.protocol + '//connect.facebook.net/en_US/all.js', function()
        {
            FB.init(
            {
                appId: cfg.Config.FB_APP_ID,
                status: true,
                cookie: true,
                xfbml: true
            });

            var event = new Event("onLoadFbSdkEvent");
            window.dispatchEvent(event);
        });
    }

    public login()
    {
        this.checkRequestedAccessToken();
        this.checkLoginStatus();
    }

    private checkRequestedAccessToken()
    {
        this.accessToken = cookieLib.Cookie.getCookie("fb_access_token");
    }

    private checkLoginStatus()
    {
        var classRef = this;

        FB.Event.subscribe('auth.authResponseChange', function(response)
        {
            if(response.status === 'connected')
            {
                classRef.accessToken = response.authResponse.accessToken;
                cookieLib.Cookie.setCookie("fb_access_token", classRef.accessToken, 1);
                mainView.MainView.loginSuccessStatus(classRef.accessToken);
            }
        });
    }

    public doFbLogin()
    {
        var classRef = this;

        FB.login(function(response)
        {
            var authResponse = response.authResponse;

            if(authResponse)
            {
                classRef.accessToken =  authResponse.accessToken;
                cookieLib.Cookie.setCookie("fb_access_token", classRef.accessToken, 1);
            }
        }, {scope: 'read_stream,user_photos,publish_actions'});
    }

    public printNews()
    {
        this.checkAccessToken();

        var accessToken = this.accessToken;

        FB.api('/me/permissions', 'get', {access_token: accessToken}, function(response?)
        {
            if(response.data)
            {
                if(response.data[0].read_stream == 1)
                {
                    FB.api('/me/home', 'get', {access_token: accessToken}, function(response?)
                    {
                        var news = response.data;

                        if(news != undefined)
                        {
                            fbPrinterLib.FacebookPrinter.printNews(news);
                            mainView.MainView.setFbNewsFunctionality()
                        }
                    });
                }
            }
        });
    }

    public printPictures()
    {
        this.checkAccessToken();

        var accessToken = this.accessToken;

        FB.api('/me/permissions', 'get', {access_token: accessToken}, function(response?)
        {
            if(response.data)
            {
                if(response.data[0].user_photos == 1)
                {
                    FB.api('/me/albums', 'get', {access_token: accessToken}, function(response?)
                    {
                        var albums = response.data;

                        if(albums != undefined)
                        {
                            var profileAlbum = null;

                            var numAlbums = albums.length;

                            for(var i = 0 ; i < numAlbums && !profileAlbum ; i++)
                            {
                                var currentAlbum = albums[i]

                                if(currentAlbum.name == "Profile Pictures")
                                {
                                    profileAlbum = currentAlbum;
                                }
                            }

                            if(profileAlbum)
                            {
                                FB.api('/' + profileAlbum.id + '/photos', 'get', {access_token: accessToken}, function(response?)
                                {
                                    var photos = response.data;

                                    if(photos)
                                    {
                                        fbPrinterLib.FacebookPrinter.printPhotos(photos);
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }

    public postLike()
    {
        var accessToken = this.accessToken;

        FB.api
        (
            'https://graph.facebook.com/me/og.likes',
            'post',
            {
                object: 'http://techcrunch.com/2013/02/06/facebook-launches-developers-live-video-channel-to-keep-its-developer-ecosystem-up-to-date/',
                privacy: {'value': 'SELF'},
                access_token: accessToken
            },
            function(response?)
            {
                if(!response)
                {
                    alert('Error occurred.');
                }
                else
                {
                    if(response.error)
                    {
                        document.getElementById('result').innerHTML = 'Error: ' + response.error.message;
                    }
                    else
                    {
                        document.getElementById('result').innerHTML = '<a href=\"https://www.facebook.com/me/activity/' + response.id + '\">' + 'Historia creada con ID ' + response.id + '</a>';
                    }
                }
            }
        );
    }

    private checkAccessToken()
    {
        FB.api('/me', 'get', {access_token: this.accessToken}, function(response?)
        {
            var error = response.error;

            if(error != undefined)
            {
                // TODO volver a loguer al usuario
            }
        });
    }
}