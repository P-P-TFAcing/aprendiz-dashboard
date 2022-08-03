/* global google, angular, Phaser, MainScene */

require('phaser');
require('angular');
require('angular-cookies');

console.log('starting Aprendiz app!');

import MainScene from './MainScene.js';

angular.module("AprendizApplication", ['ngCookies']);

angular.module("AprendizApplication").service('ClassroomDataLoaderService', function ($http) {
    this.loadData = function (completionCallback) {
        $http({
            method: 'GET',
            url: 'webresources/classroom/courses'
        }).then(
            function (response) {
                let courses = response.data;
                let courseCount = courses.length;
                console.log('load ' + courseCount + ' courses');
                angular.forEach(courses, function (course) {
                    $http({
                        method: 'GET',
                        url: 'webresources/classroom/topics/' + course.id
                    }).then(function (response) {
                        if (response.data) {
                            course.topics = response.data;
                            $http({
                                method: 'GET',
                                url: 'webresources/classroom/coursework/' + course.id
                            }).then(function (response) {
                                if (response.data) {
                                    course.courseWork = response.data;
                                    $http({
                                        method: 'GET',
                                        url: 'webresources/classroom/courseworkmaterials/' + course.id
                                    }).then(function (response) {
                                        if (response.data) {
                                            course.courseWorkMaterials = response.data;
                                            courseCount--;
                                            if(courseCount === 0) {
                                                console.log('all courses loaded');
                                                completionCallback(courses);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });

                });
            });
    };
});

angular.module("AprendizApplication").controller('MainViewController', function ($scope, $http, $cookies, $interval, ClassroomDataLoaderService) {
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
            width: 4000,
            height: 4000,
            scene: MainScene
        };        
        let game = new Phaser.Game(config); 
        game.config.courses = courses;
        console.log('started new Phaser game');
    };

    $scope.dataLoad = false;

    $interval(function() {
        let authCookie = $cookies.get('aprendiz-auth');
        if(authCookie) {
            if(!$scope.dataLoad) {
                console.log('cookie is present', authCookie);            
                $scope.dataLoad = true;
                ClassroomDataLoaderService.loadData($scope.dataLoaded);
            }
        }        
    }, 1000);

});


