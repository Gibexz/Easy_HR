// addEventListener('DOMContentLoaded', function(){
//     const employeeSearchForm = document.getElementById('employeeSearchForm');
//     const searchInput = document.getElementById('search_id');

//     employeeSearchForm.addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent the default form submission
//     let searchValue = searchInput.value;
    
//     if (searchValue) {
//             // alert(searchValue);
//             const searchURL = `/view_employee/${searchValue}`;
//             // // display in same window but reloads page
//             // window.location.href = searchURL;

//             // // Open searchURL in a new window
//             // window.open(searchURL, '_blank');

//             const popupWidth = 900;
//             const popupHeight = 600;
//             const popupFeatures = `width=${popupWidth}, height=${popupHeight}, resizable=yes, scrollbars=yes`;

//             // Open searchURL in a pop-up window
//             window.open(searchURL, 'popupWindow', popupFeatures);
//     }
//     else {
//         alert('Please enter an employee ID');
//     }
//     });
// })

