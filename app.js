import budgetController from './budgetController.js'
import UIController from './UIController.js'

//GLOBAL APP CONTROLLER
let controller = ((budgetCtrl, UICtrl) => {
    //Object DOMstrings from UIController
    let DOM = UICtrl.getDOMstrings();
    
    let setupEventListeners = () => {
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', event => {
            
        if(event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
            }
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
    };
    
    let updateBudget = () => {
        
        //1. Calculate the budget
        budgetCtrl.calculateBudget();
        
        //2. Return  the budget
        let budget = budgetCtrl.getBudget();

        //3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };
    
    var updatePercentages = () => {
        
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        
        // 2. Read percentages from the budget controller
        let percentages = budgetCtrl.getPercentages();
        
        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
        
    }
    
    let ctrlAddItem = () => {
        let input, newItem;
        
        //1. Get the filed input data
        input = UICtrl.getInput();
        
        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            //4. Clear the fields
            UICtrl.clearFields();

            //5. Calculate and update budget
            updateBudget();    
            
            //6. Calculate and update percentages
            updatePercentages();
            
        }

    };
    
    let ctrlDeleteItem = event => {
        let itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if(itemID) {
            
            splitID = itemID.split('-')   
            type = splitID[0];
            ID = splitID[1];
            
            // 1. delete the item from the data structure
            budgetCtrl.deleteItem(type, ID)
            
            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);
            
            // 3. Update and show the new budget
            updateBudget();
            
            // 4. Calculate and update percentages
            updatePercentages();
            
        }
    }
    
    return {
        init: () => {
            console.log('Application has started');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0               
            });
            setupEventListeners();
        }
    }
    
})(budgetController, UIController);

controller.init();












