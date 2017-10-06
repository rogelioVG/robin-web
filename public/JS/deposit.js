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
      //alert("stripeID");
      var amountCents = amount*100
      //alert(amountCents);

      var deposit = {
        'customerId': tutor.stripeID,
        'currency': "MXN",
        'amount': amountCents,
        'description': 'Parent Deposit'
      };


      createTransaction(deposit);
      //createCharge(deposit);


      // Send stripe ID and ammount to lobby-boy for a charge

      //Create a transaction for the deposit
    });

    function createCharge(deposit) {
      $.ajax({
        url: "https://lobby-boy.herokuapp.com/charge",
        method: "POST",
        type: "POST",
        // contentType: "application/json",
        dataType: "text/html",
        xhrFields: {
          withCredentials: true
        },
        data: deposit,
        success:function(response) {
          alert(response);
          alert("success");
          createTransaction()
        },
        error: function(response){
          alert("Connection Failed :(");
          console.log(JSON.stringify(response));
        }
      });
    }

    function createTransaction(deposit) {
      // let deposit = ["name" : self.descriptionLabel.text!,
      //   "from" : User.sharedInstance.userID,
      //   "to" : User.sharedInstance.childID ,
      //   "amount" : "$"+"\(fAmount)",
      //   "date": now]

      var historyRef = firebase.database().ref('children/' + childID + '/history').push()

      historyRef.set({
        from: tutorID,
        to: childID,
        amount: "$"+amount,
        name: "Parent Deposit",
        date: "TODAY"
      });

      updateBalance(amount*100)

    }

    function updateBalance(amountCents) {
      const balanceRef = firebase.database().ref().child('children/'+childID+'/balance');
      alert(amountCents);
      var balance;

      balanceRef.once('value', function(snapshot) {
        balance = snapshot.val();
        alert("first balance"+balance);
        balance += amountCents;
        balanceRef.set(balance);
        window.location.href = "history.html"
      })
    }

});