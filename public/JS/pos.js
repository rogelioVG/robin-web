const school = "san-jeronimo";
var total = 0;

$(document).ready(function() {
	
	initializeFireBase();
	loadData();

	$("#items").on("click", ".tile", function() {
		const productID = $(this).attr("id");
		const productName = $(this).closest("p.product-name").text();
		const productPrice = Number($(this).closest("p.product-price").text());

		var newOrderItem = "<tr id = '" + productID + "'><td>"+ productName 
		+ "</td> <td class = 'product-price-table'>$" + (productPrice/100).toString()
		+ "</td> <td> <button class = '.btn-delete'>X</button> </td> </tr>";

		$("#order-items table").append(newOrderItem);
		total += productPrice;
		$("#total").html("$" + String(total/100));
	});

	$("#order-items").on("click", ".btn-delete", function() {
		const productPrice = Number($(this).closest("tr").find(".product-price-table").text()) * 100;
		total -= productPrice;
		$("#total").html("$" + String(total/100));
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
}

function loadData() {

	const dataRef = firebase.database().ref(school + "/products");
	

}
