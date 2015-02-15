'use strict';

angular.module('r2twDbApp')
  .controller('NavbarCtrl', function ($scope, $location, Config) {
    $scope.menu = [
      {
        'title': '勢力別ユニット',
        'link': '/'
      },
      {
        'title': '全ユニット',
        'link': '/all_units'
      }
    ];

    $scope.menu2 = [
      {
        'title': '説明',
        'link': '/readme'
      },
      {
        'title':'更新履歴 (v' + Config.version + ')',
        'link': '/changelog'
      }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });