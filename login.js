document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Validate the username
    if (!username.includes('@') || !username.includes('.com')) {
        alert('Please enter a valid Gmail address.');
        return;
    }

    // If validation passes, redirect to the dashboard
    window.location.href = 'dashboard.html';
});