$(document).ready(function() {

  initializeFireBase();

  $( "#logOutButton" ).on( "click", LogOut);

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

function LogOut(){

  firebase.auth().signOut();

}

function addLoginListener() {

  firebase.auth().onAuthStateChanged (user => {

    if(user) {
      //Display user Info
      getUserTypeAndLoadData();

    }
    else {
      alert('Signed Out');
      window.location.href = "ParentLogin.html";

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

        console.log(childID);
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

        console.log(user.uid);
        loadHistory(user.uid);

      }
    });

  });

}

function loadHistory(childID) {



  const childrenRef = firebase.database().ref().child('children').child(childID);

  var html = "<table class='bordered highlight'> <tbody>";
  childrenRef.on('value', function(snapshot) {

    var morro = snapshot.val();
    const transactions = morro.history
    for (var key in transactions) {
      if (transactions.hasOwnProperty(key)) {
        transaction = transactions[key];
        const sAmount = transaction.amount;
        const sName = transaction.name;
        var color = " style= 'color: blue'"
        if (transaction.to == "Robin"){
           color = " style= 'color: #FB2C55'";
        }
        else{
           color = " style= 'color: #3DD87F'";
        }

        html += "<tr> <td style= 'color: navy'>" + sName + "</td><td" + color + "> " + sAmount + " </td> </tr>";
      }
    }
    console.log(html);
    html += "</tbody></table>"
    $("#historyData" ).append( html );

  });

}
