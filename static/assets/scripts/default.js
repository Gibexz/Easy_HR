// document.addEventListener('DOMContentLoaded', function() {
//     setTimeout(function() {
//         const notification = document.querySelector('.red_background');
//         if (notification) {
//             notification.classList.add('fade-out');
//             notification.addEventListener.style.display = 'none';

//         }
//     }, 3000);
// })
document.addEventListener('DOMContentLoaded', function() {
    // Function to validate the date input
    function validateDate() {
        const dateInputs = document.getElementsByClassName("date");
        const today = new Date();
        const maxFutureDate = new Date();
        
        // Set the maximum future date to 120 years from today
        maxFutureDate.setFullYear(today.getFullYear() + 120);

        for (const dateInput of dateInputs) {
            const selectedDate = new Date(dateInput.value);

            if (selectedDate > today || selectedDate > maxFutureDate) {
                alert("Please select a date that is not later than today and not more than 150 years in the future.");
                dateInput.value = ""; // Clear the input
                return false; // Prevent form submission
            }
        }
        return true; // Allow form submission
    }

    // Add a submit event listener to the form
    const myForm = document.getElementById("form_table");
    myForm.addEventListener("submit", function (event) {
        if (!validateDate()) {
            event.preventDefault(); // Prevent form submission if the date is invalid
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {

    const notification = document.querySelector('.red_background');

    if (notification) {
        setTimeout(function() {
            notification.classList.add('fade-out');

            // Listen for the transition end event to remove the element
            notification.addEventListener('transitionend', function() {
                notification.style.display = 'none';
            });
        }, 3000);
    }
});