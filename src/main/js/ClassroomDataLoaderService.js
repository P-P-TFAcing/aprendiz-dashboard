/* global angular */

angular.module("AprendizApplication").service('ClassroomDataLoaderService', function ($http) {
    this.loadData = function (completionCallback) {
        console.log('load courses');
        $http({
            method: 'GET',
            url: 'webresources/classroom/courses'
        }).then(
            function (response) {
                let courses = response.data;
                let courseCount = courses.length;
                console.log('load courses got ' + courseCount + ' courses');
                console.table(courses);
                angular.forEach(courses, function (course) {
                    console.log('load course topic', course.id);
                    $http({
                        method: 'GET',
                        url: 'webresources/classroom/topics/' + course.id
                    }).then(function (response) {
                        if (response.data) {
                            course.topics = response.data;
                            console.log('load topic coursework', course.id);
                            $http({
                                method: 'GET',
                                url: 'webresources/classroom/coursework/' + course.id
                            }).then(function (response) {
                                if (response.data) {
                                    course.courseWork = response.data;
                                    console.log('load topic courseworkmaterials', course.id);
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
