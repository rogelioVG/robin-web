
var childID, user, isTutor, selectedGoal;

$(document).ready(function() {

  initializeFireBase();

  //Add realtime Listener
  addLoginListener();
//Checar esta función bien
  $("#goalsData").on("click",".delete-button", function() {

    goalId = $(this).closest('tr').attr('id');
    var childrenRef = firebase.database().ref('children/' + childID);
    var noGoal = childrenRef.child('wishlist/' + goalId);
    childrenRef.once('value').then(function(snapshot) {
        var bal = snapshot.val().balance;
        var nest = Number(snapshot.child('wishlist/' + goalId +'/nest').val().substring(1));
        console.log(nest);
        bal = bal + nest * 100;
        console.log(bal);
        childrenRef.update({balance:bal});
    });
    noGoal.remove();
  })

  //agregar dinero a nest
  $("#goalsData").on("click",".nest-btn",function(){
    selectedGoal = $(this).closest('tr').attr('id');
    console.log(selectedGoal);
    sessionStorage.setItem("selectedGoal",selectedGoal);
    window.location.href = "nest.html";
  });

  $(".add-goal").click(function(){
    window.location.href = "newgoal.html";
  });

  $("#goalsData").on("click",".buy-btn",function(){

    var childRef = firebase.database().ref().child('children/' + childID);
    selectedGoal = $(this).closest('tr').attr('id');
    childRef.once("value").then(function(snapshot){

      var balance = snapshot.val().balance;
      console.log(selectedGoal)

      var leftToPay = snapshot.child('wishlist/' + selectedGoal).val().leftToPay;
      if(balance >= Number(leftToPay.substring(1)) * 100) {
        sessionStorage.setItem("selectedGoal",selectedGoal);
        window.location.href = "buygoal.html";
      }
      else
        alert('Not enough money!');
    });
  });

});


function openW(plink) {
  var win = window.open(plink);
  if (win) {
      //Browser has allowed it to be opened
    win.focus();
  } else {
    //Browser has blocked it
    alert('Please allow popups for this website');
  }
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
      //Display user Info
      getUserTypeAndLoadData();

    }
    else {
      window.location.href = "login.html";

    }

  });

}

function getUserTypeAndLoadData()
{
  user = firebase.auth().currentUser;
  //Check if the user is a parent
  const parentRef = firebase.database().ref().child('Tutor');

  parentRef.on('value', function(snapshot) {

    snapshot.forEach(function(childSnapshot) {

      const tutor = childSnapshot.val();
      const email = tutor.email;

      if (user.email == email){

        childID = tutor.selectedChild;
        isTutor = true;

        loadGoals();
      }
    });

  });

  //Check if the user is a child
  const childrenRef = firebase.database().ref().child('children');

  childrenRef.on('value', function(snapshot) {

    snapshot.forEach(function(childSnapshot) {

      const child = childSnapshot.val();
      const email = child.email;

      if (user.email == email){
        childID = user.uid;
        isTutor = false;

        loadGoals();

      }
    });

  });

}

function loadGoals() {

  const childrenRef = firebase.database().ref().child('children').child(childID);

  console.log(user);
  console.log(childID);

  childrenRef.on('value', function(snapshot) {
    clearTable();
    var html = "<table id ='goalsTable' class='bordered highlight'> <tbody>";
    var morro = snapshot.val();
    const goals = morro.wishlist;
    for (var key in goals) {
      if (goals.hasOwnProperty(key)) {
        goal = goals[key];
        const sNest = goal.nest;
        const sPrice = goal.price;
        const sName = goal.name;
        const sLeftToPay = goal.leftToPay;
        const sThumbnail = goal.thumbnail;
        const sUrl = goal.url;

        var buyBtnSize = '250px'
        if (sLeftToPay.length > 7) {
          buyBtnSize = '320px'
        }


        html += "<tr  id = '" + key + "'> <td><img class='thumbnail' src ='" + sThumbnail + "''></td>"
        + " <td> "
        + " <div> <button class='delete-button'> x </button> </div> "
        + "<p class='product-name'>" + sName + "</p>"
        + " <div class='percentage'> "+ Math.floor((Number(sNest.substring(1)) * 100) / Number(sPrice.substring(1))) + "%</div>"
        + " <div class='right'> "
        + " <button class='nest-btn'>+</></button> "
        + " <input class='buy-btn'" + "style='width: " + buyBtnSize + "' " + "type='button' value='" + sLeftToPay + "''>"
        + " <div class='right'> "
        + " </td>";
        console.log((Number(sNest.substring(1)) * 100) / Number(sPrice.substring(1)));
      }
    }

    html += "</tbody></table>"

    console.log(html);
    $("#goalsData" ).append( html );

    $(".loader").hide();

  });

}

function clearTable() {
  $( "#goalsData" ).empty();
}
