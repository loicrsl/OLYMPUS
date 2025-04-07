// src/utils/audioManager.js

let clickAudio;

export function playClickSound() {
  if (!clickAudio) {
    clickAudio = new Audio('/assets/audio/ui-click.mp3');
    clickAudio.preload = 'auto';
  }
  clickAudio.currentTime = 0;
  clickAudio.play();
}
