const school = "san-jeronimo";
var total = 0;

$(document).ready(function() {
	
	initializeFireBase();
	loadData();

	$(".items").on("click", ".tile", function() {
		console.log("dkdkdk")
		const productID = $(this).attr("id");
		const productName = $(this).find("p.product-name").text();
		const productPrice = Number($(this).find("p.product-price").text().substring(1));

		console.log(productID)
		console.log(productName)
		console.log(productPrice)

		var newOrderItem = 
		"<tr id = '" + productID + "'> \n "
		+ " <td class = 'name'> \n"
		+ productName 
		+ "\n</td> \n "
		+ "<td class = 'price'>$" + productPrice
		+ "</td> \n "
		+ " <td> <button class = 'delete-button'> x </button> </td> \n "
		+" </tr>";

		$(".order-list").append(newOrderItem);
		total += Number(productPrice) * 100;
		$(".total-amount").text("$" + String(total/100));
	});

	$(".order-list").on("click", ".delete-button", function() {
		const productPrice = Number($(this).closest("tr").find(".price").text().substring(1)) * 100;
		total -= productPrice;
		$(".total-amount").text("$" + String(total/100));
		$(this).closest("tr").remove();
	});


});

function initializeFireBase() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA-Ck5hQjP5V3Wj3OrecvjPl4NNNzb0gqs",
    authDomain: "testnew-de7c3.firebaseapp.com",
    databaseURL: "https://testnew-de7c3.firebaseio.com",
    projectId: "testnew-de7c3",
    storageBucket: "testnew-de7c3.appspot.com",
    messagingSenderId: "183924315473"
  };

  //Initializing with selected config
  firebase.initializeApp(config);
  console.log("init")
}

function loadData() {

	const dataRef = firebase.database().ref(school + "/products");
	var html = "";
	dataRef.once("value", function(snapshot) {

		$(".items").empty();
		$(".items").append("<br><br>");

		const products = snapshot.val();
		var product;
		for(var key in products) {
			if(products.hasOwnProperty(key)) {
				product = products[key];
				const name = product.name;
				const price = (Number(product.amount) / 100).toString();
				const pictureURL = product.pictureURL;

				html += "<tile class= 'tile' id='" + key + "'>\n"
			    + "<center>\n "
			    +  "<img class='item-img' src='" + pictureURL + "'></img>\n"   
			    +  "<br>\n"
			    +  "<p class='product-name'>" + name + "</p>\n"
			    +  "<p class='product-price'>$" + price + "</p>\n"
			    + "</center>\n"
			  	+ "</tile>\n"
			}
		}

		console.log(html);
		$(".items").append(html);
	});
}


