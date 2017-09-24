var selGoal
$(document).ready(function() {



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

    $('.addNest').on("click", function(){
      selGoal = sessionStorage.getItem("selectedGoal");

      var goalRef = firebase.database().ref('children/' + childID + '/wishlist/' + selGoal);
      
      var cantidad;
      var leftPay;
      goalRef.once("value").then(function(snapshot){
        console.log(snapshot.key);
        cantidad = (snapshot.val().nest).substring(1); //Para quitarle el $
        cantidad = (Number(cantidad) + Number(amount)).toString();
        cantidad = "$" + cantidad;
        leftPay = (snapshot.val().leftToPay).substring(1); //Para quitarle el $
        leftPay = (Number(leftPay) - Number(amount)).toString();
        leftPay = "$" + leftPay;
        goalRef.update({nest: cantidad, leftToPay: leftPay});
      });
      
      window.close();
    });

});