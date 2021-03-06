/// <reference path="../../def/jquery.d.ts" />
/// <reference path="../../def/requirejs.d.ts" />

import mainView = require("app/view/MainView");
import fbLib = require("app/library/Facebook");

export class MainController
{
    public static init(fb:fbLib.Facebook)
    {
        mainView.MainView.init(fb);

        fb.login();
    }

    public static postStories(fb:fbLib.Facebook)
    {
        mainView.MainView.postStories(fb);
    }
}