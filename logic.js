
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBUTE5mNXvKBFfhx55DaC7RByeZrz1UT1c",
    authDomain: "trainsched-1aec9.firebaseapp.com",
    databaseURL: "https://trainsched-1aec9.firebaseio.com",
    projectId: "trainsched-1aec9",
    storageBucket: "trainsched-1aec9.appspot.com",
    messagingSenderId: "287829833476"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//Button adds Train Info
  $("#add-train-btn").on("click", function (e) {
      event.preventDefault();
//B=Grabbing User input for train
      var trainName = $('.train-name-input').val().trim();
      var trainDest = $('.dest-input').val().trim();
      var trainTime = moment($('.first-input').val().trim(), "HH:mm").format("hh:mm a");
      var trainRate = $('.rate-input').val().trim();
  })
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
  