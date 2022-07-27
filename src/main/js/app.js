/* global google, angular, Phaser, MainScene */

require('angular');
require('angular-sanitize');
require('angular-cookies');
require('angular-ui-router');
require('angular-route');

angular.module("AprendizApplication", ['ngRoute', 'ngSanitize', 'ngCookies']);

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

angular.module("AprendizApplication").controller('MainViewController', function ($scope, $http, ClassroomDataLoaderService) {
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
    };

    ClassroomDataLoaderService.loadData($scope.dataLoaded);

    
        
});

angular.module("AprendizApplication").controller('GoogleSignonController', function ($scope, $http, $rootScope, $cookies) {
    console.log('google signon controller started');
    let sessionToken = $cookies.get('aprendiz-dashboard');
    if(sessionToken) {
        $cookies.remove('aprendiz-dashboard');
    }
    $scope.googleSignon = function (credentials) {
        console.log('google onSignIn', credentials);        
        $http({
            method: 'POST',
            data: credentials,
            url: 'resources/classroom/credential'
        }).then(function (response) {            
            console.log('posted google credentials OK', response);
            let sessionToken = response.data.sessionToken;
            if(sessionToken) {
                $cookies.put('aprendiz-dashboard', sessionToken, {'path': '/'});
                window.location.href = '/';
            } else {
                window.location.href = '#!/unauthorized';
            }
        }, function(errorResponse) {
            window.location.href = '#!/unauthorized';
        });        
    };
    onGoogleSignIn = $scope.googleSignon.bind(this);
});



