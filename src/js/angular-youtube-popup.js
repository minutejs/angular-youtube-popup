/// <reference path="../../../minute/_all.d.ts" />
var Minute;
(function (Minute) {
    var AngularYouTubePopup = (function () {
        function AngularYouTubePopup() {
            var _this = this;
            this.$get = function ($rootScope, youtubeEmbedUtils, $ui) {
                var service = {};
                var template = "\n                <div class=\"box box-lg\" ng-init=\"data.loadVideo()\">\n                    <div class=\"box-header with-border\">\n                        <b class=\"pull-left\"><span translate=\"\">{{data.title || 'Video player'}}</span></b>\n                        <a class=\"pull-right close-button\" href=\"\"><i class=\"fa fa-times\"></i></a>\n                        <div class=\"clearfix\"></div>\n                    </div>\n        \n                    <form class=\"form-horizontal\">\n                        <div class=\"box-body\">\n                            <div class=\"embed-responsive embed-responsive-16by9\">\n                                 <youtube-video class=\"embed-responsive-item\" video-url=\"data.videoUrl\" player-vars=\"data.playerVars\"></youtube-video>\n                            </div>\n                        </div>\n                    </form>\n                </div> \n            ";
                service.popup = function (videoUrl, title, modal, playerVars) {
                    if (title === void 0) { title = ''; }
                    if (modal === void 0) { modal = false; }
                    if (playerVars === void 0) { playerVars = {}; }
                    var defaultVars = { hd: 1, autoplay: 1, controls: 0, modestbranding: 1, rel: 0, showInfo: 0 };
                    return $ui.popup(template, modal, null, { ctrl: _this, data: { videoUrl: videoUrl, playerVars: angular.extend({}, defaultVars, playerVars), title: title } });
                };
                service.init = function () {
                    return service;
                };
                return service.init();
            };
            this.$get.$inject = ['$rootScope', 'youtubeEmbedUtils', '$ui'];
        }
        return AngularYouTubePopup;
    }());
    Minute.AngularYouTubePopup = AngularYouTubePopup;
    var YoutubeLink = (function () {
        function YoutubeLink($compile, $timeout, $youtube, $ui) {
            var _this = this;
            this.$compile = $compile;
            this.$timeout = $timeout;
            this.$youtube = $youtube;
            this.$ui = $ui;
            this.restrict = 'A';
            this.scope = { youtubeLink: '=?' };
            this.link = function ($scope, element, attrs) {
                element.click(function (event) {
                    var href = element.attr('href');
                    if (/youtube\.com/i.test(href)) {
                        _this.$youtube.popup(href, element.text(), false, $scope.youtubeLink || {});
                        event.stopImmediatePropagation();
                        return false;
                    }
                });
            };
        }
        YoutubeLink.factory = function () {
            var directive = function ($compile, $timeout, $youtube, $ui) { return new YoutubeLink($compile, $timeout, $youtube, $ui); };
            directive.$inject = ["$compile", "$timeout", "$youtube", "$ui"];
            return directive;
        };
        return YoutubeLink;
    }());
    Minute.YoutubeLink = YoutubeLink;
    angular.module('AngularYouTubePopup', ['MinuteFramework', 'youtube-embed'])
        .directive('youtubeLink', YoutubeLink.factory())
        .provider("$youtube", AngularYouTubePopup);
})(Minute || (Minute = {}));
