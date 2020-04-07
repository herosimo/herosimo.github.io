// Budget controller
var budgetController = (function() {
    // Create protoype expense
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    // Inheritance for caclulating percentage
    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    // Inheritance method to get percentage
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    // Create protoype income
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Calculate total income / expenses
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });

        data.totals[type] = sum;
    };

    // Structured data into one big variable
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        // -1 means that the value doesn't exist yet
        percentage: -1
    };

    return {
        // Object in this return will be accessible form other Controller (IFEE)
        addItem: function(type, des, val) {
            var newItem, ID;

            // Create nw ID where ID = last ID + 1. ID will start from 0
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on exp or inc
            if (type === "exp") {
                newItem = new Expense(ID, des, val);
            } else if (type === "inc") {
                newItem = new Income(ID, des, val);
            }

            // store new item to array data.allitems
            data.allItems[type].push(newItem);

            // return the new item
            return newItem;
        },

        // Delete item by index
        deleteItem: function(type, id) {
            var ids, index;

            // Break down array data.allitems to only id (map will create new array)
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            // Get the index of the id from ids's array
            index = ids.indexOf(id);

            // if index !empti, it will remove
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function() {
            // Calculate total income and expenses
            calculateTotal("exp");
            calculateTotal("inc");

            // Calcualte the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // Calculate the percetange of income have spent if there is icnome
            // Example; expense 100, income 200, spent => 100/200 => 0.5, 0.5 * 100 = 50
            // Math round to round to cloeset integer, 33,3333 will be 33
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        // Running Calculate percetages function
        calculatePercentages: function() {
            data.allItems.exp.forEach(function(cur) {
                // this will save data.allitems.exp.percentage variable in each object
                cur.calcPercentage(data.totals.inc);
            });
        },

        // Get percentages
        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur) {
                // this will run getPercentage in each object and store it to allPerc
                return cur.getPercentage();
            });
            return allPerc;
        },

        // Return budget so we can access form UI Controller later
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: function() {
            console.log(data);
        }
    };
})();

// UI Controller
var UIController = (function() {
    // Create object for storing DOM class
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expensesLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        container: ".container",
        expensesPercLabel: ".item__percentage",
        dateLabel: ".budget__title--month"
    };

    // to format number
    var formatNumber = function(num, type) {
        // + or - before number
        // exactly 2 decimal points
        // comma seprating the thousand
        var numSplit, int, dec, type;

        // overide num, remove - sign
        num = Math.abs(num);
        // overide num, will be converted to string, add 2 point decimal (200 => 200.00)
        num = num.toFixed(2);

        // split int and dec (200.00 => [200, 00])
        numSplit = num.split(".");
        int = numSplit[0];

        // add comma per thousand (1,000,000)
        if (int.length > 3) {
            // this substr will splice into length - 3 (exp 30000 = 5 - 3 = 2 => 30,000)
            int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
        }
        dec = numSplit[1];

        return (type === "exp" ? "-" : "+") + " " + int + "." + dec;
    };

    // Create function to loop on nodelist, and do callback function
    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        // Object in this return will be accessible form other Controller (IFEE)
        getInput: function() {
            return {
                // will be either inc or exp (from select value)
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                // Change string input to float
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        // Adding item
        addListItem: function(obj, type) {
            var html, newHtml, element;
            // 1. Create HTML String with placeholder text
            if (type === "inc") {
                element = DOMstrings.incomeContainer;
                html =
                    '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === "exp") {
                element = DOMstrings.expensesContainer;
                html =
                    '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // 2. Replace the placeholder text with actual data
            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%description%", obj.description);
            newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

            // 3. Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
        },

        // Remove with class_id
        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        // Clearing input fields
        clearFields: function() {
            var fields, fieldsArr;

            // Select 2 input fields
            fields = document.querySelectorAll(
                DOMstrings.inputDescription + ", " + DOMstrings.inputValue
            );

            // QuerySelectorAll will give list, then we need to change to array
            fieldsArr = Array.prototype.slice.call(fields);

            // use foreach to change the value of each input field to "[nothing]"
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            // set focus back to input description
            fieldsArr[0].focus();
        },

        // Update budget UI after item added
        displayBudget: function(obj) {
            var type;
            obj.budget > 0 ? (type = "inc") : (type = "exp");

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(
                obj.budget,
                type
            );
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(
                obj.totalInc,
                "inc"
            );
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(
                obj.totalExp,
                "exp"
            );

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent =
                    obj.percentage + "%";
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = "---";
            }
        },

        // Displaying percentages on each expense
        displayPercentages: function(percentages) {
            // Get all expenses
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            // Check if percentage exist, than will replace on DOM
            nodeListForEach(fields, function(current, index) {
                if (percentages > 0) {
                    current.textContent = percentages[index] + "%";
                } else {
                    current.textContent = "---";
                }
            });
        },

        // Dispalying month and year
        dispalyMonth: function() {
            var now, months, month, year;

            now = new Date();
            months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ];
            month = now.getMonth();
            year = now.getFullYear();

            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + " " + year;
        },

        // Change outline on inptu field when type + or -
        changedType: function() {
            var fields = document.querySelectorAll(
                DOMstrings.inputType +
                    "," +
                    DOMstrings.inputDescription +
                    "," +
                    DOMstrings.inputValue
            );

            nodeListForEach(fields, function(cur) {
                cur.classList.toggle("red-focus");
            });

            // The button color
            document.querySelector(DOMstrings.inputBtn).classList.toggle("red");
        },

        // Return DOMString so we can use on other controller
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
})();

// Global App contoller
var controller = (function(budgetCtrl, UICtrl) {
    // Grouping same event listener to one function
    var setupEventListeners = function() {
        // Get DOMstrings from UI Controller
        var DOM = UICtrl.getDOMstrings();

        // When button clicked
        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

        // When keyboard pressed
        document.addEventListener("keypress", function(event) {
            // Check if keyboard pressed is "enter"
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        // When delete button clicked
        document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem);

        // When + or - type change
        document.querySelector(DOM.inputType).addEventListener("change", UICtrl.changedType);
    };

    // Update expense percentages
    var updatePercentages = function() {
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();

        // 2. Read percentages from budget controller
        var percentages = budgetCtrl.getPercentages();

        // 3. Update UI with new percentages
        UICtrl.displayPercentages(percentages);
    };

    // After user add item, this will run
    var updateBudget = function() {
        var budget;

        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        budget = budgetCtrl.getBudget();

        // 3. Display the budget on UI
        UICtrl.displayBudget(budget);
    };

    // When user add item
    var ctrlAddItem = function() {
        var input, newItem;

        // 1. Get field input data (from UI Controller)
        input = UICtrl.getInput();

        // Check if input null, isNaN will true if not number, !isNaN will true if number
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller (from Budget Controller)
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to UI (from UI Controller)
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields (from UI Controller)
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();

            // 6. Calculate and update percentages
            updatePercentages();
        }
    };

    // When delete button clicked (the function)
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;

        // Will grab the id(inc-1, exp0, etc) of the button click located
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        // If the button that clicked exist
        if (itemID) {
            // split string to array (inc-1 becomes [inc, 1])
            splitID = itemID.split("-");
            // save the type (inc or exp)
            type = splitID[0];
            // save the ID
            ID = parseInt(splitID[1]);

            // 1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. Delete the item form the UI
            UICtrl.deleteListItem(itemID);

            // 3. Update and show the new budget
            updateBudget();

            // 4. Calculate and update percentages
            updatePercentages();
        }
    };

    return {
        // Object in this return will be accessible form other Controller (IFEE)
        // this ini func will be executed when starting the app
        init: function() {
            console.log("Application started");
            UICtrl.dispalyMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };
})(budgetController, UIController);

// To start init function from controller (if this not enable, then app will no work)
controller.init();
