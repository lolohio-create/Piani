const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const noteFrequencies = {
  "C": 261.63,
  "C#": 277.18,
  "D": 293.66,
  "D#": 311.13,
  "E": 329.63,
  "F": 349.23,
  "F#": 369.99,
  "G": 392.00,
  "G#": 415.30,
  "A": 440.00,
  "A#": 466.16,
  "B": 493.88,
  "C2": 523.25
};

function playNote(note) {
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = noteFrequencies[note];
  oscillator.connect(gain);
  gain.connect(audioCtx.destination);
  oscillator.start();
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
  oscillator.stop(audioCtx.currentTime + 1);
}

document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('mousedown', () => {
    const note = key.dataset.note;
    playNote(note);
    key.classList.add('active');
  });
  
  key.addEventListener('mouseup', () => {
    key.classList.remove('active');
  });
  
  key.addEventListener('mouseleave', () => {
    key.classList.remove('active');
  });
});

const keyMap = {
  'a': 'C', 'w': 'C#',
  's': 'D', 'e': 'D#',
  'd': 'E',
  'f': 'F', 't': 'F#',
  'g': 'G', 'y': 'G#',
  'h': 'A', 'u': 'A#',
  'j': 'B',
  'k': 'C2'
};

document.addEventListener('keydown', e => {
  const note = keyMap[e.key.toLowerCase()];
  if (note) {
    playNote(note);
    const key = document.querySelector(`[data-note="${note}"]`);
    if (key) key.classList.add('active');
  }
});

document.addEventListener('keyup', e => {
  const note = keyMap[e.key.toLowerCase()];
  if (note) {
    const key = document.querySelector(`[data-note="${note}"]`);
    if (key) key.classList.remove('active');
  }
});