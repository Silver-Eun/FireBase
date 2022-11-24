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
var progress = document.getElementById("progress");

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

  if (image.size > 5 * 1024 * 1024) {
    alert("upload under 5MB");
    return;
  }

  var fileRef = imagesRef.child(image.name);
  var uploadTask = fileRef.put(image);
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var current = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progress.value = current;
    },
    function (error) {
      alert(error.message);
    },
    function () {
      var imagebox = document.getElementById("imagebox");
      var img = document.createElement("img");
      img.src = uploadTask.snapshot.downloadURL;
      img.alt = "upladed image";

      imagebox.appendChild(img);

      alert("succeed");
    }
  );
}

function verifyFileName(filename) {
  return !/[#?\[\]]/.test(filename);
}
