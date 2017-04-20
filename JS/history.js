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


        LoadParentData(childID);

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

        LoadChildData(user);

      }
    });

  });

}

function LoadParentData(childID) {

  var html = "<p> History of your child: </p>"
  $( "#historyData" ).append( html );
  console.log("user is a parent");


  //Load the info of your child
  const childrenRef = firebase.database().ref().child('children').child(childID);

  var html = "";
  childrenRef.on('value', function(snapshot) {

    var morro = snapshot.val();
    const transactions = morro.history
    for (var key in transactions) {
      if (transactions.hasOwnProperty(key)) {
        transaction = transactions[key];
        const sAmount = transaction.amount;
        const sName = transaction.name;

        html += "<ul>" + sName + ": " + sAmount + "</ul>";
      }
    }
    $("#historyData" ).append( html );

  });

}

function LoadChildData(user) {

  var html = "<p> Your History: </p>"
  $( "#historyData" ).append( html );
  console.log("user is a child");

}


function loadHistoryInView (history) {

  var html = "";
  history.forEach(function(transactionSnapShot) {

    const transaction = transactionSnapShot.val();
    const sAmount = transaction.amount;
    const sName = transaction.name;

    html += "<ul>" + sName + ": " + sAmount + "</ul>";

  });

  $( "#historyData" ).append( html );

}
