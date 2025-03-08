document.addEventListener("DOMContentLoaded", function () {
    const userTableBody = document.querySelector("#user-table tbody");
    const popup = document.getElementById("no-user-popup");
    const searchInput = document.querySelector(".search-container input");
    const usersPerPage = 5; // Number of users per page
    let users = [];
    let currentPage = 1;

    // Function to display users
    function displayUsers() {
        userTableBody.innerHTML = "";

        if (users.length === 0) {
            popup.style.display = "block"; // Show the pop-up
        } else {
            popup.style.display = "none"; // Hide the pop-up

            let start = (currentPage - 1) * usersPerPage;
            let end = start + usersPerPage;
            let paginatedUsers = users.slice(start, end);

            paginatedUsers.forEach((user) => {
                let row = `<tr>
                    <td>${user.fullName}</td>
                    <td>${user.email}</td>
                    <td>${user.address}</td>
                    <td>${user.contact}</td>
                </tr>`;
                userTableBody.innerHTML += row;
            });
        }
        updatePagination();
    }

    // Function to add a user
    function addUser(fullName, email, address, contact) {
        users.push({ fullName, email, address, contact });
        displayUsers();
    }

    // Pagination Logic
    function updatePagination() {
        const paginationContainer = document.querySelector(".pagination");
        paginationContainer.innerHTML = "";

        let totalPages = Math.ceil(users.length / usersPerPage);
        
        for (let i = 1; i <= totalPages; i++) {
            let button = document.createElement("button");
            button.classList.add("page-button");
            button.textContent = i;
            button.onclick = () => goToPage(i);
            if (i === currentPage) button.classList.add("active");
            paginationContainer.appendChild(button);
        }
    }

    function goToPage(page) {
        if (page < 1 || page > Math.ceil(users.length / usersPerPage)) return;
        currentPage = page;
        displayUsers();
    }

    // Search Function
    searchInput.addEventListener("input", function () {
        let filter = searchInput.value.toLowerCase();
        let filteredUsers = users.filter((user) =>
            user.fullName.toLowerCase().includes(filter) ||
            user.email.toLowerCase().includes(filter) ||
            user.address.toLowerCase().includes(filter) ||
            user.contact.toLowerCase().includes(filter)
        );

        userTableBody.innerHTML = "";
        if (filteredUsers.length === 0) {
            userTableBody.innerHTML = `<tr><td colspan="4">No matching users found</td></tr>`;
        } else {
            filteredUsers.forEach((user) => {
                let row = `<tr>
                    <td>${user.fullName}</td>
                    <td>${user.email}</td>
                    <td>${user.address}</td>
                    <td>${user.contact}</td>
                </tr>`;
                userTableBody.innerHTML += row;
            });
        }
    });

    // Close pop-up function
    function closePopup() {
        popup.style.display = "none";
    }
    window.closePopup = closePopup;
});
