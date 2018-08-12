// UI CONTROLLER
const UIController = (() => {
    //Objects to easier change the class data etc.
    const DOMstrings = {
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
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    
            
    const formatNumber = (num, type) => {
        let numSplit, int, dec
            
        num = Math.abs(num);
        num = num.toFixed(2);
            
        numSplit = num.split('.')
        int = numSplit[0];
            
        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);    
         }
            
        dec = numSplit[1];
            
        return (type === 'expense' ? '-' : '+') + ' ' + int + '.' + dec;
            
    };
    
    const nodeListForEach = (list, callback) => {
    for(let i = 0; i < list.length; i++) {
        callback(list[i], i);
        }   
    };    
    
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
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));           
            
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
        
        displayBudget: (obj, type) => {
            
            obj.budget > 0 ? type = 'income' : type = 'expense';
            
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'income');
            document.querySelector(DOMstrings.expsensesLabel).textContent = formatNumber(obj.totalExp, 'expense');
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;
            
            if(obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';               
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '--';             
            }
            
        },
        
        displayPercentages: percentages => {
            
            let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);   
        
            
            nodeListForEach(fields, (current, index) => {
                
                if(percentages[index] > 0) {
                current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },
        
        displayMonth: () => {
            let now, month, months, year;
            
            now = new Date();
            
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },
        
        changedType: () => {
                
            let fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);
            
            nodeListForEach(fields, cur => {
               cur.classList.toggle('red-focus');
            });
            
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
            
        },
        
        //Make DOMstrings to the public method
        getDOMstrings: () => DOMstrings
    };
    
})();
export default UIController;