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
  console.log("Starting Firebase with this config: ");
  console.log(config);
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
  console.log("this is the user: ");
  console.log(user);

  //Check if the user is a parent
  const parentRef = firebase.database().ref().child('Tutor');

  parentRef.on('value', function(snapshot) {

    snapshot.forEach(function(childSnapshot) {

      const tutor = childSnapshot.val();
      const email = tutor.email;

      if (user.email == email){

        LoadParentData(user);

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

function LoadParentData(user) {

  var html = "<p> History of your child: </p>"
  $( "#historyData" ).append( html );
  console.log("user is a parent");


  //Load the info of your child
  const childrenRef = firebase.database().ref().child('children');

  childrenRef.on('value', function(snapshot) {

    snapshot.forEach(function(childSnapshot) {

      const child = childSnapshot.val();
      const Id = child.tutor;

      if(user.uid == Id) {

        loadHistoryInView(child.history);

      }

    });

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
