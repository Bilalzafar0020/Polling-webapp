
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc,getDocs,onSnapshot,doc,updateDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
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
  '<input id="swal-input2" class="swal2-input" placeholder="Enter option 1" maxLength = 12;>' +
  '<input id="swal-input3" class="swal2-input" placeholder="Enter option 2" maxLength = 12;>' +
  '<input id="swal-input4" class="swal2-input" placeholder="Enter option 3" maxLength = 12;>' +
  '<input id="swal-input5" class="swal2-input" placeholder="Enter option 4" maxLength = 12;>', 
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
      options: [option1, option2, option3, option4],
  percentages: [0, 0, 0, 0]
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
pollsContainer.classList.add('pollContainer');

// Inserting the polls container after the main div
mainDiv.insertAdjacentElement('afterend', pollsContainer);


// ...

// ...
let retrieveData = async function() {
  const querySnapshot = await getDocs(collection(db, 'polls'));

  querySnapshot.forEach((docum) => {
    const pollData = docum.data();
    const pollId = docum.id; // Get the ID of the document

    const label = pollData.label;
    const options = pollData.options;
    const percentages = pollData.percentages;

    // Create the poll container
    const pollDiv = document.createElement('div');
    pollDiv.classList.add('poll');
    pollDiv.style.marginBottom = '20px';

    // Create the poll label input
    const pollLabel = document.createElement('input');
    pollLabel.type = 'text';
    pollLabel.value = label;
    pollLabel.disabled = true;
    pollLabel.classList.add('inputs');

    // Append poll label input
    pollDiv.appendChild(pollLabel);

    // Create poll options
    options.forEach((option, index) => {
      // Creating option container
      const optionDiv = document.createElement('div');
      optionDiv.classList.add('optionsDiv');

      // Creating checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('checkboxes');

      // Creating checkbox option label
      const optionLabel = document.createElement('label');
      optionLabel.textContent = option;
      optionLabel.classList.add('optionLabel');

      // Creating percentage label
      const percentageLabel = document.createElement('span');
      percentageLabel.classList.add('percentageLabel');
      percentageLabel.textContent = `${percentages[index]}%`;

     ///  creating poll bar to show visual of percentage
      const pollBarContainer = document.createElement('div');
      pollBarContainer.classList.add('pollBarContainer');
      
      // Creating the poll bar fill
      const pollBarFill = document.createElement('div');
      pollBarFill.classList.add('pollBarFill');
      pollBarFill.style.width = `${percentages[index]}%`;
      pollBarFill.id = `pollBar_${pollId}_${index}`; // Unique ID for each poll bar
      
      // Append the poll bar fill to the poll bar container
      pollBarContainer.appendChild(pollBarFill);
      
 

      // Append checkbox, option label, and percentage label to option container
      optionDiv.appendChild(checkbox);
      optionDiv.appendChild(optionLabel);
      optionDiv.appendChild(percentageLabel);
      
     // Append the poll bar container to the option container
      optionDiv.appendChild(pollBarContainer);

      // Append option container to poll container
      pollDiv.appendChild(optionDiv);
    });

    // Create vote button
    const voteButton = document.createElement('button');
    voteButton.classList.add('voteButton');
    voteButton.textContent = 'Vote';


/////////////////////////////////////////////////////////////////////////////////////////////////////////
//  updating percenatge to  database  and also getting back updated percentage and votes        ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


//  for percentage  
    function getUpdatedPercentages(votes) {
      const totalVotes = Object.values(votes).length;
      const counts = [0, 0, 0, 0];
    
      // Count the votes for each option
      Object.values(votes).forEach((optionIndex) => {
        counts[optionIndex]++;
      });
    
      // Calculate the percentages based on the total votes
      const percentages = counts.map((count) => (count / totalVotes) * 100);
      return percentages;
    }
    
    // Add event listener to the vote button
    voteButton.addEventListener('click', () => {
      const checkboxes = pollDiv.querySelectorAll('.checkboxes');
      const selectedOptions = [];

      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          selectedOptions.push(index);
        }
      });

      if (selectedOptions.length === 0) {
        showAlert('Please select an option');
        return;
      }

      const pollRef = doc(db, 'polls', pollId);

      const votes = {
        ...pollData.votes, // Keep the existing votes
        [auth.currentUser.uid]: selectedOptions[0],
      };

      //////////////////////////////////////////////////////
      /////////////////////////////////
      ////////////////////////////////// Update the votes in Firestore
  updateDoc(pollRef, { votes, percentages: getUpdatedPercentages(votes) })
        .then(() => {
          showAlert('Vote submitted successfully');


          // Retrieving the updated poll data from Firestore
          doc(pollRef)
            .get()
            .then((doc) => {
              if (doc.exists()) {
                const updatedPollData = doc.data();
                const updatedPercentages = getUpdatedPercentages(updatedPollData.votes);

                // Update the percentage labels in the UI
                const percentageLabels = pollDiv.querySelectorAll('.percentageLabel');
                percentageLabels.forEach((label, index) => {
                  label.textContent = `${updatedPercentages[index]}%`;
                });
  
                //   increasing or decreasing poll bar according to percenatage of unique id
                updatedPercentages.forEach((percentage, index) => {
                  const pollBarFill = document.getElementById(`pollBar_${pollId}_${index}`);
                  pollBarFill.style.width = `${percentage}%`;
                });

                // Disable checkboxes after voting
                checkboxes.forEach((checkbox) => {
                  checkbox.disabled = true;
                });
              }
            })
            .catch((error) => {
              // showAlert('Failed to retrieve updated poll data');
              console.error('Error retrieving updated poll data:', error);
            });
        })
        .catch((error) => {
          // showAlert('Failed to submit vote');
          console.error('Error updating vote:', error);
        });
    });

    // Append vote button to poll container
    pollDiv.appendChild(voteButton);

    // Append poll container to polls container
    pollsContainer.appendChild(pollDiv);
  });
};

// ...


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






///        my previous code (  for future mistakes)

/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc,getDocs,onSnapshot,doc,updateDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
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
  '<input id="swal-input2" class="swal2-input" placeholder="Enter option 1" maxLength = 12;>' +
  '<input id="swal-input3" class="swal2-input" placeholder="Enter option 2" maxLength = 12;>' +
  '<input id="swal-input4" class="swal2-input" placeholder="Enter option 3" maxLength = 12;>' +
  '<input id="swal-input5" class="swal2-input" placeholder="Enter option 4" maxLength = 12;>', 
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
      options: [option1, option2, option3, option4],
  percentages: [0, 0, 0, 0]
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


// ...

// ...
let retrieveData = async function() {
  const querySnapshot = await getDocs(collection(db, 'polls'));

  querySnapshot.forEach((docum) => {
    const pollData = docum.data();
    const pollId = docum.id; // Get the ID of the document

    const label = pollData.label;
    const options = pollData.options;
    const percentages = pollData.percentages;

    // Create the poll container
    const pollDiv = document.createElement('div');
    pollDiv.classList.add('poll');
    pollDiv.style.marginBottom = '20px';

    // Create the poll label input
    const pollLabel = document.createElement('input');
    pollLabel.type = 'text';
    pollLabel.value = label;
    pollLabel.disabled = true;
    pollLabel.classList.add('inputs');

    // Append poll label input
    pollDiv.appendChild(pollLabel);

    // Create poll options
    options.forEach((option, index) => {
      // Creating option container
      const optionDiv = document.createElement('div');
      optionDiv.classList.add('optionsDiv');

      // Creating checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('checkboxes');

      // Creating checkbox option label
      const optionLabel = document.createElement('label');
      optionLabel.textContent = option;
      optionLabel.classList.add('optionLabel');

      // Creating percentage label
      const percentageLabel = document.createElement('span');
      percentageLabel.classList.add('percentageLabel');
      percentageLabel.textContent = `${percentages[index]}%`;

      // Append checkbox, option label, and percentage label to option container
      optionDiv.appendChild(checkbox);
      optionDiv.appendChild(optionLabel);
      optionDiv.appendChild(percentageLabel);

      // Append option container to poll container
      pollDiv.appendChild(optionDiv);
    });

    // Create vote button
    const voteButton = document.createElement('button');
    voteButton.classList.add('voteButton');
    voteButton.textContent = 'Vote';

    function getUpdatedPercentages(selectedOptions) {
      const percentages = [0, 0, 0, 0];

      // Calculate the total number of selected options
      const totalSelected = selectedOptions.length;

      // Increment the count for each selected option
      selectedOptions.forEach((index) => {
        percentages[index]++;
      });

      // Calculate the percentages based on the total selected
      percentages.forEach((count, index) => {
        percentages[index] = (count / totalSelected) * 100;
      });

      return percentages;
    }

    // Add event listener to the vote button
    voteButton.addEventListener('click', () => {
      const checkboxes = pollDiv.querySelectorAll('.checkboxes');
      const selectedOptions = [];

      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          selectedOptions.push(index);
        }
      });

      if (selectedOptions.length === 0) {
        showAlert('Please select an option');
        return;
      }

      const pollRef = doc(db, 'polls', pollId);

      const votes = {
        ...pollData.votes, // Keep the existing votes
        [auth.currentUser.uid]: selectedOptions[0],
      };

      // Update the percentages in Firestore
      updateDoc(pollRef, {
        percentages: getUpdatedPercentages(selectedOptions),
        votes: votes, // Store the user's vote
      })
        .then(() => {
          showAlert('Vote submitted successfully');


// Updating the retrieveData function to append polls to the polls container
          // Retrieve the updated poll data from Firestore
          doc(pollRef)
            .get()
            .then((doc) => {
              if (doc.exists()) {
                const updatedPollData = doc.data();
                const updatedPercentages = updatedPollData.percentages;

                // Update the percentage labels in the UI
                const percentageLabels = pollDiv.querySelectorAll('.percentageLabel');
                percentageLabels.forEach((label, index) => {
                  label.textContent = `${updatedPercentages[index]}%`;
                });

                // Disable checkboxes after voting
                checkboxes.forEach((checkbox) => {
                  checkbox.disabled = true;
                });
              }
            })
            .catch((error) => {
              // showAlert('Failed to retrieve updated poll data');
              console.error('Error retrieving updated poll data:', error);
            });
        })
        .catch((error) => {
          // showAlert('Failed to submit vote');
          console.error('Error updating vote:', error);
        });
    });

    // Append vote button to poll container
    pollDiv.appendChild(voteButton);

    // Append poll container to polls container
    pollsContainer.appendChild(pollDiv);
  });
};

// ...


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




*/

