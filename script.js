const characters = Array.from({ length: 20 }).map((_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return {
    title: `Pose ${num}`,
    short: `Pose ${num}`,
    text: 'Drop your provided pose image into assets/poses and it will show here.',
    image: `assets/poses/pose-${num}.svg`,
    tones: [`hsl(${(i * 18) % 360} 80% 92%)`, `hsl(${(i * 18 + 35) % 360} 75% 82%)`],
  };
});

const totalDemoDuration = 30000; // 30 seconds for full circle
const perSlot = totalDemoDuration / characters.length;
const moveDuration = perSlot / 3;
const holdDuration = perSlot / 3;
const returnDuration = perSlot - moveDuration - holdDuration;

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
const stepTimers = [];
const buttons = [];

function clearStepTimers() {
  while (stepTimers.length) {
    clearTimeout(stepTimers.pop());
  }
}

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

    const img = document.createElement('img');
    img.src = char.image;
    img.alt = char.title;
    img.loading = 'lazy';
    img.onerror = () => {
      img.replaceWith(Object.assign(document.createElement('span'), {
        className: 'fallback',
        textContent: `#${index + 1}`,
      }));
    };

    el.appendChild(img);
    el.addEventListener('click', () => focusCharacter(index, true));
    circle.appendChild(el);
    buttons.push(el);
  });
}

function updateDetail(index) {
  const char = characters[index];
  detailTitle.textContent = char.title;
  detailText.textContent = `Move-in: ${Math.round(moveDuration)}ms · Hold: ${Math.round(holdDuration)}ms · Return: ${Math.round(returnDuration)}ms (30s full loop).`;
  detailCount.textContent = `${index + 1} / ${characters.length}`;
}

function focusCharacter(index, userTriggered = false) {
  activeIndex = index;
  clearStepTimers();

  buttons.forEach((el, i) => {
    el.classList.toggle('dim', i !== index);
  });

  const target = buttons[index];
  target.style.setProperty('--move-ms', `${moveDuration}ms`);
  target.classList.add('to-center');
  target.classList.remove('returning', 'hold');
  updateDetail(index);

  // Hold state after moving in
  stepTimers.push(setTimeout(() => {
    target.classList.add('hold');
  }, moveDuration));

  // Start returning
  stepTimers.push(setTimeout(() => {
    target.style.setProperty('--move-ms', `${returnDuration}ms`);
    target.classList.remove('hold', 'to-center');
    target.classList.add('returning');
    buttons.forEach((el) => el.classList.remove('dim'));
  }, moveDuration + holdDuration));

  // Cleanup return state
  stepTimers.push(setTimeout(() => {
    target.classList.remove('returning');
  }, moveDuration + holdDuration + returnDuration));

  if (userTriggered && autoplay) {
    stopAuto();
  }
}

function resetView() {
  clearStepTimers();
  buttons.forEach((el) => {
    el.classList.remove('to-center', 'hold', 'returning', 'dim');
    el.style.removeProperty('--move-ms');
  });
  detailTitle.textContent = 'Pick a scene';
  detailText.textContent = 'Tap around the clock to see how each pose comes to the center.';
  detailCount.textContent = '';
}

function startAuto() {
  stopAuto();
  autoplay = true;
  autoTimer = setInterval(() => {
    activeIndex = (activeIndex + 1) % characters.length;
    focusCharacter(activeIndex);
  }, perSlot);
}

function stopAuto() {
  autoplay = false;
  clearInterval(autoTimer);
}

function init() {
  placeCharacters();
  resetView();
  focusCharacter(0);
  startAuto();

  autoToggle.checked = true;
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
    stopAuto();
    resetView();
  });
}

document.addEventListener('DOMContentLoaded', init);
