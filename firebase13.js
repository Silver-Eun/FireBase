const firebaseConfig = {
  apiKey: "AIzaSyCcxuhPXDjlai3sF9NewH0eXmS9hyoSr5Y",
  authDomain: "image-22625.firebaseapp.com",
  projectId: "image-22625",
  storageBucket: "image-22625.appspot.com",
  messagingSenderId: "881112754533",
  appId: "1:881112754533:web:3fb50b0a6fe3581395198c",
};
// initialize firebase
firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();
var imagesRef = storage.ref("/images");

function upload(form) {
  if (form.image.files.length == 0) {
    alert("select file");
    return;
  }

  var image = form.image.files[0];

  if (!image.type.match("image/.*")) {
    alert("select only image");
    return;
  }

  if (!verifyFileName(image.name)) {
    alert("cannot use special characters");
    return;
  }

  var fileRef = imagesRef.child(image.name);
  fileRef.put(image);
}

function verifyFileName(filename) {
  return !/[#?\[\]]/.test(filename);
}
