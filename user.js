function showPage(page) {
    document.getElementById('table-page-1').style.display = 'none';
    document.getElementById('table-page-2').style.display = 'none';
    document.getElementById('table-page-3').style.display = 'none';

    if (page === 1) {
        document.getElementById('table-page-1').style.display = 'table';
    } else if (page === 2) {
        document.getElementById('table-page-2').style.display = 'table';
    } else if (page === 3) {
        document.getElementById('table-page-3').style.display = 'table';
    }

    const buttons = document.querySelectorAll('.pagination .page-button');
    buttons.forEach(button => button.classList.remove('active'));

    if (page === 'Previous') {
        // Handle previous page logic
    } else if (page === 'Next') {
        // Handle next page logic
    } else {
        document.querySelector(`.pagination .page-button:nth-child(${page + 1})`).classList.add('active');
    }
}

function showCustomDateInput() {
    const select = document.getElementById('joined-select');
    const dateInput = document.getElementById('custom-date-input');
    if (select.value === 'custom-date') {
        dateInput.style.display = 'block';
    } else {
        dateInput.style.display = 'none';
    }
}

// Call the function to update the date input visibility on page load
document.addEventListener('DOMContentLoaded', function() {
    showCustomDateInput();
});