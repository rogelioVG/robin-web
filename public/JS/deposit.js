var selGoal;

var stripe = Stripe('pk_live_4mxodS1urqM170r0EBSO5qG4');

var tutor;

$(document).ready(function() {



  var user = firebase.auth().currentUser;

  console.log(user);

    $('.one').on("click", function(){
      amount += "1";
      $('.amount').html("$"+amount);
    });

    $('.two').on("click", function(){
      amount += "2";
      $('.amount').html("$"+amount);
    });

    $('.three').on("click", function(){
      amount += "3";
      $('.amount').html("$"+amount);
    });

    $('.four').on("click", function(){
      amount += "4";
      $('.amount').html("$"+amount);
    });

    $('.five').on("click", function(){
      amount += "5";
      $('.amount').html("$"+amount);
    });

    $('.six').on("click", function(){
      amount += "6";
      $('.amount').html("$"+amount);
    });

    $('.seven').on("click", function(){
      amount += "7";
      $('.amount').html("$"+amount);
    });

    $('.eight').on("click", function(){
      amount += "8";
      $('.amount').html("$"+amount);
    });

    $('.nine').on("click", function(){
      amount += "9";
      $('.amount').html("$"+amount);
    });

    $('.dot').on("click", function(){
      if (amount.includes(".")){
      }
      else{
        amount += ".";
        $('.amount').html("$"+amount);
      }
    });

    $('.zero').on("click", function(){
      if (amount.length > 0) {
        amount += "0";
        $('.amount').html("$"+amount);
      }
    });

    $('.del').on("click", function(){
      amount = "";
      $('.amount').html("$0.0");
    });

    $('.deposit').on("click", function(){
      //alert(tutor.stripeID);
      createCharge(amount*100)

      
      // Send stripe ID and ammount to lobby-boy for a charge

      //Create a transaction for the deposit
    });

});


function addLoginListener() {

  firebase.auth().onAuthStateChanged (user => {

    if(user) {
      //Display user Info
      getUserTypeAndLoadData();

    }
    else {
      window.location.href = "login.html";

    }

  });

}



function getUserTypeAndLoadData() {
  var user = firebase.auth().currentUser;

  //Check if the user is a parent
  const parentRef = firebase.database().ref().child('Tutor').child(user.uid);

  parentRef.once('value', function(snapshot) {

    tutor = snapshot.val();

  });

}


function createCharge(amountCents) {

  $.ajax({
      url: "https://lobby-boy.herokuapp.com/create-charge",
      method: "POST",
      type: "POST",
      // contentType: "application/json",
      // dataType: "json",

      // xhrFields: {
      //   withCredentials: false
      // },
      crossDomain: true,
      data: {
        'amount': amountCents,
        'currency': tutor.currency,
        'customerId': tutor.stripeID,
        'description': "Parent Deposit",
      },


      success:function(response) {
        window.location.href = "history.html";
      },
      error: function(response){
        // var res = JSON.stringify(response)
        // console.log(response.status)

        if (response.status == 200) {
          loadLogin();
        }

        else {
          alert("Sorry we could not charge your card. Try again with another one, please.");
        }
      }
    });
}