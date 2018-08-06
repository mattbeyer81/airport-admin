(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
    .controller('ServiceCtrl', ServiceCtrl);

    /** @ngInject */
    function ServiceCtrl($scope, airportServiceService, toastr) {

        $scope.serviceForm = {};
        $scope.editServiceForm = false;;

        $scope.getServices = function(){
            airportServiceService.getServices().success(function(res){
                $scope.services = res.results;
            });
        }
        $scope.getServices();

        $scope.editService = function(service){
            $scope.editForm = true;
            angular.copy(airport, $scope.serviceForm);
        }

        $scope.saveService = function(){
            if ($scope.serviceForm.id) {
                airportServiceService.saveAirport($scope.serviceForm).success(function(){
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
            $scope.service = service;

        }

        $scope.saveOpeningHours = function(){
            var openingHours = [
                {
                    'day_of_week' : 'Monday',
                    'opening_time' : $scope.openingHours.monday_opening_time,
                    'closing_time' : $scope.openingHours.monday_closing_time
                }
            ];
            airportServiceService.saveOpeningHours($scope.service.id, openingHours).success(function(){
                toastr.success('Service sucessfully created');
                $scope.serviceForm = {};
                $scope.editForm = false;
                $scope.getServices();
            }).error(function(){
                toastr.error('There was an error trying to create service');
            });
        }


    }

})();
