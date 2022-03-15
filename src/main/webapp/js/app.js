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
        width: 800,
        height: 600,
        scene: {
            preload: preload,
            create: create
        }
    };

    var game = new Phaser.Game(config);

    function preload()
    {
        this.load.setBaseURL('https://labs.phaser.io');

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    function create()
    {
        this.add.image(400, 300, 'sky');

        var particles = this.add.particles('red');

        var emitter = particles.createEmitter({
            speed: 100,
            scale: {start: 1, end: 0},
            blendMode: 'ADD'
        });

        var logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);
    }

});