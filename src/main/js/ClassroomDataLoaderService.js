/* global angular */

angular.module("AprendizApplication").service('ClassroomDataLoaderService', function ($http) {
    // progressCallback declaration = function(position, count);
    this.loadData = function (gameObject) {
        console.log('load courses');
        $http({
            method: 'GET',
            url: 'webresources/classroom/globalmetadata'
        }).then(function (response) {
            if (response.data) {
                let globalMetadata = response.data;
                console.log('loaded global metadata', globalMetadata);
                $http({
                    method: 'GET',
                    url: 'webresources/classroom/courses'
                }).then(
                        function (response) {
                            let courses = response.data;
                            let courseCount = courses.length;
                            let totalCourses = courseCount;
                            console.log('load courses got ' + courseCount + ' courses');
                            console.table(courses);
                            let p = 0;
                            angular.forEach(courses, function (course) {
                                $http({
                                    method: 'GET',
                                    url: 'webresources/classroom/metadata/' + course.id
                                }).then(function (response) {
                                    if (response.data) {
                                        course.metadata = response.data;
                                    }
                                }, function () {
                                    // not found
                                });
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
                                                        p++;
                                                        if (gameObject) {
                                                            let loaderScene = gameObject.scene.getScene('LoaderScene');
                                                            if (loaderScene) {
                                                                loaderScene.loadProgress(p, totalCourses);
                                                            }
                                                        }
                                                        if (courseCount === 0) {
                                                            console.log('all courses loaded');
                                                            let loaderScene = gameObject.scene.getScene('LoaderScene');
                                                            if (loaderScene) {
                                                                console.log('load completed');
                                                                loaderScene.loadCompleted(globalMetadata, courses);
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            });
                        }, function (error) {
                                console.log('courses service error', error);
                                if (error) {
                                    if (error.status === 401) {
                                        // back to home
                                        window.location.href = '/';
                                    }
                                }
                });
            }
        }, function () {
            // not found
        });

    };
});

