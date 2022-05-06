/* global google, angular, Phaser */

angular.module("AprendizApplication", []);

angular.module("AprendizApplication").service('ClassroomDataLoaderService', function ($http) {
    this.loadData = function (completionCallback) {
        $http({
            method: 'GET',
            url: 'webresources/classroom/courses'
        }).then(
                function (response) {
                    let courses = response.data;
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

class MainScene extends Phaser.Scene {

    preload() {
        this.load.setBaseURL('https://aprendiz-dashboard.pptpdx.com');
        console.log('preloaded MainScene');
    }

    create(courses) {
        this.courses = courses;
        console.log('created MainScene');
    }

};

class BootScene extends Phaser.Scene {

    dataLoadedCallback(courses) {
        console.log('data loaded callback', courses);
        this.scene.add('MainScene', MainScene, true, courses);
    }

    create() {
        console.log('created BootScene');
        // load all the data
        let $scope = this.config.scope;
        $scope.loadAllData(dataLoadedCallback);
    }

};

angular.module("AprendizApplication").controller('MainViewController', function ($scope, $http, ClassroomDataLoaderService) {
    console.log('started main view controller');

    let config = {
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
        scene: BootScene,
        scope: $scope
    };


    $scope.game = new Phaser.Game(config);
    
    $scope.loadAllData = function(completionCallback) {
        console.log('load all data');
    };
    
});


