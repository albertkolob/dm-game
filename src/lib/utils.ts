import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function vibrate(pattern: number | number[] = 10): void {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

export function playSound(type: 'correct' | 'incorrect' | 'tick' | 'complete'): void {
  // Audio context for web audio API sounds
  const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  switch (type) {
    case 'correct':
      oscillator.frequency.value = 880
      oscillator.type = 'sine'
      gainNode.gain.value = 0.1
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.1)
      break
    case 'incorrect':
      oscillator.frequency.value = 220
      oscillator.type = 'sine'
      gainNode.gain.value = 0.1
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.2)
      break
    case 'tick':
      oscillator.frequency.value = 440
      oscillator.type = 'sine'
      gainNode.gain.value = 0.05
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.05)
      break
    case 'complete':
      oscillator.frequency.value = 523
      oscillator.type = 'sine'
      gainNode.gain.value = 0.1
      oscillator.start()
      setTimeout(() => {
        oscillator.frequency.value = 659
      }, 100)
      setTimeout(() => {
        oscillator.frequency.value = 784
      }, 200)
      oscillator.stop(audioContext.currentTime + 0.3)
      break
  }
}
