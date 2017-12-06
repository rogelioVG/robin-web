var childID, user, isTutor, productUrl, productPrice;

$(document).ready(function() {

  initializeFireBase();
  //Add realtime Listener
  addLoginListener();

  $( ".back" ).click( function() {
    window.location.href ="goals.html";
  });

  $('#buyButton').on('click',function() {
    var newOrderRef = firebase.database().ref().child('orders').push();
    var productName = $( '#productName').text();
    var leftToPay = $( '#leftToPay' ).text();
    var tutorId, address, tutorName, bal;

    const childrenRef = firebase.database().ref().child('children/' + childID);
    childrenRef.once('value').then(function(snapshot) {
      tutorId = snapshot.val().tutor;
      console.log(tutorId)

      bal = Number(snapshot.val().balance);
      bal = Math.round(bal - Number(leftToPay.substring(1)) * 100);
      console.log(bal);
      childrenRef.update({balance: bal});

      const tutorRef = firebase.database().ref().child('Tutor/' + tutorId);

      tutorRef.once('value').then(function(snapshot) {
        tutorName = snapshot.val().name;
        address = snapshot.val().selectedAddress;

        newOrderRef.set({
          address: address,
          amount: productPrice,
          "child-id": childID,
          "client-name": tutorName,
          currency: "",
          date: Date(),
          product: productName,
          "product-url": productUrl,
          status: "ordered"
        });
      });
    });

   var selGoal = sessionStorage.getItem("selectedGoal");
   var goalRef = childrenRef.child('wishlist/' + selGoal);
   if(Number(leftToPay.substring(1)) > 0) {
       addToHistory(goalRef,leftToPay);
   }
   goalRef.remove();
   alert("Product bought!");
   window.location.href ="goals.html";
  });
})


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

        childID = tutor.selectedChild;
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
    productPrice = goalInfo.price;
    productUrl = goalInfo.url;
    $('#productName').text(goalInfo.name);
    $('#productThumbnail').attr("src",goalInfo.thumbnail);
    $('#leftToPay').text(goalInfo.leftToPay);
  });
}

function addToHistory(goalRef, iAmount){
    var sName;

    goalRef.once("value").then(function(snapshot){

    sName = snapshot.val().name;
    var historyRef = firebase.database().ref('children/' + childID + '/history').push();
    historyRef.set({
      amount: iAmount,
      from: 'child',
      name: sName,
      to: 'Robin'
    });

  });
}
