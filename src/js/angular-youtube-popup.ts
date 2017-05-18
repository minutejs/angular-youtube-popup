/// <reference path="../../../minute/_all.d.ts" />
module Minute {
    export class AngularYouTubePopup implements ng.IServiceProvider {
        constructor() {
            this.$get.$inject = ['$rootScope', 'youtubeEmbedUtils', '$ui'];
        }

        $get = ($rootScope: ng.IRootScopeService, youtubeEmbedUtils: any, $ui: any) => {
            let service: any = {};
            let template = `
                <div class="box box-lg" ng-init="data.loadVideo()">
                    <div class="box-header with-border">
                        <b class="pull-left"><span translate="">{{data.title || 'Video player'}}</span></b>
                        <a class="pull-right close-button" href=""><i class="fa fa-times"></i></a>
                        <div class="clearfix"></div>
                    </div>
        
                    <form class="form-horizontal">
                        <div class="box-body">
                            <div class="embed-responsive embed-responsive-16by9">
                                 <youtube-video class="embed-responsive-item" video-url="data.videoUrl" player-vars="data.playerVars"></youtube-video>
                            </div>
                        </div>
                    </form>
                </div> 
            `;

            service.popup = (videoUrl, title = '', modal = false, playerVars = {}) => {
                let defaultVars = {autoplay: 1, controls: 0, modestbranding: 1, rel: 0, showInfo: 0};
                $ui.popup(template, modal, null, {ctrl: this, data: {videoUrl: videoUrl, playerVars: angular.extend({}, defaultVars, playerVars), title: title}});
            };

            service.init = () => {
                return service;
            };

            return service.init();
        }
    }

    export class YoutubeLink implements ng.IDirective {
        restrict = 'A';
        scope:any = {youtubeLink: '=?'};

        constructor(private $compile: ng.ICompileService, private $timeout: ng.ITimeoutService, private $youtube: any, private $ui: any) {
        }

        static factory(): ng.IDirectiveFactory {
            let directive: ng.IDirectiveFactory = ($compile: ng.ICompileService, $timeout: ng.ITimeoutService, $youtube: any, $ui: any) => new YoutubeLink($compile, $timeout, $youtube, $ui);
            directive.$inject = ["$compile", "$timeout", "$youtube", "$ui"];
            return directive;
        }

        link = ($scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            element.click((event) => {
                let href = element.attr('href');

                if (/youtube\.com/i.test(href)) {
                    this.$youtube.popup(href, element.text(), false, $scope.youtubeLink || {});
                    event.stopImmediatePropagation();
                    return false;
                }
            });
        }
    }

    angular.module('AngularYouTubePopup', ['MinuteFramework', 'youtube-embed'])
        .directive('youtubeLink', YoutubeLink.factory())
        .provider("$youtube", AngularYouTubePopup);

}
