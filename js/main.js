'use strict';
const root = document.documentElement;
const themeButton = document.getElementById('theme-toggle');
const savedTheme = (() => { try { return localStorage.getItem('portfolio-theme'); } catch { return null; } })();
if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;
function isDark() { return root.dataset.theme === 'dark' || (!root.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches); }
function updateThemeButton() { const dark = isDark(); themeButton.textContent = dark ? 'Light mode' : 'Dark mode'; themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme'); themeButton.setAttribute('aria-pressed', String(dark)); }
themeButton.addEventListener('click', () => { const next = isDark() ? 'light' : 'dark'; root.dataset.theme = next; try { localStorage.setItem('portfolio-theme',next); } catch {} updateThemeButton(); });
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeButton);
updateThemeButton();
const filters = document.querySelectorAll('.filter-button');
const projects = document.querySelectorAll('.project-card');
filters.forEach(button => button.addEventListener('click', () => { const category = button.dataset.filter; let shown = 0; filters.forEach(item => { const selected = item === button; item.classList.toggle('is-active', selected); item.setAttribute('aria-pressed',String(selected)); }); projects.forEach(card => { const visible = category === 'all' || card.dataset.category === category; card.hidden = !visible; if(visible) shown++; }); document.getElementById('filter-status').textContent = shown + ' projects displayed.'; }));
const dialog = document.getElementById('image-dialog');
const largeImage = document.getElementById('dialog-image');
let lastTrigger;
document.querySelectorAll('.gallery-item').forEach(button => button.addEventListener('click', () => { lastTrigger = button; largeImage.src = button.dataset.src; largeImage.alt = button.querySelector('img').alt; document.getElementById('dialog-title').textContent = button.dataset.caption; dialog.showModal(); }));
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if(event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { if(lastTrigger) lastTrigger.focus(); });
const form = document.getElementById('contact-form');
form.addEventListener('submit',event => { event.preventDefault(); const status = document.getElementById('form-status'); if (!form.checkValidity()) { status.textContent = 'Please enter your name, a valid email, and a message of at least 10 characters.'; form.reportValidity(); return; } status.textContent = 'Your form looks good! This is a demo, so no message was sent.'; form.reset(); });
document.getElementById('year').textContent = new Date().getFullYear();
