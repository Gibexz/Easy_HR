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
    // Function to validate the date inputs
    function validateDate() {
        const date1Input = document.getElementById("dateEmp");
        const date2Input = document.getElementById("dob");
        const today = new Date();
        const maxDOBDate = new Date();
        const minDOBDate = new Date();
        const maxFutureDate = new Date();
        const maxPastDate = new Date();
        
        // Set the maximum future date to 10 years from today
        maxFutureDate.setFullYear(today.getFullYear() + 10);
        // Set the maximum past date to 100 years from today
        maxPastDate.setFullYear(today.getFullYear() - 100);

        // Set the maximum date of birth (DOB) date to 120 years ago
        maxDOBDate.setFullYear(today.getFullYear() - 120);
        // Set the minimum date of birth (DOB) date to 12 years ago
        minDOBDate.setFullYear(today.getFullYear() - 12);
        
        

        const dateEmpInput = new Date(date1Input.value);
        const dobInput = new Date(date2Input.value);

        if (dateEmpInput > maxFutureDate) {
            alert("Date not acceptable. Please select a more recent date. Maximum future date is 10 years from today, for planned future employment.");
            date1Input.value = ""; // Clear the input
            return false; // Prevent form submission
        }

        if (dateEmpInput < maxPastDate) {
            alert("Date not acceptable. Please select a more recent date. Maximum past date is 100 years from today, for past employment.");
            date1Input.value = ""; // Clear the input
            return false; // Prevent form submission
        }

        if (dobInput < maxDOBDate) {
            alert("Date not acceptable. Please select a more recent date. Max age is 120 years old.");
            date2Input.value = ""; // Clear the input
            return false; // Prevent form submission
        }

        if (dobInput > minDOBDate) {
            alert("Date too young. Please select a past date. Minimum age is 12 years old.");
            date2Input.value = ""; // Clear the input
            return false; // Prevent form submission
        }

        return true; // Allow form submission
    }

    // Add a submit event listener to the form
    const myForm = document.getElementById("form_table");
    myForm.addEventListener("submit", function (event) {
        if (!validateDate()) {
            event.preventDefault(); // Prevent form submission if the dates are invalid
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