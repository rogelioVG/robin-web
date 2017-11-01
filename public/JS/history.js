var tutor;
var tutorID;
var childID;

$(document).ready(function() {

  initializeFireBase();

  $("#logOutButton" ).on( "click", logOut);
  $(".make-deposit").on("click", makeDeposit);
  $(".settings").on("click", function(){window.location.href ="settings.html"});
  $(".back").on("click", function(){window.location.href ="history.html"});

  $(".make-deposit").hide();

  //Add realtime Listener
  addLoginListener();

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

function logOut(){
  firebase.auth().signOut();
}

function makeDeposit() {
  window.location.href = "deposit.html";
}

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

  console.log(user.val());

  //Check if the user is a parent
  const parentRef = firebase.database().ref().child('Tutor');

  parentRef.on('value', function(snapshot) {

    snapshot.forEach(function(childSnapshot) {

      tutorValue = childSnapshot.val();

      const email = tutorValue.email;

      if (user.email == email){

        tutor = tutorValue;

        tutorID = childSnapshot.key;

        childID = tutor.selectedChild;

        loadHistory(childID);

      }
    });

  });

  //Check if the user is a child
  const childrenRef = firebase.database().ref().child('children');

  childrenRef.on('value', function(snapshot) {

    snapshot.forEach(function(childSnapshot) {

      const child = childSnapshot.val();
      const email = child.email;

      if (user.email == email){
        childID = user.uid;
        loadHistory(childID);

      }
    });

  });

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
    console.log(tutorID);

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


