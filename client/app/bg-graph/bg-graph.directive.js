'use strict';

angular.module('r2twDbApp')
  .directive('bgGraph', function () {
    return {
      templateUrl: 'app/bg-graph/bg-graph.html',
      restrict: 'E',
      replace: true,
      transclude: true,
      scope :{
        'min': '=',
        'max': '=',
        'items': '=',
        'color': '@'
      },
      link: function (scope, element, attrs) {
        scope.$watch('items', function() {
        var span = scope.max - scope.min;
        var percent = 0;
        var gradients = ['linear-gradient(to right'];

          scope.items.concat({value:0, color: 'rgba(0,0,0,0)'}).forEach(function(item){
            gradients.push(item.color + ' ' + percent + '%');
            percent += (item.value - scope.min) / span * 100;
            gradients.push(item.color + ' ' + percent + '%');
          });

          scope.style = {
            'background': gradients.join(', ')
          };
        });
      }
    };
  });
