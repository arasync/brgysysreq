document.addEventListener('DOMContentLoaded', function () {
    updateButtonsVisibility();
    setupPagination();
    setupSearch(); // Initialize search functionality
});

const rowsPerPage = 5;
let currentPage = 1;

// Function to add a new request to the table
function addRequestToTable(name, request, date) {
    const tableBody = document.querySelector('table tbody');
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="name">${name}</td>
        <td class="request">${request}</td>
        <td class="date">${date}</td>
        <td>
            <button class="action-button approve">Approve</button>
            <button class="action-button reject">Reject</button>
        </td>
    `;
    
    tableBody.appendChild(newRow);
    updateButtonsVisibility();
    setupPagination();
}

// Function to update visibility of approve/reject buttons
function updateButtonsVisibility() {
    document.querySelectorAll('table tbody tr').forEach(row => {
        const name = row.querySelector('.name').textContent.trim();
        const request = row.querySelector('.request').textContent.trim();
        const date = row.querySelector('.date').textContent.trim();
        const approveButton = row.querySelector('.approve');
        const rejectButton = row.querySelector('.reject');
        
        if (name && request && date) {
            approveButton.style.display = 'inline-block';
            rejectButton.style.display = 'inline-block';
        } else {
            approveButton.style.display = 'none';
            rejectButton.style.display = 'none';
        }
    });
}

// Function to setup pagination
function setupPagination() {
    const tableBody = document.querySelector('table tbody');
    const rows = tableBody.querySelectorAll('tr');
    const totalPages = Math.ceil(rows.length / rowsPerPage);
    
    displayPage(currentPage, rows, totalPages);
    createPaginationControls(totalPages);
}

// Function to display the correct page
function displayPage(page, rows, totalPages) {
    rows.forEach((row, index) => {
        row.style.display = (index >= (page - 1) * rowsPerPage && index < page * rowsPerPage) ? 'table-row' : 'none';
    });
    
    document.querySelector('.prev-page').disabled = (page === 1);
    document.querySelector('.next-page').disabled = (page === totalPages);
}

// Function to create pagination controls
function createPaginationControls(totalPages) {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';
    
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.classList.add('prev-page');
    prevButton.disabled = (currentPage === 1);
    prevButton.addEventListener('click', () => changePage(currentPage - 1));
    paginationContainer.appendChild(prevButton);
    
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('page-number');
        if (i === currentPage) pageButton.classList.add('active');
        
        pageButton.addEventListener('click', () => changePage(i));
        paginationContainer.appendChild(pageButton);
    }
    
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.classList.add('next-page');
    nextButton.disabled = (currentPage === totalPages);
    nextButton.addEventListener('click', () => changePage(currentPage + 1));
    paginationContainer.appendChild(nextButton);
}

// Function to change page
function changePage(page) {
    const tableBody = document.querySelector('table tbody');
    const rows = tableBody.querySelectorAll('tr');
    const totalPages = Math.ceil(rows.length / rowsPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayPage(currentPage, rows, totalPages);
    setupPagination();
}

// Function to setup search functionality
function setupSearch() {
    const searchInput = document.querySelector('#search');
    
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('table tbody tr');
        
        rows.forEach(row => {
            const name = row.querySelector('.name').textContent.toLowerCase();
            const request = row.querySelector('.request').textContent.toLowerCase();
            
            if (name.includes(query) || request.includes(query)) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        });
    });
}
