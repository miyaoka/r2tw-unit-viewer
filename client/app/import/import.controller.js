'use strict';

angular.module('r2twDbApp')
  .controller('ImportCtrl', function ($scope, x2js, Api) {

    $scope.files = [];

    $scope.readMethod = 'readAsText';
    $scope.onReaded = function( e, file ){
      file.data = e.target.result;
      file.success = 0;
      file.error = 0;
      file.count = 0;
      $scope.files.push(file);

      // filename without ext.
      var tablename = file.name.match(/(.*)(?:\.([^.]+$))/)[1];
      if(!Api[tablename]){
        return;
      }
      var items = x2js.xml_str2json(file.data)['dataroot'][tablename];
      file.count = items.length;

      //remove all
      Api[tablename].remove(function(res){
        items.forEach(function(item){
          // remove attrs in xml and use value string only.
          for (var key in item){
            item[key] = item[key].toString();
          }

          //submit
          Api[tablename].create(
            item,
            function(res){
              file.success++;
              console.log(res);
            }, function(err){
              file.error++;
              console.log(err);
            }
          );
        });
      });

    };
  });
