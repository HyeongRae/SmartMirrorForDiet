/*
(function() {
    'use strict';

    function MirrorCtrl(
            AnnyangService,
            YoutubeService,
            $scope) {
    	
        var _this = this;
        var command = COMMANDS.ko;
        var functionService = FUNCTIONSERVICE;
        var DEFAULT_COMMAND_TEXT = command.default;
       
        $scope.listening = false;
        $scope.complement = command.hi;
        $scope.debug = false;
        $scope.focus = "default";
        $scope.greetingHidden = "true";
        $scope.user = {};
        $scope.interimResult = DEFAULT_COMMAND_TEXT;
        
        // Reset the command text
        var restCommand = function(){
          $scope.interimResult = DEFAULT_COMMAND_TEXT;
        }

        _this.init = function() {
        	
           
            // Youtube 동영상 재생 
            AnnyangService.addCommand(command.playyoutube, function(term) {
              YoutubeService.getYoutube(term,'video').then(function(){
                if(term){
                  var videoId = YoutubeService.getVideoId()
                  $scope.focus = "youtube";
                  $scope.youtubeurl = "http://www.youtube.com/embed/" + videoId + "?autoplay=1&enablejsapi=1&version=3&playerapiid=ytplayer"
                  $scope.currentYoutubeUrl = $sce.trustAsResourceUrl($scope.youtubeurl);
                }
              });
            });

            

            // Youtube 동영상, 플레이어 리스트 정지
            AnnyangService.addCommand(command.stopyoutube, function() {
              var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
              iframe.postMessage('{"event":"command","func":"' + 'stopVideo' +   '","args":""}', '*');
              $scope.focus = "default";
            });

           
        };

        _this.init();
    }

    angular.module('SmartMirror')
        .controller('MirrorCtrl', MirrorCtrl);

})();
*/
