import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc,getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
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
  const db = getFirestore(app);


  
  
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
 window.location.href = '../index.html';
        },2000 )


            }).catch((error) => {
          showAlert(error);
        });
})




      logOut.style.outline = 'none';
      logOut.textContent = 'Log out';
      logOut.style.color = 'white';
      logOut.style.cursor = 'pointer';
  
      logOutIcon.src = '../exit (2).png'; 
      logOutIcon.style.verticalAlign = 'middle';
      logOutIcon.style.marginRight = '5px';
      logOut.insertBefore(logOutIcon, logOut.firstChild);
  
      logOutDiv.appendChild(logOut);
  
      return logOutDiv;
  }


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////  adding polls to database          ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


let pollButton = document.getElementById('poll');

pollButton.addEventListener('click', ()=>{
  Swal.fire({
    title: 'Fill inputs to Create Poll',
  html:
  '<input id="swal-input1" class="swal2-input" style="width: 549px;" placeholder="Enter label of Poll, e.g which flower is most beautiful">' +
  '<input id="swal-input2" class="swal2-input" placeholder="Enter option 1">' +
  '<input id="swal-input3" class="swal2-input" placeholder="Enter option 2">' +
  '<input id="swal-input4" class="swal2-input" placeholder="Enter option 3">' +
  '<input id="swal-input5" class="swal2-input" placeholder="Enter option 4">', 
  focusConfirm: false,
  showCancelButton: true,
  confirmButtonColor: "#2ded27",
  confirmButtonText: "Create",
  cancelButtonText: "Cancel",
  preConfirm: () => {
    return [
      document.getElementById('swal-input1').value,
      document.getElementById('swal-input2').value,
      document.getElementById('swal-input3').value,
      document.getElementById('swal-input4').value,
      document.getElementById('swal-input5').value,
    ]
  }
})


.then((result) => {
  if (result.isConfirmed) {
    const [label, option1, option2, option3, option4] = result.value;

    // Add the poll data to Firestore collection
    const pollData = {
      label: label,
      options: [option1, option2, option3, option4]
    };

    addDoc(collection(db, "polls"), pollData)
      .then(() => {
          showAlert('Poll created successfully');
      })
      .catch((error) => {
        
setTimeout(  
  showAlert(`You have log-out yourSelf from this app.please login again to add polls`)
  //  this message is due to rules in firebase i have set that no one can add polls if he did not sign in 
,9000)

      });
  }
  retrieveData();
});



});


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////  geting back data from database          ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// let retrieveData = async function(){
// const querySnapshot = await getDocs(collection(db, "polls"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });


// };
let retrieveData = async function () {
  const querySnapshot = await getDocs(collection(db, "polls"));
  const pollContainer = document.getElementById("pollContainer");

  querySnapshot.forEach((doc) => {
    const pollData = doc.data();
    const pollId = doc.id;

    // Create poll container
    const pollDiv = document.createElement("div");
    pollDiv.classList.add("poll");

    // Create poll label (heading)
    const pollLabel = document.createElement("h3");
    pollLabel.textContent = pollData.label;

    // Create poll options
    pollData.options.forEach((option) => {
      // Create option container
      const optionDiv = document.createElement("div");
      optionDiv.classList.add("poll-option");

      // Create checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      // Create option label
      const optionLabel = document.createElement("label");
      optionLabel.textContent = option;

      // Append checkbox and option label to option container
      optionDiv.appendChild(checkbox);
      optionDiv.appendChild(optionLabel);

      // Append option container to poll container
      pollDiv.appendChild(optionDiv);
    });

    // Append poll label and options to poll container
    pollContainer.appendChild(pollLabel);
    pollContainer.appendChild(pollDiv);
  });
};

// Call retrieveData function to populate the polls
retrieveData();

// // Get references to the poll options and poll bars
// const options = document.querySelectorAll('.poll-option');
// const bars = document.querySelectorAll('.poll-bar');

// // Attach event listeners to the checkboxes
// options.forEach((option, index) => {
//   const checkbox = option.querySelector('input[type="checkbox"]');
//   checkbox.addEventListener('change', () => {
//     if (checkbox.checked) {
//       uncheckOtherOptions(checkbox);
//     }
//     updatePollResults();
//   });
// });

// // Function to uncheck other options when a checkbox is checked
// function uncheckOtherOptions(checkedCheckbox) {
//   options.forEach((option) => {
//     const checkbox = option.querySelector('input[type="checkbox"]');
//     if (checkbox !== checkedCheckbox) {
//       checkbox.checked = false;
//     }
//   });
// }

// // Function to update the poll results
// function updatePollResults() {
//   // Get the total number of users who participated in the poll
//   const totalUsers = calculateTotalUsers();

//   // Update the width and percentage label of each poll bar based on the number of users who selected the option
//   options.forEach((option, index) => {
//     const checkbox = option.querySelector('input[type="checkbox"]');
//     const bar = option.querySelector('.poll-bar');
//     const percentageLabel = option.querySelector('.percentage-label');
//     const isChecked = checkbox.checked;

//     if (isChecked) {
//       const usersSelected = calculateUsersSelected(index);
//       const percentage = (usersSelected / totalUsers) * 100;
//       bar.style.width = percentage + '%';
//       percentageLabel.textContent = percentage.toFixed(1) + '%';
//     } else {
//       bar.style.width = '0';
//       percentageLabel.textContent = '';
//     }
//   });
// }

// // Function to calculate the total number of users who participated in the poll
// function calculateTotalUsers() {
//   let total = 0;
//   options.forEach((option) => {
//     const checkbox = option.querySelector('input[type="checkbox"]');
//     if (checkbox.checked) {
//       total++;
//     }
//   });
//   return total;
// }

// // Function to calculate the number of users who selected a specific option
// function calculateUsersSelected(optionIndex) {
//   let usersSelected = 0;
//   options.forEach((option, index) => {
//     if (index === optionIndex) {
//       const checkbox = option.querySelector('input[type="checkbox"]');
//       if (checkbox.checked) {
//         usersSelected++;
//       }
//     }
//   });
//   return usersSelected;
// }

// // Function to show a SweetAlert message
// function showSweetAlert() {
//   Swal.fire({
//     icon: 'info',
//     title: 'Oops...',
//     text: 'You can only select one option.',
//   });
// }

// // Attach event listener to the checkboxes
// options.forEach((option, index) => {
//   const checkbox = option.querySelector('input[type="checkbox"]');
//   checkbox.addEventListener('change', () => {
//     if (checkbox.checked) {
//       const otherOptionsChecked = Array.from(options).filter((opt, i) => i !== index && opt.querySelector('input[type="checkbox"]').checked);
//       if (otherOptionsChecked.length > 0) {
//         checkbox.checked = false;
//         showSweetAlert();
//       }
//     }
//     updatePollResults();
//   });
// });
