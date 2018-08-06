/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.services', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('services', {
          url: '/services',
          controller: 'ServiceCtrl',
          templateUrl: 'app/pages/services/services.html',
          title: 'Airport Services',
          sidebarMeta: {
            icon: 'ion-stats-bars',
            order: 2,
          },
        });
  }

})();
