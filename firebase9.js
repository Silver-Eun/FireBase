const firebaseConfig = {
  apiKey: "AIzaSyBCA6wuwUiQjxOVmQ8Di0gZeRTvkJVYigg",
  authDomain: "memo-ac031.firebaseapp.com",
  databaseURL: "https://memo-ac031-default-rtdb.firebaseio.com",
  projectId: "memo-ac031",
  storageBucket: "memo-ac031.appspot.com",
  messagingSenderId: "1091189624290",
  appId: "1:1091189624290:web:b35e88c0e62b4ab359fdbb",
};
// initialize firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var messagesRef = null;
var auth = firebase.auth();

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

    var memoRef = database.ref("/memo/" + user.uid);
    memoRef.push("hi" + new Date().getTime().toString());
  } else {
    $("#before-login").show();
    $("#after-login").hide();
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

function makeMemo(key, memo) {
  var $li = $('<li class="memo-item" data-key="' + key + '" />');
  var $p = $('<p class="memo">' + memo + "</p>");
  var $div = $('<div class="controls" />');
  var $editBtn = $('<button type="button" onclick="edit(\'' + key + "')\">Edit</button>");
  var $removeBtn = $('<button type="button" onclick="remove(\'' + key + "')\">Remove</button>");

  $div.append($editBtn, " ", $removeBtn);
  $li.append($p, $div);

  return $li;
}

function addMemo(form) {
  var memo = form.memo.value;
  var $memoItem = makeMemo(new Date().getTime(), memo);

  $("#memo-list").append($memoItem);

  form.reset();
}

function remove(key) {
  var $target = $("li.memo-item[data-key=" + key + "]");
  $target.remove();

  doneEdit();
}

function edit(key) {
  $("li.memo-item").removeClass("active");
  var $target = $("li.memo-item[data-key=" + key + "]");
  $target.addClass("active");

  var memo = $target.find("p.memo").text();

  $("#edit-form input[name=memo]").val(memo);

  $("#add-form").hide();
  $("#edit-form").show();
}

function editMemo(form) {
  var memo = form.memo.value;

  var $target = $("li.memo-item.active p.memo");
  $target.text(memo);

  form.reset();
  doneEdit();
}

function doneEdit() {
  $("li.memo-item").removeClass("active");
  $("#add-form").show();
  $("#edit-form").hide();
}
