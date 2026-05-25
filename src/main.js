import './style.css';
import dayjs from 'dayjs';

const form = document.getElementById('birthday-form');
const dialog = document.getElementById('result-dialog');
const dialogContent = document.getElementById('dialog-content');
const closeBtn = document.getElementById('close-dialog');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const dateInput = document.getElementById('birth-date').value;
  if (!dateInput) return;

  const birthDate = dayjs(dateInput).startOf('day');
  const today = dayjs().startOf('day');

  if (!birthDate.isValid()) {
    alert('Podano nieprawidłową datę!');
    return;
  }

  if (birthDate.isAfter(today)) {
    dialogContent.innerHTML = `<p class="text-amber-400">Wygląda na to, że jeszcze się nie urodziłeś! 😉</p>`;
    dialog.showModal();
    return;
  }

  const daysPassed = today.diff(birthDate, 'day');
  
  dialogContent.innerHTML = `
    <p class="mb-2 text-sm text-slate-400">Od Twoich narodzin minęło:</p>
    <p class="text-3xl font-extrabold text-blue-400 my-3">${daysPassed}</p>
    <p class="text-sm text-slate-400">dni.</p>
  `;
  dialog.showModal();
});

closeBtn.addEventListener('click', () => dialog.close());

dialog.addEventListener('click', (e) => {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
});