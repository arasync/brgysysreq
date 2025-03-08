document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('myPieChart').getContext('2d');

    // Initial data with all values set to zero
    const initialData = [0, 0, 0]; // Total, Pending & Approved

    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Total Requests', 'Pending', 'Approved'],
            datasets: [{
                data: initialData,
                backgroundColor: ['#6181D6', '#BDBDBD', '#48742C'], // Blue (Total), Gray (Pending), Green (Approved)
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                    }
                }
            }
        }
    });

    // Function to get counts from the status table
    function getStatusCounts() {
        let pendingCount = document.querySelectorAll('.status[data-status="pending"]').length;
        let approvedCount = document.querySelectorAll('.status[data-status="approved"]').length;
        let totalRequests = document.querySelectorAll('.status').length;
        return { totalRequests, pendingCount, approvedCount };
    }

    // Function to update the dashboard counts and chart
    function updateDashboard() {
        const { totalRequests, pendingCount, approvedCount } = getStatusCounts();

        // Update displayed totals
        document.getElementById('totalRequests').textContent = totalRequests;
        document.getElementById('pendingRequests').textContent = pendingCount;
        document.getElementById('approvedRequests').textContent = approvedCount;

        // Update chart data
        myPieChart.data.datasets[0].data = [totalRequests, pendingCount, approvedCount];
        myPieChart.update();
    }

    // Initial update on page load
    updateDashboard();

    // Observe changes in the status table and update dashboard
    const observer = new MutationObserver(updateDashboard);
    observer.observe(document.querySelector('#statusTableBody'), { childList: true, subtree: true });

    // Expose function globally so status.js can trigger it
    window.updateDashboard = updateDashboard;
});
