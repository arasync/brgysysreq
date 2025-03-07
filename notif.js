function showTab(tabName) {
    // Remove the active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Add the active class to the clicked tab
    const activeTab = document.querySelector(.tab[onclick="showTab('${tabName}')"]);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    // Show the corresponding tab content (if applicable)
    // const tabContents = document.querySelectorAll('.tab-content');
    // tabContents.forEach(content => {
    //     content.style.display = 'none';
    // });
    // const activeContent = document.getElementById(tabName);
    // if (activeContent) {
    //     activeContent.style.display = 'block';
    // }
}