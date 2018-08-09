(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
    .controller('ServiceCtrl', ServiceCtrl);

    /** @ngInject */
    function ServiceCtrl($scope, airportServiceService, toastr, airportService) {

        $scope.serviceForm = {};
        $scope.editServiceForm = false;
        $scope.form = {};

        $scope.daysOfWeek = {
            "0": 'Sunday', "1": 'Monday', "2": "Tuesday", "3": "Wednesday", 4: "Thursday", "5": "Friday", "6": "Saturday"
        }

        /**
         * Get a list of airports
         */
        $scope.getAirports = function(){
            airportService.getAirports().success(function(res){
                $scope.airports = res.results;
                $scope.setSearchParams();
            });
        }

        $scope.getAirports();


        /**
         * Set the default search params
         */
        $scope.setSearchParams = function(){
            $scope.searchParams = {
                day_of_week : "0",
                from : new Date('1970-01-01T00:00:00Z'),
                to : new Date('1970-01-01T00:00:00Z')
            };
        }

        /**
         * Create data objects for each of the services opening hours
         */
        $scope.formatOpeningHourDates = function(){
            angular.forEach($scope.services, function(service){
                angular.forEach(service.opening_hours, function(openingHour){
                    openingHour.opening_time = new Date('1970-01-01T' + openingHour.opening_time + 'Z');
                    openingHour.closing_time = new Date('1970-01-01T' + openingHour.closing_time + 'Z');
                })
            })
        }

        /**
         * Get list of airport services using search parameters
         */
        $scope.search = function(){
            airportServiceService.search($scope.searchParams).success(function(res){
                $scope.services = res.results;
                $scope.closeOpeningHours();
                $scope.formatOpeningHourDates();

            });
        }


        $scope.clearSearch = function(){
            $scope.form.searchFormValidation.$setPristine();
            $scope.setSearchParams();
            $scope.getServices();
        }

        /**
         * Get list of airport services
         */
        $scope.getServices = function(){
            airportServiceService.getServices().success(function(res){
                $scope.services = res.results;
                $scope.formatOpeningHourDates();
            });
        }
        $scope.getServices();

        /**
         * View edit service form
         */
        $scope.editService = function(service){
            $scope.editForm = true;
            angular.copy(service, $scope.serviceForm);
            $scope.serviceForm.airport_code = service.airport.code;
        }


        /**
        * Make request to save opening hours
         */
        $scope.saveOpeningHours = function(){
            airportServiceService.saveOpeningHours($scope.serviceForm.id, $scope.serviceForm.opening_hours).success(function(){
                toastr.success('Service sucessfully saved');
                $scope.closeOpeningHours();
                $scope.getServices();
            }).error(function(){
                toastr.error('There was an error trying to save');
            });

        }

        /**
        * Make request to save service
         */
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

        /**
        * Make request to delete service
         */
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

        /**
        * View add service form
         */
        $scope.addService = function(){
            $scope.editForm = true;
        }

        $scope.closeServiceForm = function(){
            $scope.serviceForm = {};
            $scope.editForm = false;
            $scope.getServices();
        }

        /**
        * View edit service form
         */
        $scope.editOpeningHours = function(service){
            $scope.serviceForm = {};
            $scope.editServiceForm = false;
            $scope.viewOpeningHours = true;
            $scope.openingHours = {};
            $scope.serviceForm = service;

        }

        /**
        * Close opening hours form
         */
        $scope.closeOpeningHours = function(){
            $scope.serviceForm = {};
            $scope.editServiceForm = false;
            $scope.viewOpeningHours = false;
            $scope.openingHours = {};
        }

    }

})();
