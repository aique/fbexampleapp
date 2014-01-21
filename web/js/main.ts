/// <amd-dependency path="section" />
/// <reference path="./def/jquery.d.ts" />
/// <reference path="./def/requirejs.d.ts" />

import mainController = require("app/controller/MainController");

import fbLib = require("app/library/Facebook");

$(function()
{
    var section = require("section");

    var fb:fbLib.Facebook = new fbLib.Facebook();

    window.addEventListener("onLoadFbSdkEvent", function(ev)
    {
        mainController.MainController.init(fb);

        switch(section.value)
        {
            case("fb_news"):

                fb.printNews();

            break;

            case("fb_pictures"):

                fb.printPictures();

            break;

            case("fb_stories"):

                mainController.MainController.postStories(fb);

            break;
        }
    });
});