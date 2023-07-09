import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc,getDocs,onSnapshot } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
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
  '<input id="swal-input1" class="swal2-input" style="width: 549px;" maxLength = 80; placeholder="Enter label of Poll, e.g which flower is most beautiful">' +
  '<input id="swal-input2" class="swal2-input" placeholder="Enter option 1" maxLength = 10;>' +
  '<input id="swal-input3" class="swal2-input" placeholder="Enter option 2" maxLength = 10;>' +
  '<input id="swal-input4" class="swal2-input" placeholder="Enter option 3" maxLength = 10;>' +
  '<input id="swal-input5" class="swal2-input" placeholder="Enter option 4" maxLength = 10;>', 
  focusConfirm: false,
  showCancelButton: true,
  confirmButtonColor: "#2ded27",
  confirmButtonText: "Create",
  cancelButtonText: "Cancel",
  preConfirm: () => {
    const label = document.getElementById('swal-input1').value;
    const option1 = document.getElementById('swal-input2').value;
    const option2 = document.getElementById('swal-input3').value;
    const option3 = document.getElementById('swal-input4').value;
    const option4 = document.getElementById('swal-input5').value;

    if (!label || !option1 || !option2 || !option3 || !option4) {
      Swal.showValidationMessage('Please fill in all the fields');
      return false;
    }

    return [label, option1, option2, option3, option4];
  }
}).then((result) => {
  if (result.isConfirmed) {
    const [label, option1, option2, option3, option4] = result.value;
    // Add the poll data to Firestore collection
    const pollData = {
      label: label,
      options: [option1, option2, option3, option4]
    };

    addDoc(collection(db, "polls"), pollData)
      .then(() => {
          // showAlert('Poll created successfully');
      })
      .catch((error) => {
        
setTimeout(  
  showAlert(`You have log-out yourSelf from this app.please login again to add polls`)
  //  this message is due to rules in firebase i have set that no one can add polls if he did not sign in 
,9000)

      });
  }
});



});


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////  geting back data from database          ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


let mainDiv = document.getElementById('main');


// a new div for the polls container
const pollsContainer = document.createElement('div');
pollsContainer.style.overflow = 'auto';
pollsContainer.style.width = '90%';
pollsContainer.style.marginLeft = '60px';
pollsContainer.classList.add('pollsContainer');
pollsContainer.style.marginTop = '35px'
pollsContainer.style.display = 'flex';
pollsContainer.style.alignItems = 'center';
pollsContainer.style.justifyContent ='center';
pollsContainer.style.flexDirection = 'column';


// Inserting the polls container after the main div
mainDiv.insertAdjacentElement('afterend', pollsContainer);


// Updating the retrieveData function to append polls to the polls container
let retrieveData = async function() {
  const querySnapshot = await getDocs(collection(db, 'polls'));

  querySnapshot.forEach((doc) => {
    const pollData = doc.data();
    const pollId = doc.id;

    // a poll container
    const pollDiv = document.createElement('div');
    pollDiv.classList.add('poll');
    pollDiv.style.marginBottom = '20px';



    // a poll label input
    const pollLabel = document.createElement('input');
    pollLabel.type = 'text';
    pollLabel.value = pollData.label;
    pollLabel.disabled = true;
    pollLabel.classList.add('inputs');

    // Append poll label input;
    pollDiv.appendChild(pollLabel);



    // a poll options
    pollData.options.forEach((option) => {
      // Creating option container
      const optionDiv = document.createElement('div');
optionDiv.classList.add('optionsDiv');


      // Creating checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
checkbox.classList.add('checkboxes');

      // Creating  checkbox option label
      const optionLabel = document.createElement('label');
      optionLabel.textContent = option;
optionLabel.classList.add('optionLabel')




      // Append checkbox and option label to option container
      optionDiv.appendChild(checkbox);
      optionDiv.appendChild(optionLabel);

      // Append option container to poll container
      pollDiv.appendChild(optionDiv);

      
    });

    // Append poll container to poll div 
    pollsContainer.appendChild(pollDiv);



//   vote button
let vote = document.createElement('button');
vote.classList.add('voteButton')
vote.textContent = 'Vote';


    // append to poll div
pollDiv.appendChild(vote);




  });
  
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////   Firestore listener for real-time updates          ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// Initial population of polls
retrieveData()
  .then(() => {
  })
  .catch((error) => {
    console.error("Error retrieving initial polls data:", error);
  });

//  Firestore listener for real-time updates
const pollsCollectionRef = collection(db, "polls");
const unsubscribe = onSnapshot(pollsCollectionRef, (snapshot) => {
  // Clearing the existing poll container
  pollsContainer.innerHTML = '';

  // Calling retrieveData to update the polls on the page
  retrieveData().catch((error) => {
    console.error("Error updating polls:", error);
  });
});


