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

// YYYY-MM-DD in the user's local timezone (toISOString would give the UTC date)
export function localDateString(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
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

// Browsers cap the number of concurrent AudioContexts, so create one and reuse it
let sharedAudioContext: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null

  if (!sharedAudioContext) {
    sharedAudioContext = new Ctor()
  }
  if (sharedAudioContext.state === 'suspended') {
    void sharedAudioContext.resume()
  }
  return sharedAudioContext
}

export function playSound(type: 'correct' | 'incorrect' | 'tick' | 'complete'): void {
  const audioContext = getAudioContext()
  if (!audioContext) return

  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  oscillator.type = 'sine'
  oscillator.onended = () => {
    oscillator.disconnect()
    gainNode.disconnect()
  }

  const now = audioContext.currentTime

  switch (type) {
    case 'correct':
      oscillator.frequency.value = 880
      gainNode.gain.value = 0.1
      oscillator.start(now)
      oscillator.stop(now + 0.1)
      break
    case 'incorrect':
      oscillator.frequency.value = 220
      gainNode.gain.value = 0.1
      oscillator.start(now)
      oscillator.stop(now + 0.2)
      break
    case 'tick':
      oscillator.frequency.value = 440
      gainNode.gain.value = 0.05
      oscillator.start(now)
      oscillator.stop(now + 0.05)
      break
    case 'complete':
      gainNode.gain.value = 0.1
      oscillator.frequency.setValueAtTime(523, now)
      oscillator.frequency.setValueAtTime(659, now + 0.1)
      oscillator.frequency.setValueAtTime(784, now + 0.2)
      oscillator.start(now)
      oscillator.stop(now + 0.3)
      break
  }
}
