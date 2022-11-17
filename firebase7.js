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

auth.onAuthStateChanged(function (user) {
  if (user) {
    $("#user-name").text(user.displayName);

    $("#before-login").hide();
    $("#after-login").show();
  } else {
    $("#before-login").show();
    $("#after-login").hide();
  }
});

function loginFacebook() {
  var provider = new firebase.auth.FacebookAuthProvider();

  auth
    .signInWithPopup(provider)
    .then(function () {
      alert("succeed login with Facebook!");
    })
    .catch(function (error) {
      alert(error.message);
    });
}

function logout() {
  auth.signOut();
}
