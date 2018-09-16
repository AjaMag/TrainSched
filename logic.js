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
      var trainName = $('.train-name-input').val().trim();
      var trainDest = $('.dest-input').val().trim();
      var trainTime = moment($('.first-input').val().trim(), "HH:mm").format("hh:mm a");
      var trainRate = $('.rate-input').val().trim();

//Local, temporary object for holding train data
        var newTrain = {
            name: trainName,
            destination: trainDest,
            time: trainTime,
            frequency: trainRate,
        }
//Uploads train data to the datatbase
  database.ref().push(newTrain)

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.rate);
  
  alert("Train Successfully Added");

  //Clears all text boxes
  $('.train-name-input').val(" ");
  $('.dest-input').val(" ");
  $('.first-input').val(" ")
  $('.rate-input').val(" ");

});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
//Stores info to these varialbles
var trainName = childSnapshot.val().name;
var trainDest = childSnapshot.val().destination;
var trainFirst = childSnapshot.val().time;
var trainRate = childSnapshot.val().frequency;

console.log(trainName)
console.log(trainDest)
console.log(trainFirst)
console.log(trainRate)

  // Prettify the employee start


var trainTimePretty = moment.unix(trainFirst).format("hh:mm a")
console.log(trainTimePretty);

var currentTime = moment();
console.log("Current Time:" + moment(currentTime).format("hh:mm"));

//Diff between currentTime and trainTimePretty
var trainDiff = moment().diff(moment(trainTimePretty, "HH:mm"), "minutes")
console.log("Difference in Time:" + trainDiff);

//Time apart (remainder)
var tRemainder = trainDiff % trainRate;
console.log(tRemainder);

// Minute Until Train
var tMinutesTill = trainRate - tRemainder;
console.log("MINUTES AWAY: " + tMinutesTill);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


})
