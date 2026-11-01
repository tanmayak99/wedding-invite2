# Generates public/music/theme.mp3 (original, royalty-free). Needs numpy + ffmpeg.
import numpy as np, wave, subprocess
SR, T = 44100, 24.0
N = int(SR * T); out = np.zeros(N); rng = np.random.default_rng(7)
bpm = 96; b = 60 / bpm
hz = lambda n: 440 * 2 ** ((n - 69) / 12)
def add(s, at):
    i = int(at * SR); n = min(len(s), N - i)
    if n > 0: out[i:i + n] += s[:n]
def pluck(f, d, a):
    t = np.arange(int(SR * d)) / SR
    return a * sum((1 / k) * np.sin(2 * np.pi * f * k * t * (1 + .0008 * k)) * np.exp(-t * (2.2 + 1.4 * k)) for k in range(1, 9))
def pad(f, d, a=.06):
    t = np.arange(int(SR * d)) / SR; e = np.minimum(1, t / 1.5) * np.minimum(1, (d - t) / 1.5)
    return a * e * (np.sin(2 * np.pi * f * t) + .5 * np.sin(4 * np.pi * f * t + .3) + .25 * np.sin(6 * np.pi * f * t))
for i in range(int(T / b)): add(pluck(hz([50, 57, 57, 38][i % 4]), 3.5, .16), i * b)          # tanpura drone
for s in range(0, 24, 6):
    for n in (62, 66, 69): add(pad(hz(n), 7), s)                                              # soft D-major pad
A = [66, 69, 71, 69, 66, 64, 62, 64]; B = [69, 71, 74, 71, 69, 66, 64, 62]
for ph, p in enumerate([A, A, B, A, B]):                                                       # melody (D major pentatonic)
    for j, n in enumerate(p):
        at = (4 + ph * 8 + j) * b
        if at < T - 1: add(pluck(hz(n), 1.6, .30), at)
for e in range(int(T / (b / 2))):                                                              # keherwa-style tabla
    at = e * b / 2; k = e % 8
    if k in (0, 5):
        t = np.arange(int(SR * .35)) / SR; f = 60 + 70 * np.exp(-t * 18)
        add((.55 if k == 0 else .3) * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9), at)
    elif k % 2:
        t = np.arange(int(SR * .06)) / SR; add(.07 * rng.standard_normal(len(t)) * np.exp(-t * 70), at)
for d, g in ((.28, .3), (.45, .15)):                                                           # light reverb
    out[int(d * SR):] += g * out[:N - int(d * SR)].copy()
out /= np.abs(out).max() * 1.1
fade = int(1.5 * SR); out[:fade] *= np.linspace(0, 1, fade); out[-fade:] *= np.linspace(1, 0, fade)
with wave.open("/tmp/theme.wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32000).astype(np.int16).tobytes())
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", "/tmp/theme.wav", "-b:a", "128k", "public/music/theme.mp3"], check=True)
