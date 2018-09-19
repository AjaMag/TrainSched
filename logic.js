  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyArA4kRJKcWUd_Fh6YqmXaeTJvdnwtd6DY",
    authDomain: "trainschedule-8c7cb.firebaseapp.com",
    databaseURL: "https://trainschedule-8c7cb.firebaseio.com",
    projectId: "trainschedule-8c7cb",
    storageBucket: "trainschedule-8c7cb.appspot.com",
    messagingSenderId: "434420111091"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//Button adds Train Info
  $("#add-train-btn").on("click", function (e) {
      event.preventDefault();
//Grabbing User input for train
      var trainName = $('#train-name-input').val().trim();
      var trainDest = $('#dest-input').val().trim();
      var trainFirst = moment($('#first-input').val().trim(), "HH:mm").format("hh:mm a");
      var trainRate = $('#rate-input').val().trim();

//Local, temporary object for holding train data
        var newTrain = {
            name: trainName,
            destination: trainDest,
            time: trainFirst,
            frequency: trainRate,
        }
//Uploads train data to the datatbase
  database.ref().push(newTrain)
//fter user successfully inputs train info  
  alert("Train Successfully Added");

  //Clears all text boxes
  $('.train-name-input').val(" ");
  $('.dest-input').val(" ");
  $('.first-input').val(" ")
  $('.rate-input').val(" ");

});

//This creates a Firebase event for adding trains to the database and a row to the table in html for each input
database.ref().on("child_added", function(child) {
    console.log(child.val());
//Stores info to these varialbles
var trainName = child.val().name;
var trainDest = child.val().destination;
var trainFirst = child.val().time;
var trainRate = child.val().frequency;

console.log(trainName);
console.log(trainDest);
console.log(trainFirst);
console.log(trainRate);

  // Prettify the train start
var trainTime = child.val().time
console.log(trainTime);

var currentTime = moment();
console.log("Current Time:" + moment(currentTime).format("hh:mm"));

//Diff between currentTime and trainTime
var trainDiff = moment().diff(moment(trainTime, "hh:mm"), "minutes")
console.log("Difference in Time:" + trainDiff);

//Time apart (remainder)
var tRemainder = trainDiff % trainRate;
console.log(tRemainder);

// Minutes Until Train
var minsAway = trainRate - tRemainder;
console.log("MINUTES AWAY: " + minsAway);

// Next Train
var nextTrain = moment().add(minsAway, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

//create new row with new train info
var newTrain = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(trainDest),
  $("<td>").text(trainRate),
  $("<td>").text(moment(nextTrain).format("hh:mm")),
  $("<td>").text(minsAway),  
)
//Append these children to the table
$('#train-table > tbody').append(newTrain);
})
