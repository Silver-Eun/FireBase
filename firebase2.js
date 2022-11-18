const firebaseConfig = {
  apiKey: "AIzaSyDAy67TqRwuMV-7vAPIIQ5U_24Gh1yEek4",
  authDomain: "exam01-93d61.firebaseapp.com",
  databaseURL: "https://exam01-93d61-default-rtdb.firebaseio.com",
  projectId: "exam01-93d61",
  storageBucket: "exam01-93d61.appspot.com",
  messagingSenderId: "5760955590",
  appId: "1:5760955590:web:d68e003ba9b6dc357913c7",
};
// initialize firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var messagesRef = null;
var auth = firebase.auth();
var user = null;

function signup(form) {
  var email = form.email.value;
  var password = form.password.value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      alert("signup succeed!");
    })
    .catch(function (error) {
      alert(error.message);
    });
}

function login(form) {
  var email = form.email.value;
  var password = form.password.value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      alert("login succeed!");
    })
    .catch(function (error) {
      alert(error.message);
    });
}

auth.onAuthStateChanged(function (user) {
  if (user) {
    $("#login-email").text(user.email);

    $("#before-login").hide();
    $("#after-login").show();

    window.user = user;
    messagesRef = firebase.database().ref("/messages");

    messagesRef
      .orderByChild("timestamp")
      .startAt(new Date().getTime())
      .on("child_added", function (snapshots) {
        var msg = snapshots.val();

        var html = "<div>" + msg.name + ": " + msg.text + "</div>";
        $("#message-list").append(html);
        var messageListScrollHeight = $("#message-list").prop("scrollHeight");
        $("#message-list").scrollTop(messageListScrollHeight);
      });
  } else {
    $("#before-login").show();
    $("#after-login").hide();

    window.user = null;

    if (messagesRef != null) {
      messagesRef.off();
    }
    messagesRef = null;
  }
});

function logout() {
  auth.signOut();
}

function sendMessage(form) {
  var newMsg = {
    name: user.email,
    text: form.text.value,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
  };

  messagesRef.push(newMsg);

  form.text.value = "";
}
