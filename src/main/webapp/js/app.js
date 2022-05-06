/* global google, angular, Phaser */

angular.module("AprendizApplication", []);

angular.module("AprendizApplication").controller('MainViewController', function ($scope, $http) {
    console.log('started main view controller');
    $http({
        method: 'GET',
        url: 'webresources/classroom/courses'
    }).then(
            function (response) {
                $scope.courses = response.data;
                angular.forEach($scope.courses, function (course) {
                    $http({
                        method: 'GET',
                        url: 'webresources/classroom/topics/' + course.id
                    }).then(function (response) {
                        if (response.data) {
                            course.topics = response.data;
                        }
                    });
                    $http({
                        method: 'GET',
                        url: 'webresources/classroom/coursework/' + course.id
                    }).then(function (response) {
                        if (response.data) {
                            course.courseWork = response.data;
                        }
                    });
                    $http({
                        method: 'GET',
                        url: 'webresources/classroom/courseworkmaterials/' + course.id
                    }).then(function (response) {
                        if (response.data) {
                            course.courseWorkMaterials = response.data;
                        }
                    });
                });
            });

    var config = {
        type: Phaser.AUTO,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 200}
            }
        },
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
        scene: {
            preload: preload,
            create: create
        }
    };

    var game = new Phaser.Game(config);

    function preload() {
        this.load.setBaseURL('https://aprendiz-dashboard.pptpdx.com');
    }

    function create() {
    }

});