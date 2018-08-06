(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
    .controller('AirportCtrl', AirportCtrl);

    /** @ngInject */
    function AirportCtrl($scope, airportService) {

        airportService.getAirports().success(function(res){
            $scope.airports = res;
        });

        $scope.editAirport = function(airport){
            angular.copy(airport, $scope.airportForm);
        }

        $scope.saveAirport = function(){
            console.log($scope.aiportForm);throw 4;
        }


    }

})();
