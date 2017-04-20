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

  validateParent(sParentEmail,sName,sEmail,sPassword);

}

function validateParent(pEmail,sName,sEmail,sPassword) {

  const parentRef = firebase.database().ref().child('Tutor');


  parentRef.on('value', function(snapshot) {

    snapshot.forEach(function(childSnapshot) {

      const tutor = childSnapshot.val();
      const email = tutor.email;
      if (pEmail == email){


        //Instantiate firebase Auth Object
        const auth = firebase.auth();

        //Create Account with Firebase internal method
        const promiseCreate = auth.createUserWithEmailAndPassword(sEmail, sPassword);

        //GetUserId and Register child into the children branch
        promiseCreate.then(user=> addChildToDB(user.uid,sName,sEmail,childSnapshot.key));

      }
    });

  });

}

function addChildToDB(userId, sName, sEmail, sTutor) {

    console.log("Writing into children branch Values:");
    console.log("Id: " + userId );
    console.log("Name: " + sName );
    console.log("Email: " + sEmail);
    console.log("Parent : " + sTutor);

    firebase.database().ref('children/' + userId).set({
    balance: 0,
    email: sEmail,
    history: "nil",
    name: sName,
    tasks: "nil",
    tutor: sTutor
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
