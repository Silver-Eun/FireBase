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
var memoRef = null;
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

    $("#memo-list").empty();

    afterLogin(user);
  } else {
    $("#before-login").show();
    $("#after-login").hide();

    if (memoRef) {
      memoRef.off();
    }

    memoRef = null;
  }
});

function afterLogin(user) {
  memoRef = database.ref("/memo/" + user.uid);

  memoRef.on("child_added", function (snapshot) {
    var key = snapshot.key;
    var memo = snapshot.val();

    var $memoItem = makeMemo(key, memo);
    $("#memo-list").append($memoItem);
  });

  memoRef.on("child_added", function (snapshot) {
    var key = snapshot.key;
    var memo = snapshot.val();

    var $target = $("li.memo-item[data-key=" + key + "] p.memo");
    $target.text(memo);
  });

  memoRef.on("child_removed", function (snpashot) {
    var key = snpashot.key;

    var $target = $("li.memo-item[data-key=" + key + "]");
    $target.remove();
  });
}

function logout() {
  auth.signOut();
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

  memoRef.push(memo);

  form.reset();
}

function remove(key) {
  var remove = {};
  remove[key] = null;

  memoRef.update(remove);

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
  var key = $target.data("key");

  var update = {};
  update[key] = memo;

  memoRef.update(update);

  form.reset();
  doneEdit();
}

function doneEdit() {
  $("li.memo-item").removeClass("active");
  $("#add-form").show();
  $("#edit-form").hide();
}
