/* global google, angular, Phaser, MainScene */

angular.module("AprendizApplication", []);

angular.module("AprendizApplication").service('ClassroomDataLoaderService', function ($http) {
    this.loadData = function (completionCallback) {
        $http({
            method: 'GET',
            url: 'webresources/classroom/sample'
        }).then(
            function (response) {
                let courses = response.data;
                let courseCount = courses.length;
                console.log('load ' + courseCount + ' courses');                
                completionCallback(courses);
            });
    };
});

angular.module("AprendizApplication").controller('SampleViewController', function ($scope, $http, ClassroomDataLoaderService) {
    console.log('started main view controller');
    
    $scope.dataLoaded = function(courses) {
        console.log('data loaded', courses);
        let config = {
            type: Phaser.AUTO,
            dom: {
                createContainer: true
            },
            fps: {
                target: 16,
                forceSetTimeOut: true
            },
            parent: 'aprendiz-block',
            width: 1920,
            height: 1080,
            scene: MainScene
        };        
        let game = new Phaser.Game(config); 
        game.config.courses = courses;
    };

    ClassroomDataLoaderService.loadData($scope.dataLoaded);

    
        
});


