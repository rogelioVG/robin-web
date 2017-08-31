$(document).ready(function() {

  initializeFireBase();

  $(".create-child").on( "click", createChild);

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
  firebase.initializeApp(config);
}

function createChild() {
  
  //Retreive user data from the form
  const sName = $("#nameTextField").val();
  const sEmail = $("#emailTextField").val();
  const sParentEmail = $("#parentEmailTextField").val();
  const sMobile = $("#mobileTextField").val();
  const sPassword = $("#passwordTextField").val();

  //Instantiate firebase Auth Object
  const auth = firebase.auth();

  //Create Account with Firebase internal method
  const promiseCreate = auth.createUserWithEmailAndPassword(sEmail, sPassword);

  //check for errors
  promiseCreate.catch(e=> alert(e.message));

  //GetUserId and Register tutor into the tutor branch
  promiseCreate.then(user=> sendToDatabase(user.uid,sName,sEmail,sMobile));

}

////////////////////
// This data that is sent should be changed
////////////////////

function sendToDatabase(userId, sName, sEmail, sMobile) {
  firebase.database().ref('children/' + userId).set({
    // name: sName,
    // email: sEmail,
    // phone : sMobile,
    // currency: "MXN",
    // address: "nil",
    // stripeID: "nil",
    // children: "nil"
  });

  loadNext()
}

function loadNext(){
  index += 1;
  progress += 11.2
  var eleml = document.getElementById("myBar"); 
  eleml.style.width = progress+'%';
  $(".box").load(welcomeArray[index]);
}
