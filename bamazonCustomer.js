var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


//connect to mysql
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
	if (err) console.log(err);
});

    connection.query("SELECT * FROM Products", function(err, result) {
        if (err) console.log(err);

        var table = new Table({
        head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Quantity Available'],
        style: {
          head: ['blue'],
          compact: false,
          colAligns: ['center'],
        }
      });

    for (var i = 0; i < result.length; i++) {
        table.push(
            [result[i].item_id, result[i].product_name, result[i].department_name, result[i].price, result[i].stock_quantity]
  );
}
    console.log(table.toString());
        initialQuestions();

      });

//Intial questions
function initialQuestions() {
  inquirer.prompt ([
    {
      name: "id",
      message: "Enter the ID of the product you would like to purchase.",
      validate: function(value){
  			var valid = value.match(/^[0-9]+$/)
  			if(valid){
  				return true
  			}
  				return 'Please enter a numerical value'
  		}
},
{
      name: "quantity",
      message: "Enter how many you would like to purchase.",
      validate: function(value){
  			var valid = value.match(/^[0-9]+$/)
  			if(valid){
  				return true
  			}
  				return 'Please enter a numerical value'
  		}
  }
  ]).then(function(answers) {
  connection.query("SELECT stock_quantity FROM products WHERE ?", { item_id: answers.id }, function(err, res) {
		        if (answers.quantity > res[0].stock_quantity) {
		        	console.log("Insufficient quantity!");
		        	anotherOrder();
		        } else {
              totalCost = res[0].price*answers.quantity;
              console.log("Your total is $" + totalCost);

//Update table
	connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: res[0].stock_quantity - answers.quantity
      },
      {
        item_id: answers.id
      }
    ],
    function(err, result) {
    });
    anotherOrder();
  }
})

}, function(err, res){})
};


//Option to buy another product or end shopping trip
function anotherOrder(){
	inquirer.prompt([{
		type: 'confirm',
		name: 'choice',
		message: 'Would you like to place another order?'
	}]).then(function(answer){
		if(answer.choice){
			initialQuestions();
		}
		else{
			console.log('Thank you for your purchase. Have a great day!');
			connection.end();
		}
	})
};
