document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Validate the email
    if (!email.includes('@') || !email.includes('.com')) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate the password length
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }
    if (password.length > 50) {
        alert("Password is too long.");
        return;
    }

    // Validate that the password has at least one digit
    if (password.search(/\d/) === -1) {
        alert("Password must contain at least one digit.");
        return;
    }

    // Validate that the password has at least one letter
    if (password.search(/[a-zA-Z]/) === -1) {
        alert("Password must contain at least one letter.");
        return;
    }
    
    // Validate that the password has at least one special character from a defined set
    if (!/[!@#$%^&*()_+\.\,\;\:]/.test(password)) {
        alert("Password must contain at least 1 special character.");
        return;
    }

    // Ensure the password does not contain any invalid characters
    if (password.search(/[^a-zA-Z0-9!@#$%^&*()_+\.\,\;\:]/) !== -1) {
        alert("Password contains invalid characters.");
        return;
    }

    // If validation passes, redirect to the dashboard
    window.location.href = 'dashboard.html';
});

// Toggle password visibility
document.addEventListener('DOMContentLoaded', (event) => {
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    togglePassword.addEventListener('click', () => {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye-slash');
    });
});

