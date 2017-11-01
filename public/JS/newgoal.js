var childID, user, isTutor;

$(document).ready(function() {

  initializeFireBase();
  //Add realtime Listener
  addLoginListener();

  $( ".back" ).click( function() { 
    window.location.href ="goals.html";
  });

  $('#urlButton').on('click', function() {
    sUrl = $('input[name="url"]').val();
    console.log("click");
    $.ajax({
      url: "https://flask-robin.herokuapp.com/_scrap",
      method: "GET",
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      xhrFields: {
        withCredentials: true
      },
      data: {
        'url': sUrl
      },
      success:function(response) {
        
        if(response.name === null){
          alert("Invalid URL");
        }
          
        else {
          $("#productName").text(response.name);
          $("#productPrice").text(response.price);
          $("#productThumbnail").attr("src",response.thumbnail);
          $("#productData").attr("hidden",false);
          $("#acceptButton").attr("hidden",false);
        }

       
      },
      error: function(response){
        alert("Connection Failed :(");
      }
    });
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

function cleanCommas(sPrice){
  var noCommas = "";
  for(var i = 0; i < sPrice.length; i++){
    if(sPrice[i] !== ',')
      noCommas = noCommas + sPrice[i];
  }
  return noCommas;
}

