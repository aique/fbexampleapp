/// <reference path="../../def/jquery.d.ts" />
/// <reference path="../../def/requirejs.d.ts" />
/// <reference path="../../def/facebook.d.ts" />

import fbLib = require("app/library/Facebook");

export class MainView
{
    public static init(fb:fbLib.Facebook)
    {
        this.initStatus(fb);
    }

    public static hideAccountData()
    {
        $("#fb_login_button").css("display", "block");
        $("#fb_logged_data").css("display", "none");
    }

    public static hidePrivateAccess()
    {
        $(".private_zone_link").css("visibility", "hidden");
    }

    private static initStatus(fb:fbLib.Facebook)
    {
        this.stylesInitStatus();
        this.functionalityInitStatus(fb);
    }

    private static stylesInitStatus()
    {
        $("#fb_logged_data").css("display", "none");
        $(".private_zone_link").css("visibility", "hidden");
    }

    private static functionalityInitStatus(fb:fbLib.Facebook)
    {
        $("#fb_login").on("click", function(ev)
        {
            fb.doFbLogin();
        });
    }

    public static loginSuccessStatus(accessToken:string)
    {
        this.showAccountData(accessToken);
        this.showPrivateAccess();
    }

    private static showAccountData(accessToken:string)
    {
        var classRef = this;

        FB.api('/me', 'get', {access_token: accessToken}, function(response?)
        {
            $("#fb_login_button").css("display", "none");
            $("#fb_logged_data").css("display", "block");
            $("#fb_name").text(response.name);

            classRef.loadFbLogout();
        });
    }

    private static showPrivateAccess()
    {
        $(".private_zone_link").css("visibility", "visible");
    }

    private static loadFbLogout()
    {
        var classRef = this;

        $("#fb_logout").on("click", function(ev)
        {
            ev.preventDefault();

            FB.logout(function()
            {
                classRef.hideAccountData();
                classRef.hidePrivateAccess();
            });
        });
    }

    public static setFbNewsFunctionality()
    {
        $(".fb_new_item").on("click", function(ev)
        {
            ev.preventDefault();

            $.ajax(
            {
                url: "/users/aique/pruebas/fb/FbExampleApp/php/ajax/store_fb_new.php",
                data: {newId: this.id},
                success: function(response)
                {
                    alert(response);
                }
            });
        });
    }
}