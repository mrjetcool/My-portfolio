// Navigation links smooth scrolling
const links = document.querySelectorAll('nav a');
links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(link.hash);
    window.scrollTo({
      top: target.offsetTop,
      behavior: 'smooth'
    });
  });
});

// Highlight active link in navigation
function highlightActiveLink() {
  const currentSection = document.querySelector('section.active');
  const currentLink = document.querySelector(`nav a[href="#${currentSection.id}"]`);
  links.forEach(link => link.classList.remove('active'));
  currentLink.classList.add('active');
}

window.addEventListener('scroll', highlightActiveLink);

// Scale projects on hover
const projects = document.querySelectorAll('.project');
projects.forEach((project) => {
  project.addEventListener('mouseenter', () => {
    project.style.transform = 'scale(1.05)';
    project.style.transition = 'all 0.2s ease-in-out';
  });

  project.addEventListener('mouseleave', () => {
    project.style.transform = 'scale(1)';
    project.style.transition = 'all 0.2s ease-in-out';
  });
});

// Datepicker and timepicker configuration
$(document).ready(function() {
  $("#datepicker").datepicker({
    minDate: 0,
    maxDate: "+1w",
    beforeShowDay: function(date) {
      return [(date.getDay() != 0 && date.getDay() != 6)];
    }
  });

  $("#timepicker").timepicker({
    timeFormat: 'g:i A',
    interval: 15,
    minTime: '10:00am',
    maxTime: '5:00pm',
    defaultTime: '10:00am'
  });
});

// Book meeting AJAX request
function bookMeeting() {
  const selectedDate = $('#datepicker').val();
  const selectedTime = $('#timepicker').val();

  // Validate input
  const isValidDate = (new Date(selectedDate) !== "Invalid Date") && !isNaN(new Date(selectedDate));
  const isValidTime = selectedTime !== "";

  if (!isValidDate || !isValidTime) {
    alert("Please select a valid date and time");
    return;
  }

  // Send request
  $.ajax({
    type: "POST",
    url: "/bookMeeting",
    data: { date: selectedDate, time: selectedTime },
  })
  .then(function(response) {
    // Handle success
    alert('Meeting booked successfully!');
  })
  .catch(function(error) {
    // Handle error
    console.error(error);
    alert('Error booking meeting');
  });
}


// Create proficiency chart
function createChart() {
  const canvas = document.getElementById('web-dev-chart');
  const chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
      datasets: [{
        label: 'Proficiency',
        data: [9, 8, 9, 7],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
