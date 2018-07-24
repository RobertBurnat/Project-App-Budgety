// BUDGET CONTROLLER
var budgetController = (function() {
    
    var x = 23;    
    var add = function(a) {
        return x + a;
    }
    return {
        publicTest: function(b) {
            return (add(b));
        }
    }
    
})();



// UI CONTROLLER
var UIController = (function() {
    
    //Some code
    
    
    
})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
    
   document.querySelector('.add__btn').addEventListener('click', function() {
      
       // 1. Get the filed input data
       
       //2. Add the item to the budget
       
       //3. Add the item to the UI
       
       //4. Calculate the budget
       
       //5. Display the budget on the UI
       
   });
    
    document.addEventListener('keypress', function(event) {
        console.log(event);
    })
    
})(budgetController, UIController);














