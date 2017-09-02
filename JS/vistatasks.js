var childID, user;

$(document).ready(function() {

  initializeFireBase();


  //Add realtime Listener
  addLoginListener();

$( "#newTaskButton" ).click( function(){ openW("newTask.html");});
$("#submitTask").click(function(){
  console.log("ejecutando submit task click");
  var taskName = $("#taskNameF").val();
  var taskAmount = $("#taskAmountF").val();

  
  console.log(taskName + " " + taskAmount);
  
  if(!isNaN(taskAmount)){
    newTask(taskName,taskAmount);
    window.close();
  }
});

$("#tasksData").on("click",".clickRow",function(){
  var tId = $(this).attr('id');
  console.log(tId);
  console.log("click");
  var taskRef = firebase.database().ref('children/' + childID +'/tasks/' + tId);
  //console.log("valor" + taskRef.child('completed').val());
  
  taskRef.update({completed: !($(this).children("td").attr("style") == 'color:  #3DD87F')});
  
  //console.log("escrito" + false);
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

        if(window.location.href.substring(window.location.href.length - 10) === "tasks.html"){

          loadTasks();
        }
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

        console.log(user.uid);
        childID = user.uid;
        loadTasks();

      }
    });

  });

}

function loadTasks() {

  

  const childrenRef = firebase.database().ref().child('children').child(childID);
  

  childrenRef.on('value', function(snapshot) {

    clearTable();
    var html = "<table id ='taskTable' class='bordered highlight'> <tbody>";
    var morro = snapshot.val();
    const transactions = morro.tasks
    for (var key in transactions) {
      if (transactions.hasOwnProperty(key)) {
        transaction = transactions[key];
        const sAmount = transaction.amount;
        const sName = transaction.name;
        var color = " style= 'color: blue'"
        if (transaction.completed){
           color = " style= 'color:  #3DD87F'";
        }
        else{
           color = " style= 'color: #FB2C55'";
        }

        html += "<tr class = 'clickRow' id = '" + key + "'> <td " + color + ">" + sName + "</td><td" + color + "> $";
        if(sAmount ===""){
          html += "0 </td> </tr>"
        } 
        else{
          html+= sAmount + " </td> </tr>";
        }
      }
    }
    
    html += "</tbody></table>"
    console.log(html);
    
    $("#tasksData" ).append( html );

  });

}

function taskChange() {

  var user = firebase.auth().currentUser;
}

function newTask(taskName, taskAmount) {


  /*const childrenRef = firebase.database().ref().child('children').child(childID);
  const taskRef = childrenRef.child('tasks');
  var newTaskRef = taskRef.push();*/
  console.log("casi1" + taskName + taskAmount);
  var newTaskRef = firebase.database().ref('children/' + childID +'/tasks').push();

  console.log("casi2");
  newTaskRef.set({
    addedByUser: user.uid,
    amount: taskAmount,
    completed: false,
    name: taskName
  });
  console.log("exito");
}

function clearTable() {
  $( "#tasksData" ).empty();
  console.log("alv");
}
