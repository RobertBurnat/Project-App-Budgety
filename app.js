import budgetController from './budgetController.js'
import UIController from './UIController.js'

//GLOBAL APP CONTROLLER
const controller = (() => {
    //Object DOMstrings from UIController
    const DOM = UIController.getDOMstrings();
    
    const setupEventListeners = () => {
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', event => {
            
        if(event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
            }
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UIController.changedType);
        
    };
    
    const updateBudget = () => {
        
        //1. Calculate the budget
        budgetController.calculateBudget();
        
        //2. Return  the budget
        const budget = budgetController.getBudget();

        //3. Display the budget on the UI
        UIController.displayBudget(budget);
    };
    
    const updatePercentages = () => {
        
        // 1. Calculate percentages
        budgetController.calculatePercentages();
        
        // 2. Read percentages from the budget controller
        const percentages = budgetController.getPercentages();
        
        // 3. Update the UI with the new percentages
        UIController.displayPercentages(percentages);
        
    }
    
    const ctrlAddItem = () => {
        let input, newItem;
        
        //1. Get the filed input data
        input = UIController.getInput();
        
        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. Add the item to the budget controller
            newItem = budgetController.addItem(input.type, input.description, input.value);

            //3. Add the item to the UI
            UIController.addListItem(newItem, input.type);

            //4. Clear the fields
            UIController.clearFields();

            //5. Calculate and update budget
            updateBudget();    
            
            //6. Calculate and update percentages
            updatePercentages();
            
        }

    };
    
    const ctrlDeleteItem = event => {
        let itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.id;
        
        if(itemID) {
            
            splitID = itemID.split('-')   
            type = splitID[0];
            ID = splitID[1];
            
            // 1. delete the item from the data structure
            budgetController.deleteItem(type, ID)
            
            // 2. Delete the item from the UI
            UIController.deleteListItem(itemID);
            
            // 3. Update and show the new budget
            updateBudget();
            
            // 4. Calculate and update percentages
            updatePercentages();
            
        }
    }
    
    return {
        init: () => {
            console.log('Application has started');
            UIController.displayMonth();
            UIController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0               
            });
            setupEventListeners();
        }
    }
    
})();

controller.init();












