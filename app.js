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
    //Objects to easier change the class data etc.
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        
        //Make DOMstrings to the public method
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
    
})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
    //Object DOMstrings from UIController
    var DOM = UICtrl.getDOMstrings();
    
    var setupEventListeners = function() {
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', function(event) {
            
        if(event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
            }
        });
    }
    
    var ctrlAddItem = function() {
        
        //1. Get the filed input data
        var input = UICtrl.getInput();

        //2. Add the item to the budget

        //3. Add the item to the UI

        //4. Calculate the budget

        //5. Display the budget on the UI
    };
    
    return {
        init: function() {
            console.log('Application has started');
            setupEventListeners();
        }
    }
    
})(budgetController, UIController);

controller.init();












