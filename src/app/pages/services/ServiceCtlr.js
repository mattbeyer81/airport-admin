(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
    .controller('ServiceCtrl', ServiceCtrl);

    /** @ngInject */
    function ServiceCtrl($scope, airportServiceService, toastr) {

        $scope.serviceForm = {};
        $scope.editServiceForm = false;;
        $scope.mytime = new Date();

        $scope.daysOfTheWeek = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ]

        $scope.getServices = function(){
            airportServiceService.getServices().success(function(res){
                $scope.services = res.results;
                angular.forEach($scope.services, function(service){
                    angular.forEach(service.opening_hours, function(openingHour){
                        openingHour.opening_time = new Date(openingHour.opening_time);
                        openingHour.closing_time = new Date(openingHour.closing_time);
                    })
                })
            });
        }
        $scope.getServices();

        $scope.editService = function(service){
            $scope.editForm = true;
            angular.copy(airport, $scope.serviceForm);
        }


        $scope.saveOpeningHours = function(){

            airportServiceService.saveOpeningHours($scope.serviceForm.id, $scope.serviceForm.opening_hours).success(function(){
                toastr.success('Service sucessfully saved');
                $scope.serviceForm = {};
                $scope.editForm = false;
                $scope.getServices();
            }).error(function(){
                toastr.error('There was an error trying to save');
            });

        }


        $scope.saveService = function(){
            if ($scope.serviceForm.id) {
                airportServiceService.saveService($scope.serviceForm).success(function(){
                    toastr.success('Service sucessfully saved');
                    $scope.serviceForm = {};
                    $scope.editForm = false;
                    $scope.getServices();
                }).error(function(){
                    toastr.error('There was an error trying to save');
                });
            } else {
                airportServiceService.createService($scope.serviceForm).success(function(){
                    toastr.success('Service sucessfully created');
                    $scope.serviceForm = {};
                    $scope.editForm = false;
                    $scope.getServices();
                }).error(function(){
                    toastr.error('There was an error trying to create service');
                });
            }
        }

        $scope.deleteService = function(airport){
            airportServiceService.deleteService(airport.id).success(function(){
                toastr.success('Service sucessfully created');
                $scope.serviceForm = {};
                $scope.editForm = false;
                $scope.getServices();
            }).error(function(){
                toastr.error('There was an error trying to create service');
            });
        }


        $scope.addService = function(){
            $scope.editForm = true;
        }

        $scope.closeServiceForm = function(){
            $scope.serviceForm = {};
            $scope.editServiceForm = false;
        }

        $scope.editOpeningHours = function(service){
            $scope.serviceForm = {};
            $scope.editServiceForm = false;
            $scope.viewOpeningHours = true;
            $scope.openingHours = {};
            $scope.serviceForm = service;

        }

        // $scope.saveOpeningHours = function(){
        //     var openingHours = [
        //         {
        //             'day_of_week' : 'Monday',
        //             'opening_time' : $scope.openingHours.monday_opening_time,
        //             'closing_time' : $scope.openingHours.monday_closing_time
        //         }
        //     ];
        //     airportServiceService.saveOpeningHours($scope.service.id, openingHours).success(function(){
        //         toastr.success('Service sucessfully created');
        //         $scope.serviceForm = {};
        //         $scope.editForm = false;
        //         $scope.getServices();
        //     }).error(function(){
        //         toastr.error('There was an error trying to create service');
        //     });
        // }


    }

})();
