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
    apiKey: "AIzaSyDOhYuX1ZG7mhvzqAIWHWaxB78GXvg7UFM",
    authDomain: "robinbank.firebaseapp.com",
    databaseURL: "https://robinbank.firebaseio.com",
    projectId: "firebase-robinbank",
    storageBucket: "firebase-robinbank.appspot.com",
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


  //Add to Tutor Table
  //writeParentIntoTutorTable(userId,sName,sEmail,sMobile);

}

function writeParentIntoTutorTable(userId, sName, sEmail, sMobile) {

    console.log("Writing into Tutor Table Values: ");
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
    }
    else {

      console.log("Not logged in");
      //Send to Login Page
    }

  });


}
