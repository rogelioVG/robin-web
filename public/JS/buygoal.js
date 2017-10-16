var childID, user, isTutor;

$(document).ready(function() {

  initializeFireBase();
  //Add realtime Listener
  addLoginListener();

  $( ".back" ).click( function() { 
    window.location.href ="goals.html";
  });

  $('#acceptButton').on('click',function() {
    newGoalRef = firebase.database().ref('children/' + childID +'/wishlist').push();
    sPrice = $('#productPrice').text();
    sName = $('#productName').text();
    sThumbnail = $('#productThumbnail').attr('src');
    sUrl = $('input[name="url"]').val();
    if(Number(sPrice.substring(1)) < 500)
      sPrice = '$' + (Number(sPrice.substring(1)) + 130).toString(); //Add the shipping price if price < 500
    sPrice = cleanCommas(sPrice);
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
        //Fill the product data in the html
        setProductData();
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
        //Fill the product data in the html
        setProductData();
      }
    });

  });

}

function setProductData(){
  var selGoal = sessionStorage.getItem("selectedGoal");
  console.log(selGoal)
  var goalRef = firebase.database().ref('children/' + childID + '/wishlist/' + selGoal);
  console.log('children/' + childID + '/wishlist/' + selGoal)
  goalRef.once("value").then(function(snapshot){
    var goalInfo = snapshot.val();
    console.log(goalInfo);

    $('#productName').text(goalInfo.name);
    $('#productThumbnail').attr("src",goalInfo.thumbnail);
    $('#leftToPay').text(goalInfo.leftToPay);
  });
}

