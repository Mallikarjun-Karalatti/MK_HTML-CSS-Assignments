const body = document.body;
const btnContainer = document.getElementById('btnContainer');
const changeBgBtn = document.getElementById('changeBgBtn');
const colorBtns = document.querySelectorAll('.btn-container button[data-color]');
const customColorInput = document.getElementById('customColorInput');
const applyCustomColorBtn = document.getElementById('applyCustomColor');

let currentColor = '';

function applyColor(color) {
  if (color === currentColor) return;
  currentColor = color;
  body.style.backgroundColor = color;

  // Toggle UI
  btnContainer.classList.add('hidden');
  changeBgBtn.classList.remove('hidden');
}

// Preset buttons
colorBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    applyColor(btn.dataset.color);
  });
});

// Custom color apply
applyCustomColorBtn.addEventListener('click', () => {
  const value = customColorInput.value.trim();

  if (!isValidColor(value)) {
    alert('Please enter a valid HEX or RGB color');
    return;
  }

  applyColor(value);
  customColorInput.value = '';
});

// Show controls again
changeBgBtn.addEventListener('click', () => {
  btnContainer.classList.remove('hidden');
  changeBgBtn.classList.add('hidden');
});

// ✅ Color validation (HEX + RGB)
function isValidColor(color) {
  const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  const rgbRegex =
    /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

  if (hexRegex.test(color)) return true;

  const match = color.match(rgbRegex);
  if (!match) return false;

  return match.slice(1).every(num => Number(num) >= 0 && Number(num) <= 255);
}

