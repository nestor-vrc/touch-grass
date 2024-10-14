import { incrementCounter } from './counter';

const messages = [
  "Wow, you're really touching that grass!",
  "Look at you, being all outdoorsy!",
  "Your internet addiction is cured!",
  "Nature enthusiast level: PRO",
  "Grass: Touched. Life: Changed.",
  "You're basically a plant whisperer now.",
  "Congratulations! You've unlocked: REAL LIFE",
  "Breaking news: Local person touches grass, world shocked!",
  "404: Indoor lifestyle not found",
  "Loading outdoor skills... 100% complete!",
  "You've touched so much grass, you're practically photosynthesizing!",
  "Grass touching level: LAWN MOWER",
  "Your fingers are greener than a seasick Kermit!",
  "You're now qualified to be a professional grass toucher!",
  "Plot twist: The grass is touching YOU back!",
  "You've touched more grass than a herd of cows. Moo-ve over!",
  "Congrats! You've won a lifetime supply of... more grass to touch!",
  "Breaking: Local parks report grass shortage due to excessive touching",
  "Scientists baffled by your grass-touching abilities!",
  "You're so good at this, even the Chia Pets are jealous!"
];

const achievements = [
  "🏆 Grass Novice",
  "🌱 Sprout Whisperer",
  "🌿 Lawn Ranger",
  "🍃 Chlorophyll Connoisseur",
  "🌳 Grass Guru",
  "🏞️ Outdoor Oracle",
  "🧙‍♂️ Grass Wizard",
  "🦄 Mythical Meadow Master",
  "👽 Extraterrestrial Turf Toucher",
  "🌌 Cosmic Grass Conqueror"
];

let touchCount = 0;
let achievementCooldown = false;

const touchCountEl = document.getElementById('touchCount')!;
const messageEl = document.getElementById('message')!;
const achievementEl = document.getElementById('achievement')!;
const weatherEl = document.getElementById('weather')!;

const grassRustleAudio = new Audio('/assets/grass-rustle.mp3');

window.addEventListener('load', () => {
  const savedCount = localStorage.getItem('touchCount');
  if (savedCount) {
    touchCount = parseInt(savedCount, 10);
    updateTouchCountDisplay();
  }
});

document.getElementById('app')!.addEventListener('click', (e: MouseEvent) => {
  touchCount = incrementCounter(touchCount);
  updateTouchCountDisplay();

 
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  messageEl.textContent = randomMessage;

 
  grassRustleAudio.currentTime = 0;
  grassRustleAudio.play();

 
  createGrassEffect(e.clientX, e.clientY);

 
  localStorage.setItem('touchCount', touchCount.toString());

 
  if (touchCount % 10 === 0 && !achievementCooldown) {
    const achievement = achievements[Math.min(Math.floor(touchCount / 10) - 1, achievements.length - 1)];
    showTemporaryMessage(achievementEl, achievement);
    achievementCooldown = true;
    setTimeout(() => {
      achievementCooldown = false;
    }, 5000);
  }

 
  if (touchCount === 50) {
    showTemporaryMessage(weatherEl, "Perfect grass-touching conditions!");
  }
});

function updateTouchCountDisplay() {
  touchCountEl.textContent = `Grass touched: ${touchCount} ${touchCount === 1 ? 'time' : 'times'}`;
}

function showTemporaryMessage(el: HTMLElement, message: string) {
  el.textContent = message;
  el.style.display = 'block';
  setTimeout(() => {
    el.style.display = 'none';
  }, 3000);
}

function createGrassEffect(x: number, y: number) {
  const grass = document.createElement('div');
  grass.innerHTML = '🌿';
  grass.style.position = 'fixed';
  grass.style.left = `${x}px`;
  grass.style.top = `${y}px`;
  grass.style.fontSize = '2rem';
  grass.style.pointerEvents = 'none';
  document.body.appendChild(grass);

  setTimeout(() => {
    grass.style.transition = 'all 1s ease-out';
    grass.style.transform = `translate(${Math.random() * 100 - 50}px, ${-100 - Math.random() * 100}px) rotate(${Math.random() * 360}deg)`;
    grass.style.opacity = '0';
  }, 50);

  setTimeout(() => document.body.removeChild(grass), 1050);
}
