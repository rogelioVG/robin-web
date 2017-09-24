var childID, user, isTutor, selectedGoal;

$(document).ready(function() {

  initializeFireBase();


  //Add realtime Listener
  addLoginListener();
//Agregar nuevo nest, codigo de ejemplo, cambiar tags
//$( ".material-icons-table" ).click( function(){ openW("tasks.html");});

$("#submitTask").click(function(){
  var taskName = $("#taskNameF").val();
  var taskAmount = $("#taskAmountF").val();

  
  if(!isNaN(taskAmount)){
    newTask(taskName,taskAmount);
    window.close();
  }
});

//agregar dinero a nest
$("#goalsData").on("click",".material-icons-table",function(){
  selectedGoal = $(this).closest('tr').attr('id');
  console.log(selectedGoal);
  sessionStorage.setItem("selectedGoal",selectedGoal);
  openW("addtonest.html");
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
      window.location.href = "ParentLogin.html";

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

        var obj = tutor.children;
        childID = obj[Object.keys(obj)[0]];
        isTutor = true;
        console.log(childID);
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
        console.log(childID);
        loadGoals();

      }
    });

  });

}

function loadGoals() {

  const childrenRef = firebase.database().ref().child('children').child(childID);
  

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
        

        html += "<tr  id = '" + key + "'> <td><img src ='" + sThumbnail + "' style='width:128px;height:128px;'></td><td style='color:blue'> <p>" 
        + sName + "<button class='btn-floating btn-large waves-effect waves-light white'><style='color:#3DD87F;' class='material-icons-table'>+</></button> </td><td style='color:#3DD87F'> <p>"
         + ((Number(sNest.substring(1)) * 100) / Number(sPrice.substring(1))).toPrecision(2) 
        +"%</p><button type= 'button'>" + sLeftToPay + "</button></td>";
        
      }
    }
    
    html += "</tbody></table>"
    console.log(html);
    $("#goalsData" ).append( html );

  });

}

function clearTable() {
  $( "#goalsData" ).empty();
}
