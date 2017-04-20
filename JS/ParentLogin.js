$(document).ready(function() {

  initializeFireBase();

  $( "#parentLoginButton" ).on( "click", doParentLogin);

  $( "#parentCreateButton" ).on( "click", doParentCreate);

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

function doParentCreate () {

  //Retreive user data from the form
  const sName = $("#nameTextField").val();
  const sEmail = $("#emailTextField").val();
  const sMobile = $("#mobileTextField").val();
  const sPassword = $("#passwordTextField").val();

  //Instantiate firebase Auth Object
  const auth = firebase.auth();

  //Create Account with Firebase internal method
  const promiseCreate = auth.createUserWithEmailAndPassword(sEmail, sPassword);

  //GetUserId and Register tutor into the tutor branch
  promiseCreate.then(user=> writeParentIntoTutorTable(user.uid,sName,sEmail,sMobile));

}

function writeParentIntoTutorTable(userId, sName, sEmail, sMobile) {

    console.log("Writing into Tutor branch Values: ");
    console.log("Id: " + userId );
    console.log("Name: " + sName );
    console.log("Email: " + sEmail);
    console.log("Phone: " + sMobile);

    firebase.database().ref('Tutor/' + userId).set({
    name: sName,
    email: sEmail,
    phone : sMobile,
    currency: "USD",
    address: "nil",
    stripeID: "nil",
    children: "nil"
  });

}

function doParentLogin () {

  //Retreive user data from the form
  const sName = $("#nameTextField").val();
  const sEmail = $("#emailTextField").val();
  const sMobile = $("#mobileTextField").val();
  const sPassword = $("#passwordTextField").val();

  //Instantiate firebase Auth Object
  const auth = firebase.auth();

  //Sign in with Firebase internal method
  const promise = auth.signInWithEmailAndPassword(sEmail, sPassword);

  //check for errors
  promise.catch(e=> console.log(e.message));

}

function addLoginListener() {

  firebase.auth().onAuthStateChanged (user => {

    if(user) {
      //Display user Info
      console.log(user);
      window.location.href = "history.html";

    }
    else {
      console.log("Not logged in");
      //Send to Login Page
    }

  });


}
