var childID, user, isTutor, tutor;

$(document).ready(function() {

  initializeFireBase();


  //Add realtime Listener
  addLoginListener();

$( "#newTaskButton" ).click( function() {
  window.location.href ="newTask.html";
});

$( ".back" ).click( function() {
  window.location.href ="tasks.html";
});

$("#submitTask").click(function(){
  var taskName = $("#taskNameF").val();
  var taskAmount = $("#taskAmountF").val();


  if(!isNaN(taskAmount)){
    newTask(taskName,taskAmount);
    window.location.href = "tasks.html";
  }
});

//task completado
$("#tasksData").on("click",".clickRow",function(){
  var taskId = $(this).closest('tr').attr('id');
  var taskRef = firebase.database().ref('children/' + childID +'/tasks/' + taskId);

  taskRef.update({completed: !($(this).attr("style") == 'color:  #3DD87F')});
});

//pagar
$("#tasksData").on("click",".pay-task",function() {
  if(isTutor) {
    var taskID = $(this).closest('tr').attr('id');

    payTask(taskID);

  }
});

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

      const tutorValue = childSnapshot.val();
      const email = tutorValue.email;

      if (user.email == email){
        tutor = tutorValue;
        childID = tutor.selectedChild;
        isTutor = true;
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
        childID = user.uid;
        isTutor = false;
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
        var sBoton;
        var color = " style= 'color: blue'"

        if (transaction.completed) {
           color = " style= 'color:  #3DD87F' ";
           sBoton  = "";
           if (isTutor) {
            sBoton  = "<td class = 'pay-task'> <input type='button' value='Pay'/> </td>";
           }

        }
        else {
           color = " style= 'color: #5A37FF; '";
           sBoton = "<td class = 'clickRow'></td>";
        }

        html += "<tr  id = '" + key + "'>"
        + " <td class = 'clickRow task-name'" + color + ">" + sName + "</td> "
        + " <td class = 'clickRow task-amount' id ='amount" + sAmount +
        "' " + color + "> $";


        if(sAmount ==="" ){
          html += "0</td>" + sBoton + " </tr>"
        }
        else{
          html+= sAmount + " </td>" + sBoton + " </tr>";
        }
      }
    }

    html += "</tbody></table>"



    $("#tasksData" ).append( html );
    $(".loader").hide();

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
  $( "#tasksData" ).empty();
}

function addToHistory(taskId){

  var taskRef = firebase.database().ref('children/' + childID +'/tasks/' + taskId);



  var sAmount, sName;

   taskRef.once("value").then(function(snapshot){

    console.log(snapshot.val())

    sAmount = snapshot.val().amount;
    sName = snapshot.val().name;
    var historyRef = firebase.database().ref('children/' + childID + '/history').push();
    historyRef.set({
      amount: "$" + sAmount,
      from: user.uid,
      name: sName,
      to: childID
    });

  });

}

function payTask(taskId) {
  var cantidad;
  var taskRef = firebase.database().ref('children/' + childID +'/tasks/' + taskId);
  var taskTitle = "Task Completed"

  //Read task data
    taskRef.once("value").then(function(snapshot){

      cantidad = snapshot.val().amount;
      taskTitle = snapshot.val().name;
      var childrenRef = firebase.database().ref('children/' + childID);

      //Update Balance
      childrenRef.once("value").then(function(snapshot){

        createCharge(cantidad*100, taskTitle, taskId, childrenRef)

      });

    });
}


function createCharge(amountCents, description, taskId, childRef) {

  $.ajax({
      url: "https://lobby-boy.herokuapp.com/create-charge",
      method: "POST",
      type: "POST",
      // contentType: "application/json",
      // dataType: "json",

      // xhrFields: {
      //   withCredentials: false
      // },
      crossDomain: true,
      data: {
        'amount': amountCents,
        'currency': tutor.currency,
        'customerId': tutor.stripeID,
        'description': description,
      },


      success:function(response) {
        childRef.once("value").then(function(snapshot){

            cantidad = round((Number(snapshot.val().balance) + Number(amountCents)));
            childRef.update({balance: cantidad});

        });

        taskRef.remove()
        addToHistory(taskId);
      },
      error: function(response){
        // var res = JSON.stringify(response)
        // console.log(response.status)


        if (response.status == 200) {
          window.location.href = "login.html";
        }

        else {
          alert("Sorry we could not charge your card. Try again with another one, please.");
        }
      }
    });
}
