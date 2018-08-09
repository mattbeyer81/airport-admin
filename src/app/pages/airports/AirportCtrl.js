(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
    .controller('AirportCtrl', AirportCtrl);

    /** @ngInject */
    function AirportCtrl($scope, airportService, toastr) {

        $scope.airportForm = {};
        $scope.editAirportForm = false;

        /**
        * Get list of airports
         */
        $scope.getAirports = function(){
            airportService.getAirports().success(function(res){
                $scope.airports = res.results;
            });
        }
        $scope.getAirports();

        /**
        * View edit airport form
        */
        $scope.editAirport = function(airport){
            $scope.editAirportForm = true;
            angular.copy(airport, $scope.airportForm);
        }

        /**
        * Make request to save airport
        */
        $scope.saveAirport = function(){
            if ($scope.airportForm.id) {
                airportService.saveAirport($scope.airportForm).success(function(){
                    toastr.success('Airport sucessfully saved');
                    $scope.airportForm = {};
                    $scope.editAirportForm = false;
                    $scope.getAirports();
                }).error(function(){
                    toastr.error('There was an error trying to save');
                });
            } else {
                airportService.createAirport($scope.airportForm).success(function(){
                    toastr.success('Airport sucessfully created');
                    $scope.airportForm = {};
                    $scope.editAirportForm = false;
                    $scope.getAirports();
                }).error(function(){
                    toastr.error('There was an error trying to create airport');
                });
            }
        }

        /**
        * Make request to delete airport
        */
        $scope.deleteAirport = function(airport){
            airportService.deleteAirport(airport.id).success(function(){
                toastr.success('Airport sucessfully created');
                $scope.airportForm = {};
                $scope.editAirportForm = false;
                $scope.getAirports();
            }).error(function(){
                toastr.error('There was an error trying to create airport');
            });
        }

        /**
        * View add airport form
        */
        $scope.addAirport = function(){
            $scope.editAirportForm = true;
        }

        /**
        * Close airport form
        */
        $scope.closeAirportForm = function(){
            $scope.airportForm = {};
            $scope.editAirportForm = false;
        }

    }

})();
