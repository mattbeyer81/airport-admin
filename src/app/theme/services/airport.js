(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .service('airportService', airportService);

  /** @ngInject */
  function airportService($http) {

      return {
          getAirports : function(){
              return $http.get(url + '/api/airports');
          },
          saveAirport : function(airport){
              return $http.put(url + '/api/airports', airport);
          },
          createAirport : function(airport){
              return $http.post(url + '/api/airports', airport);
          },
          deleteAirport : function(airportId){
              return $http.delete(url + '/api/airports/' + airportId);
          }
      }


  }
})();
