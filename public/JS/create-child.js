<<<<<<< HEAD
$(document).ready(function() {
  initializeFireBase();

  $(".create-child").on( "click", createChild);
  $(".back").on("click", function(){window.location.href ="settings.html"});


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
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}

function createChild() {
  
  //Retreive user data from the form
  const name = $("#nameTextField").val();
  const email = $("#emailTextField").val();
  const parentEmail = $("#parentEmailTextField").val();
  const school = $("#schoolSelect").val();
  const password = $("#passwordTextField").val();

  var tutorID = ""

  //Instantiate firebase Auth Object
  const auth = firebase.auth();

  var parentFound = false;

  var ref = firebase.database().ref("Tutor");

  ref.once("value", function(snapshot) {

    // Look for every parent
    snapshot.forEach(function(childSnapshot){
      const tutor = childSnapshot.val()

      //If the parent email matches, get his ID and activate the parentFound flag
      if (tutor.email == parentEmail) {
        tutorID = childSnapshot.key
        parentFound = true;
      }
    })

    if (parentFound == true) {
      //createAccount(email, password, name, school);
      const promiseCreate = auth.createUserWithEmailAndPassword(email, password);

      //check for errors
      promiseCreate.catch(e=> alert(e.message));

      //GetUserId and Register tutor into the tutor branch
      promiseCreate.then(user=> sendToDatabase(user.uid,name,email,tutorID,school));
    }
    else{
      alert("There're no parents registered with that email. Try a different email");
    }

    // alert(Object.keys(snapshot))

    // // for (var tutor in snapshot) {
    // //   console.log(tutor)
    // // }

  }, function (error) {
     console.log("Error: " + error.code);
  });


}

////////////////////
// This data that is sent should be changed
////////////////////

function sendToDatabase(childID, name, email, tutorID, school) {

  firebase.database().ref('children/' + childID).set({
    name: name,
    email: email,
    tutor: tutorID,
    balance: 0,
    school: school
  });

  // var tutorRef = firebase.database().ref('Tutor/' + tutorID + "/children")

  firebase.database().ref('Tutor/' + tutorID + "/children/" + name).set(childID);

  firebase.database().ref('Tutor/' + tutorID + "/selectedChild").set(childID);

  // tutorRef.set({
  //   name: childID
  // });
  if (welcome) {
    loadNext();
  }

  else {
    window.location.href = "settings.html"
  }
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

  $(".create-child").on( "click", createChild);
  $(".back").on("click", function(){window.location.href ="settings.html"});


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
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}

function createChild() {
  
  //Retreive user data from the form
  const name = $("#nameTextField").val();
  const email = $("#emailTextField").val();
  const parentEmail = $("#parentEmailTextField").val();
  const school = $("#schoolSelect").val();
  const password = $("#passwordTextField").val();

  var tutorID = ""

  //Instantiate firebase Auth Object
  const auth = firebase.auth();

  var parentFound = false;

  var ref = firebase.database().ref("Tutor");

  ref.once("value", function(snapshot) {

    // Look for every parent
    snapshot.forEach(function(childSnapshot){
      const tutor = childSnapshot.val()

      //If the parent email matches, get his ID and activate the parentFound flag
      if (tutor.email == parentEmail) {
        tutorID = childSnapshot.key
        parentFound = true;
      }
    })

    if (parentFound == true) {
      //createAccount(email, password, name, school);
      const promiseCreate = auth.createUserWithEmailAndPassword(email, password);

      //check for errors
      promiseCreate.catch(e=> alert(e.message));

      //GetUserId and Register tutor into the tutor branch
      promiseCreate.then(user=> sendToDatabase(user.uid,name,email,tutorID,school));
    }
    else{
      alert("There're no parents registered with that email. Try a different email");
    }

    // alert(Object.keys(snapshot))

    // // for (var tutor in snapshot) {
    // //   console.log(tutor)
    // // }

  }, function (error) {
     console.log("Error: " + error.code);
  });


}

////////////////////
// This data that is sent should be changed
////////////////////

function sendToDatabase(childID, name, email, tutorID, school) {

  firebase.database().ref('children/' + childID).set({
    name: name,
    email: email,
    tutor: tutorID,
    balance: 0,
    school: school
  });

  // var tutorRef = firebase.database().ref('Tutor/' + tutorID + "/children")

  firebase.database().ref('Tutor/' + tutorID + "/children/" + name).set(childID);

  firebase.database().ref('Tutor/' + tutorID + "/selectedChild").set(childID);

  // tutorRef.set({
  //   name: childID
  // });
  if (welcome) {
    loadNext();
  }

  else {
    window.location.href = "settings.html"
  }
}

function loadNext(){
  index += 1;
  progress += 11.2
  var eleml = document.getElementById("myBar"); 
  eleml.style.width = progress+'%';
  $(".box").load(welcomeArray[index]);
}
>>>>>>> 964cea38089d2defb21a3dce438339889cbfbaf1
