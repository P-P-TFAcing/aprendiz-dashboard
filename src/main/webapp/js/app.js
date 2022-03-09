/* global google, angular */

angular.module("AprendizApplication", []);

angular.module("AprendizApplication").controller('MainViewController', function ($scope, $http) {
    console.log('started main view controller');
    $http({        
        method: 'GET',
        url: 'webresources/classroom/courses'
    }).then(
            function (response) {
                $scope.courses = response.data;
                angular.forEach($scope.courses, function(course) {
                        $http({        
                            method: 'GET',
                            url: 'webresources/classroom/topics/' + course.id
                        }).then(function(response) {
                            if(response.data) {
                                course.topics = response.data;
                            }                                        
                        });               
                });
    });            
});