import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth,signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

  
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


  
  
  // alert message 
  function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
  
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.textContent = message;
  
    alertContainer.appendChild(alert);
  
    setTimeout(() => {
      alert.classList.add('hide');
      setTimeout(() => {
        alert.remove();
      }, 500);
    }, 4000);
  }

// Sticky alert   (help from chatgpt so that alert should be responsive)
window.addEventListener('scroll', function () {
  const alertContainer = document.getElementById('alertContainer');
  const alert = alertContainer.querySelector('.alert');
  if (alert) {
    const alertHeight = alert.offsetHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowBottom = scrollTop + windowHeight;

    if (windowBottom > alertContainer.offsetTop + alertHeight) {
      alert.classList.add('sticky');
    } else {
      alert.classList.remove('sticky');
    }
  }
});







///////////////////////////////////////     for log out and log out button

  let out = document.getElementById('out');
  let clickCount = 0;
  let logOutDiv = null;
  
  out.addEventListener('click', () => {
      if (clickCount === 0) {
          logOutDiv = createLogOutDiv();
          document.body.appendChild(logOutDiv);
          clickCount++;
      } else {
          document.body.removeChild(logOutDiv);
          clickCount--;
      }
  });
  
  function createLogOutDiv() {
      let logOutDiv = document.createElement('div');
      let logOut = document.createElement('button');
      let logOutIcon = document.createElement('img');
  
      logOutDiv.style.height = '3rem';
      logOutDiv.style.width = '7rem';
      logOutDiv.style.background = '#ffffff';
      logOutDiv.style.border = '#ada9a9';
      logOutDiv.style.borderWidth = '1px';
      logOutDiv.style.borderStyle = 'solid';
      logOutDiv.style.borderRadius = '5px';
      logOutDiv.style.marginTop = '10px';
      logOutDiv.style.position = 'absolute';
      logOutDiv.style.top = `${out.offsetTop + out.offsetHeight}px`;
      logOutDiv.style.right = '0';
      logOutDiv.style.marginRight = '50px';
  
      logOut.style.height = '29px';
      logOut.style.width = '5rem';
      logOut.style.background = 'blue';
      logOut.style.border = 'none';
      logOut.style.marginTop = '10px';
      logOut.style.marginLeft = '13px';
      logOut.style.borderRadius='5px';
      logOut.addEventListener('mousemove', ()=>{
          logOut.style.transform = 'scale(1.1)';
      });
      logOut.addEventListener('mouseleave', ()=>{
          logOut.style.transform = 'none';
      });


 ////////////////////////////////////          log out code 

logOut.addEventListener('click', ()=>{
    signOut(auth).then(() => {
       
showAlert('Log out-ing you , PLease Wait ')
        setTimeout( ()=>{
 window.location.href = 'index.html';
        },2000 )


            }).catch((error) => {
          showAlert(error);
        });
})




      logOut.style.outline = 'none';
      logOut.textContent = 'Log out';
      logOut.style.color = 'white';
      logOut.style.cursor = 'pointer';
  
      logOutIcon.src = 'exit (2).png'; 
      logOutIcon.style.verticalAlign = 'middle';
      logOutIcon.style.marginRight = '5px';
      logOut.insertBefore(logOutIcon, logOut.firstChild);
  
      logOutDiv.appendChild(logOut);
  
      return logOutDiv;
  }


