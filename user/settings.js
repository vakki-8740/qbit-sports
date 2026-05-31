function toggleDarkMode() {
    const isDark = document.getElementById('dark-mode-toggle').checked;
    if(isDark) { document.documentElement.setAttribute('data-theme', 'dark'); localStorage.setItem('arena_theme', 'dark'); document.body.style.backgroundColor = '#121212'; }
    else { document.documentElement.removeAttribute('data-theme'); localStorage.setItem('arena_theme', 'light'); document.body.style.backgroundColor = '#e5e5ea'; }
}
window.toggleDarkMode = toggleDarkMode;

function loadTheme() {
    const savedTheme = localStorage.getItem('arena_theme') || 'light';
    const toggle = document.getElementById('dark-mode-toggle');
    if(savedTheme === 'dark') { document.documentElement.setAttribute('data-theme', 'dark'); document.body.style.backgroundColor = '#121212'; if(toggle) toggle.checked = true; }
    else { document.documentElement.removeAttribute('data-theme'); document.body.style.backgroundColor = '#e5e5ea'; if(toggle) toggle.checked = false; }
}

function clearCache() {
    if(confirm("Clear all app data and reload?")) {
        localStorage.removeItem('arena_uid');
        localStorage.removeItem('arena_theme');
        window.location.reload();
    }
}
window.clearCache = clearCache;

function confirmLogout() { if(confirm("Are you sure you want to logout?")) logoutUser(); }
window.confirmLogout = confirmLogout;

function openAdminLink(type) {
    let url = "";
    if(type === 'telegram') url = window.adminSettings?.telegram;
    if(type === 'help') url = window.adminSettings?.help;
    if(url && url.trim() !== "") window.open(url, '_blank');
    else showToast("Link not updated by admin yet!", "error");
}
window.openAdminLink = openAdminLink;

async function loadSettings() {
    try { window.adminSettings = await FB.getSettings(); } catch(e) {}
}

document.addEventListener('DOMContentLoaded', () => {
    if(FB.getCurrentUid()) {
        document.getElementById('auth-page').style.display = 'none';
        document.getElementById('app-container').style.display = 'flex';
        loadTheme(); loadHeader(); loadSettings();
    } else { window.location.href = 'home.html'; }
});
