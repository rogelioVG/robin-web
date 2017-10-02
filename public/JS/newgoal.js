var childID, user, isTutor;

$(document).ready(function() {

  initializeFireBase();
  //Add realtime Listener
  addLoginListener();

  $('#urlButton').on('click', function() {
    $.getJSON(//url,
    {
      url: $('input[name="url"]').val)()
    }, function(data) {
      $('#productName').text(data.name);
      $('#productPrice').text(data.price);
      $('#productThumbnail').attr('src',data.thumbnail);
      $('#accept').text('<button id = "acceptButton">Accept</button>');
    });
    return false;
  });
  
  $('#accept').on('click','#acceptButton',function() {
    newGoalRef = firebase.database().ref('children/' + childID +'/wishlist').push();
    sPrice = $('#productPrice').text();
    sName = $('productName').text();
    sThumbnail = $('productThumbnail').attr('src');
    sUrl = $('input[name="url"]').val)();
    newGoalRef.set({
    leftToPay: sPrice,
    name: sName,
    nest: "$0.0",
    price: sPrice,
    thumbnail: sThumbnail,
    url: sUrl
  });
  });
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
      //Display user Info
      getUserTypeAndLoadData();

    }
    else {
      window.location.href = "ParentLogin.html";

    }

  });

}

function getUserTypeAndLoadData() {
  user = firebase.auth().currentUser;
  //Check if the user is a parent
  const parentRef = firebase.database().ref().child('Tutor');

  parentRef.on('value', function(snapshot) {

    snapshot.forEach(function(childSnapshot) {

      const tutor = childSnapshot.val();
      const email = tutor.email;

      if (user.email == email){

        var obj = tutor.children;
        childID = obj[Object.keys(obj)[0]];
        isTutor = true;
        console.log(childID);
        loadGoals();
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
        isTutor = false;
        console.log(childID);
        loadGoals();

      }
    });

  });

}

