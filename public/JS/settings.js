var sessionTutorID = "TCGl5cPi2AWFZkgrrNi9QxzmsvY2"

// var sessionChildren = {
//   Carolina:"4JmYFNfVvFVl90bJbSPZEObEKpY2",
//   Octavio: "4m0jrULFcORAkCBTP2XRg1TSewh1"
// }

var sessionChild = 0

$(document).ready(function() {

  initializeFireBase();

  $(".back").on("click", function(){window.location.href ="history.html"});


  //Add realtime Listener
  addLoginListener();

});

function getAddress(key) {
  let ref = firebase.database().ref().child('Tutor').child(sessionTutorID).child("selectedAddress");
  ref.set(key.value);
}

function getChild(key) {
  let ref = firebase.database().ref().child('Tutor').child(sessionTutorID).child("selectedChild");
  ref.set(key.value);
}


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
      displayChildren();
      displayAddress();

    }
    else {
      window.location.href = "login.html";
    }
  });

}

function displayChildren() {

  let ref = firebase.database().ref().child('Tutor').child(sessionTutorID);

  ref.child('children').on('value', function(snapshot){

    var children = snapshot.val();

    for (var child in children ){
      html = "<option value=" + children[child] + ">" + child + "</option>";
      console.log(children[child]);
      $("#childSelect" ).append(html);
    }

    ref.child('selectedChild').once('value', function(snapshot) {
      document.getElementById('childSelect').value = snapshot.val();
    });

  })

}

function displayAddress() {

  let ref = firebase.database().ref().child('Tutor').child(sessionTutorID);


  ref.child('address').on('value', function(snapshot){

    var address = snapshot.val();

    for (var key in address){

      var street = address[key].street;

      html = "<option value=" + key + ">" + street + "</option>";

      $("#addressSelect").append(html);
    }

    ref.child('selectedAddress').once('value', function(snapshot) {
      document.getElementById('addressSelect').value = snapshot.val();
    });

  })

}
