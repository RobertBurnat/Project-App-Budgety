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
export default budgetController;