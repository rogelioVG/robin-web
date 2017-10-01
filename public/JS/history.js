$(document).ready(function() {

  initializeFireBase();

  $( "#logOutButton" ).on( "click", logOut);

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

function getUserTypeAndLoadData()
{
  var user = firebase.auth().currentUser;

  //Check if the user is a parent
  const parentRef = firebase.database().ref().child('Tutor');

  parentRef.on('value', function(snapshot) {

    snapshot.forEach(function(childSnapshot) {

      const tutor = childSnapshot.val();
      const email = tutor.email;

      if (user.email == email){

        var obj = tutor.children;
        var childID = obj[Object.keys(obj)[0]];

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
        loadHistory(user.uid);

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

  });

}

function loadBalance(childID) {
  const childRef = firebase.database().ref().child('children/'+childID+'/balance');

  childRef.on('value', function(snapshot) {
    const balance = snapshot.val();
    $(".balance" ).html("$"+balance);
  })
}

function showHistory(transactionArray){
  var html = "<table  class='bordered highlight'> <tbody>";
  console.log(transactionArray)
  for (var trans in transactionArray) {
    console.log(transactionArray[trans].amount);

    var color = " style= 'color: navy'"

    if (transactionArray[trans].to == "Robin"){
      color = " style= 'color: #FB2C55'";
    }
    else{
      color = " style= 'color: #3DD87F'";
    }


    html += "<tr>"
    + "<td style= 'color: navy'>" + transactionArray[trans].name + "</td>" 
    + "<td class='trans-amount'" + color + "> " + transactionArray[trans].amount + " </td> </tr>";
  }

  html += "</tbody></table>"
  $("#historyData" ).append(html);
}

function clearTable() {
  $( "#historyData" ).empty();
  //console.log("alv");
}