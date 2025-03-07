document.addEventListener('DOMContentLoaded', function () {
    updateStatusTable();
});

// Function to update the status table dynamically from the request table
function updateStatusTable() {
    const requestTableBody = document.querySelector("#requestTableBody"); // Source table
    const statusTableBody = document.getElementById("statusTableBody"); // Target table
    const pagination = document.getElementById("pagination");

    statusTableBody.innerHTML = ""; // Clear previous data

    let requestRows = requestTableBody.querySelectorAll("tr");

    if (requestRows.length === 0) {
        pagination.style.display = "none"; // Hide pagination if no data
    } else {
        pagination.style.display = "flex"; // Show pagination if there is data
    }

    requestRows.forEach(row => {
        const name = row.querySelector(".name").textContent.trim();
        const request = row.querySelector(".request").textContent.trim();
        const date = row.querySelector(".date").textContent.trim();
        const status = row.querySelector(".status").textContent.trim();

        let statusRow = document.createElement("tr");
        statusRow.innerHTML = `
            <td>${name}</td>
            <td>${request}</td>
            <td>${date}</td>
            <td class="status ${status.toLowerCase()}" data-status="${status.toLowerCase()}">${status}</td>
        `;
        statusTableBody.appendChild(statusRow);
    });

    //  Call dashboard update after updating the status table
    if (typeof updateDashboard === "function") {
        updateDashboard();
    }
}

// Function to filter the status table
function filterStatusTable() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let tableRows = document.querySelectorAll("#statusTableBody tr");
    
    let hasVisibleRows = false;

    tableRows.forEach(row => {
        let rowText = row.textContent.toLowerCase();
        if (rowText.includes(input)) {
            row.style.display = "";
            hasVisibleRows = true;
        } else {
            row.style.display = "none";
        }
    });

    // Hide pagination if no results match the search
    document.getElementById("pagination").style.display = hasVisibleRows ? "flex" : "none";
}

// Observer to watch for changes in the request table and update status table
const observer = new MutationObserver(updateStatusTable);
observer.observe(document.querySelector("#requestTableBody"), { childList: true, subtree: true });

// Expose functions globally
window.updateStatusTable = updateStatusTable;
window.filterStatusTable = filterStatusTable;
