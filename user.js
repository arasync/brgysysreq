document.addEventListener("DOMContentLoaded", function () {
    const userTableBody = document.querySelector("#user-table tbody");
    const popup = document.getElementById("no-user-popup");
    const searchInput = document.querySelector(".search-container input");
    const paginationContainer = document.querySelector(".pagination");
    const usersPerPage = 8; // Number of users per page
    let users = [];
    let currentPage = 1;
    let filteredUsers = null; // Track filtered users for search

    // Function to display users
    function displayUsers(data = users) {
        userTableBody.innerHTML = "";
        let dataToDisplay = filteredUsers || data;

        if (dataToDisplay.length === 0) {
            popup.style.display = "block"; // Show pop-up if no users
        } else {
            popup.style.display = "none"; // Hide pop-up if users exist

            let start = (currentPage - 1) * usersPerPage;
            let end = start + usersPerPage;
            let paginatedUsers = dataToDisplay.slice(start, end);

            paginatedUsers.forEach((user, index) => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.fullName}</td>
                    <td>${user.email}</td>
                    <td>${user.address}</td>
                    <td>${user.contact}</td>
                    <td><b>Joined</b></td> 
                    <td>
                        <div class="action-menu">
                            <button class="menu-btn" onclick="toggleDropdown(${index})">⋮</button>
                            <div class="dropdown" id="dropdown-${index}">
                                <button class="edit-btn" onclick="editUser(${index})">Edit</button>
                                <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
                            </div>
                        </div>
                    </td>
                `;
                userTableBody.appendChild(row);
            });
        }
        updatePagination(dataToDisplay);
    }

    // Function to add a user
    function addUser(fullName, email, address, contact) {
        users.push({ fullName, email, address, contact });
        filteredUsers = null; // Reset filtered users
        currentPage = 1; // Reset pagination
        displayUsers();
    }

    // Function to delete a user
    function deleteUser(index) {
        let actualIndex = (currentPage - 1) * usersPerPage + index;
        users.splice(actualIndex, 1);
        filteredUsers = null; // Reset filtered users
        if (currentPage > Math.ceil(users.length / usersPerPage)) {
            currentPage = Math.max(1, currentPage - 1); // Adjust page if needed
        }
        displayUsers();
    }

    // Function to edit a user
    function editUser(index) {
        let actualIndex = (currentPage - 1) * usersPerPage + index;
        let newName = prompt("Enter new full name:", users[actualIndex].fullName);
        if (newName && newName.trim() !== "") {
            users[actualIndex].fullName = newName.trim();
            displayUsers();
        }
    }

    // Function to toggle dropdown menu
    window.toggleDropdown = function (index) {
        document.querySelectorAll(".dropdown").forEach((menu, i) => {
            menu.style.display = i === index ? "block" : "none";
        });

        document.addEventListener("click", function closeDropdown(event) {
            if (!event.target.closest(".action-menu")) {
                document.querySelectorAll(".dropdown").forEach((menu) => {
                    menu.style.display = "none";
                });
                document.removeEventListener("click", closeDropdown);
            }
        });
    };

    // Pagination Logic
    function updatePagination(data = users) {
        paginationContainer.innerHTML = "";

        let totalPages = Math.ceil(data.length / usersPerPage);
        if (totalPages <= 1) return;

        let prevButton = document.createElement("button");
        prevButton.textContent = "Previous";
        prevButton.classList.add("page-button");
        prevButton.onclick = () => goToPage(currentPage - 1);
        prevButton.disabled = currentPage === 1;
        paginationContainer.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
            let button = document.createElement("button");
            button.classList.add("page-button");
            button.textContent = i;
            button.onclick = () => goToPage(i);
            if (i === currentPage) button.classList.add("active");
            paginationContainer.appendChild(button);
        }

        let nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.classList.add("page-button");
        nextButton.onclick = () => goToPage(currentPage + 1);
        nextButton.disabled = currentPage === totalPages;
        paginationContainer.appendChild(nextButton);
    }

    function goToPage(page) {
        if (page < 1 || page > Math.ceil(users.length / usersPerPage)) return;
        currentPage = page;
        displayUsers();
    }

    // Search Function
    searchInput.addEventListener("input", function () {
        let filter = searchInput.value.toLowerCase();
        filteredUsers = users.filter((user) =>
            user.fullName.toLowerCase().includes(filter) ||
            user.email.toLowerCase().includes(filter) ||
            user.address.toLowerCase().includes(filter) ||
            user.contact.toLowerCase().includes(filter)
        );

        currentPage = 1; // Reset pagination for filtered results
        displayUsers(filteredUsers);
    });

    // Show pop-up on page load if no users are registered
    if (users.length === 0) {
        popup.style.display = "block";
    }

    // Close pop-up function
    window.closePopup = function () {
        popup.style.display = "none";
    };
});
