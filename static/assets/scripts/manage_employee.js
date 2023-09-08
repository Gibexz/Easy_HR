$(document).ready(function(){
    const buttons = [
        {id: '#add_new_emp', contentId: '#manage_employee_add'},
        {id: '#update_emp', contentId: '#manage_employee_update'},
        {id: '#view_emp', contentId: '#manage_employee_view'},
        {id: '#archive_emp', contentId: '#manage_employee_archive'}
    ];
    
    buttons.forEach(button => {
        $(button.id).on('click', function() {
            buttons.forEach(otherButton => {
                if (button === otherButton) {
                    $(otherButton.contentId).css({ display: 'flex', flex: '3' });

                    // Check if the clicked button is #update_emp and toggle #hide_employee_id_input display
                    if (button.id === '#update_emp') {
                        $('#hide_employee_id_input').css('display', 'block');
                    } else {
                        $('#hide_employee_id_input').css('display', 'none');
                    }

                } else {
                    $(otherButton.contentId).css({ display: 'none', flex: '' });
                }
            });
        });
    });
    // function to change container background of view to white on click
     $('#view_emp').click(function(){
        $('#container').addClass('view_emp_section')
    })
    // to compare, go to line 16 of the css, remove the 2 in .vew_emp_section2 and comment the background color in line 165
    // Which of the view is more appealing to you?
    const all_buttons = ['#add_new_emp', '#update_emp', '#archive_emp']
    for (const button of all_buttons){
        $(button).click( () => {
            if ($('#container').hasClass('view_emp_section'))
              $('#container').removeClass('view_emp_section')
        })
    }
   

});

$(document).ready(function() {
    $("#retrieve_emp_data").click(function(event) {
        event.preventDefault(); // Prevent the default form submission
        // Get the employeeID from the input field
        let employeeID = $("input[name='employeeID']").val();

        // Make an AJAX request to get the employee details
        $.ajax({
            type: "POST",
            url: "/get_employee_details",  // Update the URL as needed
            contentType: "application/json",
            data: JSON.stringify({ "employeeID": employeeID }),
            success: function(response) {
                if (response.success) {
                    // Populate the form fields with the received data
                    $(".retrieve_update_data #firstName").val(response.employee.firstName);
                    $(".retrieve_update_data #middleName").val(response.employee.middleName);
                    $(".retrieve_update_data #lastName").val(response.employee.lastName);
                    $(".retrieve_update_data #email").val(response.employee.email);
                    $(".retrieve_update_data #phone").val(response.employee.phoneNumber);
                    $(".retrieve_update_data #address").val(response.employee.address);
                    $(".retrieve_update_data #nationality").val(response.employee.nationality);
                    $(".retrieve_update_data #state").val(response.employee.stateOfOrigin);
                    $(".retrieve_update_data #emp_id").val(response.employee.employeeID);
                    $(".retrieve_update_data #level").val(response.employee.level);
                    $(".retrieve_update_data #salary").val(response.employee.salary);
                    $(".retrieve_update_data #branch").val(response.employee.branch);
                    $(".retrieve_update_data #dept").val(response.employee.department);
                    $(".retrieve_update_data #dob").val(response.employee.dateOfBirth);
                    $(".retrieve_update_data #dateEmp").val(response.employee.DateOfEmployment);
                    $(".retrieve_update_data #gender").val(response.employee.gender);
                    // Update other form fields as needed
                } else {
                    alert(response.message);
                }
            },
            error: function(error) {
                console.error(error);
                alert("An error occurred while retrieving employee details.");
            }
        });
    });
});


$(document).ready(function() {
    $(".retrieve_update_data").submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Serialize the form data into a format that can be sent via AJAX
        let formData = $(this).serialize();

        // Make an AJAX request to update the employee
        $.ajax({
            type: "POST",
            url: "/update_employee", // Update the URL as needed
            data: formData,
            success: function(response) {
                if (response.success) {
                    alert(response.message); // Show a success message
                    // You can update other elements or perform additional actions here
                } else {
                    alert(response.message); // Show an error message
                }
            },
            error: function(error) {
                console.error(error);
            }
        });
    });    
});

addEventListener('DOMContentLoaded', function(){
    const employeeSearchForm = document.getElementById('employeeSearchForm');
    const searchInput = document.getElementById('search_id');

    employeeSearchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    let searchValue = searchInput.value;
    
    if (searchValue) {
            // alert(searchValue);
            const searchURL = `/view_employee/${searchValue}`;
            // // display in same window but reloads page
            // window.location.href = searchURL;

            // // Open searchURL in a new window
            // window.open(searchURL, '_blank');

            const popupWidth = 900;
            const popupHeight = 600;

            const screenWidth = window.screen.availWidth;
            const screenHeight = window.screen.availHeight;

            // Calculate adjusted dimensions to fit within the screen
            const adjustedWidth = Math.min(popupWidth, screenWidth);
            const adjustedHeight = Math.min(popupHeight, screenHeight);

            // Calculate the left and top positions to center the popup
            const leftPosition = (screenWidth - adjustedWidth) / 2;
            const topPosition = (screenHeight - adjustedHeight) / 2;

            // Define the final popup features
            const popupFeatures = `width=${adjustedWidth}, height=${adjustedHeight}, left=${leftPosition}, top=${topPosition}, resizable=yes, scrollbars=yes`;
            // Open searchURL in a pop-up window
            window.open(searchURL, 'popupWindow', popupFeatures);
    }
    else {
        alert('Please enter an employee ID');
    }
    });
})

// works as the code below but must be place directly on the html file
// function closeOrRedirect() {
//     if (window.opener) {
//         // This is a popup window
//         window.close();
//     } else {
//         // This is not a popup window, redirect to another page
//         window.location.href = "{{ url_for('main.manage_emp') }}";
//     }
// }
document.addEventListener('DOMContentLoaded', function() {
    const closeOrRedirectLink = document.getElementById('closeOrRedirectLink');
    
    closeOrRedirectLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link click behavior
        // Get the data-url attribute value
        const urlToRedirect = closeOrRedirectLink.getAttribute('data-url');

        if (window.opener) {
            // This is a popup window
            window.close();
        } else {
            // This is not a popup window, redirect to another page (data-url)
            window.location.href = urlToRedirect
        }
    });

    // document.querySelector('.flash_messages').classList.add('hidden'); // To hide the element
    // document.querySelector('.flash_messages').classList.remove('hidden'); // To show the element

      
});

document.addEventListener('DOMContentLoaded', function() {
const inputFields = document.querySelectorAll(".row input");

    inputFields.forEach((inputField) => {
        inputField.addEventListener("focus", () => {
            inputField.classList.add("active");
        });
    
        inputField.addEventListener("blur", () => {
            inputField.classList.remove("active");
        });
    })
}); 