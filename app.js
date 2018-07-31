// BUDGET CONTROLLER
let budgetController = (() => {
    
    let Expense = class {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
            this.percentage = -1;
        }
        
        calcPercentage(totalIncome) {
            if(totalIncome > 0) {
                this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
                this.percentage = -1;
            }
        }
        
        getPercentage() {
          return this.percentage;  
        }
    };
    
    let Income = class {
        constructor (id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    };
    
    let calculateTotal = type => {
        let sum = 0;
        data.allItems[type].forEach(cur => sum += cur.value);
        data.totals[type] = sum;
    };
    
    let data = {
        allItems: {
            expense: [],
            income: []
        },
        totals: {
            expense: 0,
            income: 0
        },
        budget: 0,
        percentage: -1
        
    };
    
    return {
        addItem: (type, des, val) => {
            let newItem, ID;
            
            //Create new ID
//            if (data.allItems[type].length > 0) {
//              ID = data.allItems[type][data.allItems[type].length -1].id +1;  
//            } else {
//                ID = 0;
//            }
            ID = budgetController.idGenerator();
            
            //Create new item based on 'income' or 'expense' type
            if(type === 'expense') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'income') {
                newItem = new Income(ID, des, val);
            }
            
            //Push it into our data structure
            data.allItems[type].push(newItem);
            
            //Return the new element
            return newItem;
        },
        
        calculateBudget: () => {
            
            // Calculate total income and expenses
            calculateTotal('expense');
            calculateTotal('income');
            
            // Calculate the budget: income - expenses
            data.budget = data.totals.income - data.totals.expense;
            
            // Calculate the percentage of income that we spent
            if(data.totals.income > 0) {
                data.percentage = Math.round((data.totals.expense / data.totals.income) * 100);   
            } else {
                data.percentage = -1;
            }
        },
        
        calculatePercentages: () => {
            
            data.allItems.expense.forEach(cur => cur.calcPercentage(data.totals.income));
            
        },
        
        getPercentages: () => {
            let allPerc = data.allItems.expense.map(cur => cur.getPercentage());
            return allPerc;
        },
        
        deleteItem: (type, id) => {
            let ids, index;
            
            ids = data.allItems[type].map(current => current.id);
            
            index = ids.indexOf(id);
            
            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }
            
        },
        
        getBudget: () => {
            return {
                budget: data.budget,
                totalInc: data.totals.income,
                totalExp: data.totals.expense,
                percentage: data.percentage
            };    
        },
        
        idGenerator: () => {
		  let chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		  let str = '';
		  for( let i = 0; i < 10; i++) {
              str+= chars[Math.floor(Math.random()* chars.length)];
		  };
		  return str;
	   },
        
        testing: () => console.log(data)
    };
    
})();



// UI CONTROLLER
let UIController = (() => {
    //Objects to easier change the class data etc.
    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expsensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage'
    }
    
    return {
        getInput: () => {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        
        addListItem: (obj, type) => {
            let html, newHtml, element;
            // Create HTML string with placehoolder text
            
            if(type === 'income') {
                element = DOMstrings.incomeContainer;
                html = `<div class="item clearfix" id="income-%id%">
                    <div class="item__description">%description%</div>
                    <div class="right clearfix">
                        <div class="item__value">%value%</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>`;  
            } else if (type === 'expense') {
                element = DOMstrings.expensesContainer;
                html = `<div class="item clearfix" id="expense-%id%">
                    <div class="item__description">%description%</div>
                    <div class="right clearfix">
                        <div class="item__value">%value%</div>
                        <div class="item__percentage"></div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>`;               
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);           
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
        },
        
        deleteListItem: selectorID => {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);    
        },
        
        clearFields: () => {
            let fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach((current, index, array) => current.value = '');
            
            fieldsArr[0].focus();
        },
        
        displayBudget: obj => {
            
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expsensesLabel).textContent = obj.totalExp;
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;
            
            if(obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';               
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '--';             
            }
            
        },
        
        displayPercentages: percentages => {
            
            let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);   
            
            let nodeListForEach = (list, callback) => {
                for(let i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }   
            };
            
            nodeListForEach(fields, (current, index) => {
                
                if(percentages[index] > 0) {
                current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },
        
        //Make DOMstrings to the public method
        getDOMstrings: () => DOMstrings
    };
    
})();


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












