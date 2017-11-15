var selGoal;

$(document).ready(function() {

    $( ".back" ).click( function() {
      window.location.href ="goals.html";
    });


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
      var childRef = firebase.database().ref('children/' + childID);
      var bal
      var nest;
      var leftPay, strLeftPay;
      var iAmount = Number(amount) * 100;

      childRef.once("value").then(function(snapshot){
        bal = Number(snapshot.val().balance);

        if(iAmount <= bal){
          var goalInfo = snapshot.child("wishlist/"+selGoal).val();
          leftPay = Number(goalInfo.leftToPay.substring(1)) * 100;
          if(iAmount > leftPay){
            iAmount = leftPay;
          }


          nest = Number(goalInfo.nest.substring(1)) * 100; //Para quitarle el $
          nest = nest + iAmount;
          leftPay = leftPay - iAmount;
          bal = Math.round(bal - iAmount);

          nest = "$" + (nest / 100).toFixed(2);
          strLeftPay = "$" + (leftPay / 100).toFixed(2);
          childRef.update({balance: bal});
          childRef.child("wishlist/" + selGoal).update({
            nest: nest,
            leftToPay: strLeftPay
          });

          addToHistory(childRef.child("wishlist/" + selGoal), iAmount)
          if(leftPay === 0) {
            alert("Congratulations, you completed your goal!");
            window.location.href = "buygoal.html";
          }
          else {
            window.location.href = "goals.html";
          }

        }
        else {
          amount = "";
          $('.amount').html("$0.0");
          alert("You don't have enough money!");
        }
      });


    });


});

function addToHistory(goalRef, iAmount){

  var  sName;

   goalRef.once("value").then(function(snapshot){

    sName = snapshot.val().name;
    var historyRef = firebase.database().ref('children/' + childID + '/history').push();
    historyRef.set({
      amount: "$" + (iAmount/100),
      from: 'child',
      name: sName,
      to: 'Robin'
    });

  });
}
