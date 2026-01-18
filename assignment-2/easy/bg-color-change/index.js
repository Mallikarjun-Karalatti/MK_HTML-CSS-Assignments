const body = document.body;
const btnContainer = document.getElementById('btnContainer');
const changeBgBtn = document.getElementById('changeBgBtn');
const colorBtns = document.querySelectorAll('.btn-container button');

let currentColor = '';

colorBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const color = btn.dataset.color;
    if (color === currentColor) return;

    currentColor = color;
    body.style.backgroundColor = color;

    // Hide color buttons, show Change BG button
    btnContainer.classList.add('hidden');
    changeBgBtn.classList.remove('hidden');
  });
});

// Show color buttons again
changeBgBtn.addEventListener('click', () => {
  btnContainer.classList.remove('hidden');
  changeBgBtn.classList.add('hidden');
});
