const firebaseConfig = {
  apiKey: "AIzaSyCBHru5ZJkSJw6eNZS2O3hP_HTWZRWj0Ss",
  authDomain: "login-57d54.firebaseapp.com",
  projectId: "login-57d54",
  storageBucket: "login-57d54.appspot.com",
  messagingSenderId: "99487570087",
  appId: "1:99487570087:web:757f1cc8c871275f5c2382",
};
// initialize firebase
firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();

function signup(form) {
  var email = form.email.value;
  var password = form.password.value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      alert("succeed!");
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
  } else {
    $("#before-login").show();
    $("#after-login").hide();
  }
});

function logout() {
  auth.signout();
}
