$(document).ready(function() {
  
  initializeFireBase();

  $(".add-address").on( "click", addAddress);
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

function addAddress() {
  
  //Retreive user data from the form
  // const street = $("#streetTextField").val();
  // const city = $("#cityTextField").val();
  // const state = $("#stateTextField").val();
  // const country = $("#countryTextField").val();
  // const exterior = $("#exteriorTextField").val();
  // const zip = $("#zipTextField").val();

  //Instantiate firebase Auth Object
  const auth = firebase.auth();

  var user = firebase.auth().currentUser;

  var ref = firebase.database().ref("Tutor/" + user.uid + "/address").push();
  ref.set({
    street: $("#streetTextField").val(), 
    city: $("#cityTextField").val(), 
    state: $("#stateTextField").val(), 
    country: $("#countryTextField").val(),
    exterior: $("#exteriorTextField").val(), 
    zip: $("#zipTextField").val()
  })

  alert("A new address was added to your profile.")

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
