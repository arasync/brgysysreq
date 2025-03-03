document.addEventListener('DOMContentLoaded', function() {
    updateButtonsVisibility();
});

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
