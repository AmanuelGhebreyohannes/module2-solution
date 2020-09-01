(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController )
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemsList = this;
  itemsList.errorMessage="";
  itemsList.items = ShoppingListCheckOffService.getToBuyItems();
  if(itemsList.items.length!=0)
  itemsList.errorMessage= function(){
    if(itemsList.items.length==0)
    return 1;
    else return 0;

  }

  //itemsList.errorMessage=ShoppingListCheckOffService.getErrorMessageForToBuyItems();
  console.log(itemsList.errorMessage());
  itemsList.removeItem=function(itemIndex){
    ShoppingListCheckOffService.removeItem(itemIndex);
  };

}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;

  bought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
  bought.errorMessage= function(){
    if(bought.items.length==0)
    return 1;
    return 0;

  };
  //console.log(bought.items);

}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyItems = [{name:"chips",quantity:"2 bags"},{name:'cookies',quantity:'3 bags'},{name:'lays',quantity:'8 bags'},{name:'cola',quantity:'2 bottles'},{name:'pepsi',quantity:'7 bottles'}];
  var alreadyBoughtItems=[];

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getAlreadyBoughtItems = function () {
    return alreadyBoughtItems;
  };

  // service.getErrorMessageForToBuyItems=function(){
  //   if(toBuyItems.length==0)
  //   return true;
  // };
  //
  // service.getErrorMessageForBoughtItems=function(){
  //   if(alreadyBoughtItems.length==0)
  //   return true;
  // };

  service.removeItem=function(itemIndex){
    alreadyBoughtItems.push(toBuyItems[itemIndex]);
    toBuyItems.splice(itemIndex,1);
    //console.log(service.getErrorMessageForToBuyItems(),service.getErrorMessageForBoughtItems());

  };
}

})();
