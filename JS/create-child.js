$(document).ready(function() {
  alert("create child")
  initializeFireBase();

  $(".create-child").on( "click", createChild);
  alert("create child")

  //Add realtime Listener

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
  alert("si jala")
  
  //Retreive user data from the form
  const name = $("#nameTextField").val();
  const email = $("#emailTextField").val();
  const parentEmail = $("#parentEmailTextField").val();
  const school = $("#schoolSelect").val();
  const sPassword = $("#passwordTextField").val();

  //Instantiate firebase Auth Object
  const auth = firebase.auth();

  var ref = firebase.database().ref("Tutor");

  ref.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot){
      const tutor = childSnapshot.key()
      alert(tutor)
    })
  }, function (error) {
     console.log("Error: " + error.code);
  });

  //Create Account with Firebase internal method
  const promiseCreate = auth.createUserWithEmailAndPassword(sEmail, sPassword);

  //check for errors
  promiseCreate.catch(e=> alert(e.message));

  //GetUserId and Register tutor into the tutor branch
  promiseCreate.then(user=> sendToDatabase(user.uid,name,email,school));

}

////////////////////
// This data that is sent should be changed
////////////////////

function sendToDatabase(childID, name, email, tutorID, school) {
  firebase.database().ref('children/' + userId).set({
    name: sName,
    email: sEmail,
    tutor: tutorID,
    balance: 0,
    school: school
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
