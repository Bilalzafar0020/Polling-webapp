// main.js

// Get references to the poll options and poll bars
const options = document.querySelectorAll('.poll-option');
const bars = document.querySelectorAll('.poll-bar');

// Attach event listeners to the checkboxes
options.forEach((option, index) => {
  const checkbox = option.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      uncheckOtherOptions(checkbox);
    }
    updatePollResults();
  });
});

// Function to uncheck other options when a checkbox is checked
function uncheckOtherOptions(checkedCheckbox) {
  options.forEach((option) => {
    const checkbox = option.querySelector('input[type="checkbox"]');
    if (checkbox !== checkedCheckbox) {
      checkbox.checked = false;
    }
  });
}

// Function to update the poll results
function updatePollResults() {
  // Get the total number of users who participated in the poll
  const totalUsers = calculateTotalUsers();

  // Update the width and percentage label of each poll bar based on the number of users who selected the option
  options.forEach((option, index) => {
    const checkbox = option.querySelector('input[type="checkbox"]');
    const bar = option.querySelector('.poll-bar');
    const percentageLabel = option.querySelector('.percentage-label');
    const isChecked = checkbox.checked;

    if (isChecked) {
      const usersSelected = calculateUsersSelected(index);
      const percentage = (usersSelected / totalUsers) * 100;
      bar.style.width = percentage + '%';
      percentageLabel.textContent = percentage.toFixed(1) + '%';
    } else {
      bar.style.width = '0';
      percentageLabel.textContent = '';
    }
  });
}

// Function to calculate the total number of users who participated in the poll
function calculateTotalUsers() {
  let total = 0;
  options.forEach((option) => {
    const checkbox = option.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      total++;
    }
  });
  return total;
}

// Function to calculate the number of users who selected a specific option
function calculateUsersSelected(optionIndex) {
  let usersSelected = 0;
  options.forEach((option, index) => {
    if (index === optionIndex) {
      const checkbox = option.querySelector('input[type="checkbox"]');
      if (checkbox.checked) {
        usersSelected++;
      }
    }
  });
  return usersSelected;
}

// Function to show a SweetAlert message
function showSweetAlert() {
  Swal.fire({
    icon: 'info',
    title: 'Oops...',
    text: 'You can only select one option.',
  });
}

// Attach event listener to the checkboxes
options.forEach((option, index) => {
  const checkbox = option.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      const otherOptionsChecked = Array.from(options).filter((opt, i) => i !== index && opt.querySelector('input[type="checkbox"]').checked);
      if (otherOptionsChecked.length > 0) {
        checkbox.checked = false;
        showSweetAlert();
      }
    }
    updatePollResults();
  });
});
