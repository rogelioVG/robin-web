<<<<<<< HEAD
$(document).ready(function() {

  initializeFireBase();

  $(".create-parent").on( "click", createParent);

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

function createParent() {  
  //Retreive user data from the form
  const sName = $("#nameTextField").val();
  const sEmail = $("#emailTextField").val();
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

function sendToDatabase(userId, sName, sEmail, sMobile) {
  firebase.database().ref('Tutor/' + userId).set({
    name: sName,
    email: sEmail,
    phone : sMobile,
    currency: "MXN",
    address: "nil",
    stripeID: "nil",
    children: "nil"
  });

  login()
}

function login () {

  //Retreive user data from the form
  const sEmail = $("#emailTextField").val();
  const sPassword = $("#passwordTextField").val();

  //Instantiate firebase Auth Object
  const auth = firebase.auth();

  //Sign in with Firebase internal method
  const promise = auth.signInWithEmailAndPassword(sEmail, sPassword);

  //check for errors
  promise.catch(e=> alert(e.message));
  
  loadNext()

}

function loadNext(){
  index += 1;
  progress += 11.2
  var eleml = document.getElementById("myBar"); 
  eleml.style.width = progress+'%';
  $(".box").load(welcomeArray[index]);
}
=======
$(document).ready(function() {

  initializeFireBase();

  $(".create-parent").on( "click", createParent);

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

function createParent() {  
  //Retreive user data from the form
  const sName = $("#nameTextField").val();
  const sEmail = $("#emailTextField").val();
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

function sendToDatabase(userId, sName, sEmail, sMobile) {
  firebase.database().ref('Tutor/' + userId).set({
    name: sName,
    email: sEmail,
    phone : sMobile,
    currency: "MXN",
    address: "nil",
    stripeID: "nil",
    children: "nil"
  });

  login()
}

function login () {

  //Retreive user data from the form
  const sEmail = $("#emailTextField").val();
  const sPassword = $("#passwordTextField").val();

  //Instantiate firebase Auth Object
  const auth = firebase.auth();

  //Sign in with Firebase internal method
  const promise = auth.signInWithEmailAndPassword(sEmail, sPassword);

  //check for errors
  promise.catch(e=> alert(e.message));
  
  loadNext()

}

function loadNext(){
  index += 1;
  progress += 11.2
  var eleml = document.getElementById("myBar"); 
  eleml.style.width = progress+'%';
  $(".box").load(welcomeArray[index]);
}
>>>>>>> 964cea38089d2defb21a3dce438339889cbfbaf1
