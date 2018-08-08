/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.airports', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('airports', {
          url: '/airports',
          controller: 'AirportCtrl',
          templateUrl: 'app/pages/airports/airports.html',
          title: 'Airports',
          sidebarMeta: {
            icon: 'ion-plane',
            order: 1,
          },
        });
  }

})();
