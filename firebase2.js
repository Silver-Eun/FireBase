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

// 데이터베이스에 있는 루트폴더에 접근
// rootRef -> 루트 디렉토리
var messagesRef = firebase.database().ref("/messages");

function sendMessage(form) {
  var newMsg = {
    name: form.name.value,
    text: form.text.value,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
  };

  messagesRef.push(newMsg);

  form.text.value = "";
}

messagesRef.on("child_added", function (snapshots) {
  var msg = snapshots.val();

  var html = "<div>" + msg.name + ":" + msg.text + "</div>";
  $("#message-list").append(html);
});
