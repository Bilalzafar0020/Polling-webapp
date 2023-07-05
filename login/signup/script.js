

const firebaseConfig = {
    apiKey: "AIzaSyC6EI18CIdhQAjcGR3P9O_OTHXuga8wDXQ",
    authDomain: "polling-webapp.firebaseapp.com",
    projectId: "polling-webapp",
    storageBucket: "polling-webapp.appspot.com",
    messagingSenderId: "454285381080",
    appId: "1:454285381080:web:b7ee27f5d4be178d0cf6ad",
    measurementId: "G-HPQL66893T"
  };
 
  
  firebase.initializeApp(firebaseConfig);
  
 
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
  
    console.log('Form submitted'); 
  
    const email = emailInput.value;
    const password = passwordInput.value;
  
    console.log('Email:', email); 
    console.log('Password:', password); 
  
   
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        
        console.log('Login successful');
        window.location.href = "/Main/main.html";
      })
      .catch((error) => {
     
        console.log('Login error:', error);
        alert("Invalid email or password. Please enter correct credentials.");
      });
  });
  



  