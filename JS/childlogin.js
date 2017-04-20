$(document).ready(function() {

  initializeFireBase();

  //$( "#childLoginButton" ).on( "click", doChildLogin);

  $( "#childCreateButton" ).on( "click", doChildCreate);

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

function doChildCreate () {

  //Retreive user data from the form
  const sName = $("#nameTextField").val();
  const sEmail = $("#emailTextField").val();
  const sParentEmail = $("#parentEmailTextField").val();
  const sPassword = $("#passwordTextField").val();

  //Instantiate firebase Auth Object
  const auth = firebase.auth();

  if(validateParent(sParentEmail)) {
    //Create Account with Firebase internal method
    const promiseCreate = auth.createUserWithEmailAndPassword(sEmail, sPassword);

    //GetUserId and Register child into the children branch
    promiseCreate.then(user=> addChildToDB(user.uid,sName,sEmail,sParentEmail));
  }
  else {
    console.log("Email of parent wasn't found");
  }

}

function validateParent(pEmail) {

  const parentRef = firebase.database().ref().child('Tutor');

  var bParentExists = false;
  console.log("Dejame ver!");

  parentRef.on('value', function(snapshot) {
    console.log("Dejame ver!");
    snapshot.forEach(function(childSnapshot) {

      const tutor = childSnapshot.val();
      const email = tutor.email;
      console.log("Dejame ver!");
      if (pEmail == email){
        bParentExists = true;
      }
    })

  });
  return bParentExists;
}

function addChildToDB(userId, sName, sEmail, sParentEmail) {

    console.log("Writing into children branch Values:");
    console.log("Id: " + userId );
    console.log("Name: " + sName );
    console.log("Email: " + sEmail);
    console.log("Parent Email: " + sParentEmail);

    firebase.database().ref('children/' + userId).set({
    balance: 0,
    email: sEmail,
    history: "nil",
    name: sName,
    tasks: "nil",
    tutor: sParentEmail
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
