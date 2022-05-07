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

class MainScene extends Phaser.Scene {

    preload() {
        this.load.setBaseURL('https://aprendiz-dashboard.pptpdx.com');
        console.log('preloaded MainScene');
    }

    create() {
        console.log('created MainScene');
        // now we have access to courses
        let courses = this.game.config.courses;
        let y = 100;
        for(const course of courses) {
            
            let graphics = this.add.graphics();
            graphics.lineStyle(2, 0xffff00, 1);

            //  32px radius on the corners
            graphics.strokeRoundedRect(32, 32 + y, 300, 90, 32);

            graphics.lineStyle(4, 0xff00ff, 1);

            graphics.text(32, 32+y, course.name, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

            y += 100;
        }
    }

};

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
            width: 1920,
            height: 1080,
            scene: MainScene
        };        
        let game = new Phaser.Game(config); 
        game.config.courses = courses;
    };

    ClassroomDataLoaderService.loadData($scope.dataLoaded);

    
        
});


