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

    $('.addNest').on("click", function(){
      selGoal = sessionStorage.getItem("selectedGoal");
      console.log('click');
      var childRef = firebase.database().ref('children/' + childID);
      var bal
      var nest;
      var leftPay;
      var iAmount = Number(amount) * 100;

      childRef.once("value").then(function(snapshot){
        console.log('ssnap');
        bal = Number(snapshot.val().balance);

        if(iAmount <= bal){
          var goalInfo = snapshot.child("wishlist").val();
          console.log('log');
          leftPay = Number(goalInfo.leftToPay.substring(1)) * 100;

          if(iAmount > leftPay){
            iAmount = leftPay;
          }

          
          nest = Number(goalInfo[nest].substring(1)) * 100; //Para quitarle el $
          nest = nest + iAmount;
          leftPay = leftPay - iAmount;
          bal = bal - iAmount;

          nest = "$" + (nest / 100).toFixed(2);
          leftPay = "$" + (leftPay / 100).toFixed(2);
          childRef.update({balance: bal});
          childRef.child("wishlist/" + selGoal).update({
            nest: nest,
            leftToPay: leftPay
          });
          console.log('write');
        }
      });
      
      //window.close();
    });

});