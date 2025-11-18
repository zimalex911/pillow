const characters = [
  {
    title: 'Lumbar lounge',
    short: 'Back lay',
    text: 'Lying down with pillow under the lower back for gentle support.',
    icon: '🛌',
    tones: ['#fbe4ff', '#d3b6ff'],
  },
  {
    title: 'Desk support',
    short: 'Chair sit',
    text: 'Sitting on a chair with the pillow shaping posture.',
    icon: '💺',
    tones: ['#d7f4ff', '#b6d8ff'],
  },
  {
    title: 'Head rest',
    short: 'Head',
    text: 'Classic head pillow use — soft cradle for the neck.',
    icon: '🛏️',
    tones: ['#fff4d6', '#ffd6a5'],
  },
  {
    title: 'Side sleeper',
    short: 'Side',
    text: 'Sleeping on the side with an arm sliding under the pillow.',
    icon: '🤗',
    tones: ['#e1ffe4', '#c1ffd7'],
  },
  {
    title: 'Car comfort',
    short: 'Driver',
    text: 'Driver/passenger using pillow in the car for lumbar relief.',
    icon: '🚗',
    tones: ['#e9f0ff', '#b8c9ff'],
  },
  {
    title: 'Kiddo car nap',
    short: 'Kid car',
    text: 'Child snoozing in a car seat with cushy support.',
    icon: '🧸',
    tones: ['#ffe1e1', '#ffc0cb'],
  },
  {
    title: 'Tent chill',
    short: 'Camping',
    text: 'Camping / tent vibe — pillow keeps the ground cozy.',
    icon: '⛺',
    tones: ['#e7ffd5', '#c8ef9d'],
  },
  {
    title: 'Feeding helper',
    short: 'Mom & baby',
    text: 'New mom holding newborn — pillow supports baby on her lap.',
    icon: '🤱',
    tones: ['#ffe5f4', '#ffcce6'],
  },
  {
    title: 'Reading nook',
    short: 'Book',
    text: 'Lounging with a book; pillow props elbows and neck.',
    icon: '📖',
    tones: ['#d9e5ff', '#b4c9ff'],
  },
  {
    title: 'Meditation sit',
    short: 'Zen',
    text: 'Cross-legged seat with the pillow cushioning hips.',
    icon: '🧘',
    tones: ['#f2ffe6', '#d1ffb8'],
  },
  {
    title: 'Laptop lapdesk',
    short: 'Laptop',
    text: 'Lightweight lapdesk feel for quick emails in bed.',
    icon: '💻',
    tones: ['#ffe8d6', '#ffd0a0'],
  },
  {
    title: 'Travel snooze',
    short: 'Travel',
    text: 'Plane/train seat comfort with a compact pillow hug.',
    icon: '✈️',
    tones: ['#e3f1ff', '#c3dcff'],
  },
];

const circle = document.getElementById('characters');
const detailTitle = document.getElementById('detailTitle');
const detailText = document.getElementById('detailText');
const detailCount = document.getElementById('detailCount');
const autoToggle = document.getElementById('autoToggle');
const resetBtn = document.getElementById('resetBtn');
const backdropBtn = document.getElementById('backdropBtn');

let activeIndex = 0;
let autoplay = true;
let autoTimer;

function placeCharacters() {
  const radius = 180;
  characters.forEach((char, index) => {
    const angle = (index / characters.length) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const el = document.createElement('button');
    el.className = 'char';
    el.style.setProperty('--x', `${x}px`);
    el.style.setProperty('--y', `${y}px`);
    el.style.setProperty('--tone-a', char.tones[0]);
    el.style.setProperty('--tone-b', char.tones[1]);
    el.dataset.index = index;
    el.dataset.short = char.short;
    if (char.image) {
      el.innerHTML = `<img src="${char.image}" alt="${char.title}" />`;
    } else {
      el.innerHTML = `<span class="emoji" aria-hidden="true">${char.icon}</span>`;
    }
    el.style.left = `calc(50% + ${x}px)`;
    el.style.top = `calc(50% + ${y}px)`;
    el.addEventListener('click', () => focusCharacter(index, true));
    circle.appendChild(el);
  });
}

function updateDetail(index) {
  const char = characters[index];
  detailTitle.textContent = char.title;
  detailText.textContent = char.text;
  detailCount.textContent = `${index + 1} / ${characters.length}`;
}

function focusCharacter(index, userTriggered = false) {
  activeIndex = index;
  document.querySelectorAll('.char').forEach((el, i) => {
    el.classList.toggle('active', i === index);
    el.classList.toggle('faded', i !== index);
    if (i !== index) {
      const x = el.style.getPropertyValue('--x');
      const y = el.style.getPropertyValue('--y');
      el.style.left = `calc(50% + ${x})`;
      el.style.top = `calc(50% + ${y})`;
    } else {
      el.style.left = '50%';
      el.style.top = '50%';
    }
  });
  document.querySelector('.pillow').style.transform = 'translate(-50%, -50%) scale(1)';
  updateDetail(index);
  if (userTriggered && autoplay) {
    stopAuto();
  }
}

function resetView() {
  document.querySelectorAll('.char').forEach((el) => {
    const x = el.style.getPropertyValue('--x');
    const y = el.style.getPropertyValue('--y');
    el.classList.remove('active', 'faded');
    el.style.left = `calc(50% + ${x})`;
    el.style.top = `calc(50% + ${y})`;
  });
  detailTitle.textContent = 'Pick a scene';
  detailText.textContent = 'Tap around the clock to see how the pillow works for each person.';
  detailCount.textContent = '';
  document.querySelector('.pillow').style.transform = 'translate(-50%, -50%) scale(1.05)';
}

function startAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => {
    activeIndex = (activeIndex + 1) % characters.length;
    focusCharacter(activeIndex);
  }, 3200);
}

function stopAuto() {
  clearInterval(autoTimer);
}

function init() {
  placeCharacters();
  resetView();
  focusCharacter(0);
  startAuto();

  autoToggle.addEventListener('change', (e) => {
    autoplay = e.target.checked;
    if (autoplay) {
      startAuto();
    } else {
      stopAuto();
    }
  });

  resetBtn.addEventListener('click', () => {
    stopAuto();
    resetView();
  });

  backdropBtn.addEventListener('click', () => {
    resetView();
    stopAuto();
  });
}

document.addEventListener('DOMContentLoaded', init);
