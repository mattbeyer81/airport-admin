(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .service('airportService', airportService);

  /** @ngInject */
  function airportService($http) {

      return {
          getAirports : function(){
              return $http.get(url + '/api/airports');
          }

      }


  }
})();
