async function loadComponent(id, file) {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
}

window.addEventListener('DOMContentLoaded', () => {
    loadComponent('navbar', '../components/navbar.html');
    loadComponent('sidebar', '../components/sidebar.html');
    loadComponent('footer', '../components/footer.html');
});
