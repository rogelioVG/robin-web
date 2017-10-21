$(document).ready(function() {

  initializeFireBase();

  $(".back").on("click", function(){window.location.href ="history.html"});

  //Add realtime Listener
  addLoginListener();

  alert(tutorID);

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


function addLoginListener() {

  firebase.auth().onAuthStateChanged (user => {

    if(user) {
      display();

    }
    else {
      window.location.href = "login.html";
    }
  });

}

function display() {
  console.log("SI")
  console.log(tutorID)
  let ref = firebase.database().ref().child('Tutor').child(tutorID).child('children');

  ref.on('value', function(snapshot){
    console.log(snapshot)
  })
}


function loadHistory(childID) {

  const childRef = firebase.database().ref().child('children').child(childID);

  childRef.on('value', function(snapshot) {
    clearTable();

    var transactionArray = []

    var child = snapshot.val();
    const history = child.history

    for (var key in history) {

      //Build a transaction object/dictionary for each key in history. Then append to array.
      const transaction = history[key];
      transactionArray.push(transaction);
    }

    transactionArray.reverse()
    showHistory(transactionArray)
    loadBalance(childID);

    console.log(tutor);

  });

}

function loadBalance(childID) {
  const childRef = firebase.database().ref().child('children/'+childID+'/balance');

  childRef.on('value', function(snapshot) {
    const balance = snapshot.val();
    $(".balance" ).html("$"+(balance/100));
  })
}

function showHistory(transactionArray) {
  var html = "<table  class='bordered highlight'> <tbody>";
  
  for (var trans in transactionArray) {
    

    var color = " style= 'color: navy'"

    if (transactionArray[trans].to == "Robin"){
      color = " style= 'color: #FB2C55'";
    }
    else{
      color = " style= 'color: #3DD87F'";
    }

    var name = transactionArray[trans].name;


    if (name.length > 23) {
      name = name.substring(0,23)
      name += "..."
    }


    html += "<tr>"
    + "<td class='trans-name' style= 'color: navy'>" + name + "</td>" 
    + "<td class='trans-amount'" + color + "> " + transactionArray[trans].amount + " </td> </tr>";
  }

  html += "</tbody></table>"
  $("#historyData" ).append(html);
  $(".loader").hide();
  $(".make-deposit").show();
}

function clearTable() {
  $( "#historyData" ).empty();
}


