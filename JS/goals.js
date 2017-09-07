var childID, user, isTutor;

$(document).ready(function() {

  initializeFireBase();


  //Add realtime Listener
  addLoginListener();

$( "#newTaskButton" ).click( function(){ openW("newTask.html");});
$("#submitTask").click(function(){
  var taskName = $("#taskNameF").val();
  var taskAmount = $("#taskAmountF").val();

  
  if(!isNaN(taskAmount)){
    newTask(taskName,taskAmount);
    window.close();
  }
});

//task completado
$("#tasksData").on("click",".clickRow",function(){
  var tId = $(this).closest('tr').attr('id');
  var taskRef = firebase.database().ref('children/' + childID +'/tasks/' + tId);
  
  taskRef.update({completed: !($(this).attr("style") == 'color:  #3DD87F')});
});

//pagar
$("#tasksData").on("click",".payTask",function() {
  if(isTutor) {
    var tId = $(this).closest('tr').attr('id');
    var cantidad;
    var taskRef = firebase.database().ref('children/' + childID +'/tasks/' + tId);

    taskRef.once("value").then(function(snapshot){

      cantidad = snapshot.val().amount;
      var childrenRef = firebase.database().ref('children/' + childID)
      childrenRef.once("value").then(function(snapshot){
      cantidad = (Number(snapshot.val().balance) + Number(cantidad)).toString();

      childrenRef.update({balance: cantidad});
    });
    
    });

  }
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
  console.log("log2");
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
  console.log("log1");
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
        console.log("llamada");

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

  
  console.log("loadtasks");
  const childrenRef = firebase.database().ref().child('children').child(childID);
  

  childrenRef.on('value', function(snapshot) {
    console.log("loadtasks2");
    clearTable();
    var html = "<table id ='goalsTable' class='bordered highlight'> <tbody>";
    var morro = snapshot.val();
    const transactions = morro.wishlist;
    for (var key in transactions) {
      if (transactions.hasOwnProperty(key)) {
        transaction = transactions[key];
        const sNest = transaction.nest;
        const sPrice = transaction.price;
        const sName = transaction.name;
        const sLeftToPay = transaction.leftToPay;
        const sThumbnail = transaction.thumbnail;
        const sUrl = transaction.url;
        

        html += "<tr  id = '" + key + "'> <td><img src ='" + sThumbnail + "' style='width:128px;height:128px;'></td><td style='color:blue'>" 
        + sName + "</td><td style='color:blue'><button type= 'button'>" + sLeftToPay + "</button></td>";
        
      }
    }
    
    html += "</tbody></table>"
    console.log(html);
    $("#goalsData" ).append( html );

  });

}

function taskChange() {

  var user = firebase.auth().currentUser;
}

function newTask(taskName, taskAmount) {


  /*const childrenRef = firebase.database().ref().child('children').child(childID);
  const taskRef = childrenRef.child('tasks');
  var newTaskRef = taskRef.push();*/

  var newTaskRef = firebase.database().ref('children/' + childID +'/tasks').push();

  newTaskRef.set({
    addedByUser: user.uid,
    amount: taskAmount,
    completed: false,
    name: taskName
  });
}

function clearTable() {
  $( "#goalsData" ).empty();
}

