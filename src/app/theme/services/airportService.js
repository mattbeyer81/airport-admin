(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .service('airportServiceService', airportServiceService);

  /** @ngInject */
  function airportServiceService($http) {

      return {
          getServices : function(){
              return $http.get(url + '/api/services');
          },
          saveService : function(service){
              return $http.put(url + '/api/services', service);
          },
          createService : function(service){
              return $http.post(url + '/api/services', service);
          },
          deleteServices : function(serviceId){
              return $http.delete(url + '/api/services/' + serviceId);
          },
          saveOpeningHours : function(serviceId, openingHours){
              return $http.post(url + '/api/services/' + serviceId + '/opening-hours', openingHours);
          },
          search : function(params){
              return $http.get(url + 'api/services/search', params);
          }
      }


  }
})();
