var selGoal;
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

    $('.deposit').on("click", function(){
      alert("stripeID");
      alert(tutorID.stripeID);
      
      // Send stripe ID and ammount to lobby-boy for a charge

      //Create a transaction for the deposit
    });

});