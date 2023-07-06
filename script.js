import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAuth,signInWithEmailAndPassword,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
  
  
const firebaseConfig = {
  apiKey: "AIzaSyC6EI18CIdhQAjcGR3P9O_OTHXuga8wDXQ",
  authDomain: "polling-webapp.firebaseapp.com",
  projectId: "polling-webapp",
  storageBucket: "polling-webapp.appspot.com",
  messagingSenderId: "454285381080",
  appId: "1:454285381080:web:b7ee27f5d4be178d0cf6ad",
  measurementId: "G-HPQL66893T"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

 
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
  
  
    const email = emailInput
    const password = passwordInput
  
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
  // window.location.href = 'second.html';


      if (userCredential.user.emailVerified) {
        // Redirect to second.html if email is verified
        window.location.href = "second.html";
      } else {
        alert('Please verify your email before logging in.');
      }

      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
      });
  });
  



//  provide login user all data 
onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
    });
  }
});


///  only provide user id information 


// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user
//     const uid = user.uid;console.log('user',uid);
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

  