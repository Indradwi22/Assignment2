(function() {
  'use strict';
var leftData = [];
var rightData = [];
var myData = [];
var results = [];
angular.module('componentController')
  .controller("myDataContainer", ['$scope', 'Device', function($scope, Device) {
    var _this = this;

      $scope.found = true;
      $scope.leftData  = [];
      $scope.rightData = [];
      $scope.mydata = [];
        
      function loadDevice () { 
          myData = Device.query();
          
          myData.$promise.then(function(data) {
              for(var i=0; i<data.length;i++){
                  $scope.mydata.push(data[i]);
              }
          });
          $scope.leftData = leftData;
        $scope.rightData = rightData;
        }
      
      $scope.prosearch = function(chek){
          $scope.search = chek;
          if(chek == false){
            $scope.found = false;
              $scope.message = "";
              $scope.results = [];
              $scope.enteredValue = "";
          }
      }
      
      $scope.findValue = function(enteredValue){
          $scope.results = [];
          if(enteredValue != null){
              
              if(enteredValue.length >= 3){
                  $scope.mydata = myData;
                  var total = 0;
                  for(var i=0; i<$scope.mydata.length;i++){
                      if($scope.mydata[i].name.match(enteredValue)){
                          //$scope.results.push($scope.mydata[i]);
                          total = total+1;
                      }
                  }
                  if(total>=1){
                          for(var i=0; i<$scope.mydata.length;i++){
                          if($scope.mydata[i].name.match(enteredValue)){
                              $scope.results.push($scope.mydata[i]);
                          }
                      }
                      $scope.found = true;
                      $scope.message = "";
                  }else{
                      $scope.found = false;
                      $scope.message = "Not Found";
                  }
                  
              }else{
                  $scope.found = false;
                  $scope.message = "Minimum 3 digit";
              }
          }else{
            $scope.found = false;
              $scope.message = "Search Box is empty";
          }
          results = $scope.results;
          console.log(results.length);
      }
       
      function del(key){
          var temp = [];
          for(var i=0; i<myData.length;i++){
              if(myData[i].name != key){
                //delindex = i;
                  temp.push(myData[i]);
              }
          }
          myData = temp;
      }
      
      $scope.move = function(index, position){
          var key = "";
          if(position == "left"){
            $scope.leftData.push($scope.results[index]);
              key = $scope.results[index].name;
          }else{
            $scope.rightData.push($scope.results[index]);
              key = $scope.results[index].name;
          }
          del(key);
          $scope.results.splice(index,1);
          
          $scope.enteredValue = "";
          $scope.findValue(null);
          $scope.prosearch(false);
     }
      
      
    $scope.deleteData = function(index, position){
        if(position == "left"){
            myData.push($scope.leftData[index]);
            results.push($scope.leftData[index]);
            $scope.leftData.splice(index,1);
            
        }else{
            myData.push($scope.rightData[index]);
            results.push($scope.rightData[index]);
            $scope.rightData.splice(index,1);
        }
     }
          loadDevice();

      
  }]);
})();