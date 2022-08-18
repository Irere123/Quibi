import create from "zustand";
import { combine } from "zustand/middleware";

export const soundEffects = {
  quizChatMention: "roomChatMention.wav",
  quizInvite: "roomInvite.wav",
};

export type PossibleSoundEffect = keyof typeof soundEffects;

const keyToLocalStorageKey = (s: string) => `@sound-effect/${s}`;

function getInitialSettings() {
  const soundEffectSettings: Record<PossibleSoundEffect, boolean> = {
    quizChatMention: true,
    quizInvite: true,
  };

  try {
    Object.keys(soundEffects).forEach((key) => {
      const v = localStorage.getItem(keyToLocalStorageKey(key)) || "";
      soundEffectSettings[key as PossibleSoundEffect] = !v || v === "true";
    });
  } catch {}

  return soundEffectSettings;
}

export const useSoundEffectStore = create(
  combine(
    {
      audioRefMap: {} as Record<string, HTMLAudioElement>,
      settings: getInitialSettings(),
    },
    (set, get) => ({
      setSetting: (key: PossibleSoundEffect, value: boolean) => {
        try {
          localStorage.setItem(keyToLocalStorageKey(key), value.toString());
        } catch {}
        set((x) => ({
          settings: { ...x.settings, [key]: value },
        }));
      },
      playSoundEffect: (se: keyof typeof soundEffects, force = false) => {
        const { audioRefMap, settings } = get();
        if (force || settings[se]) {
          audioRefMap[se]?.play();
        }
      },
      add: (key: string, audio: HTMLAudioElement) =>
        set((s) => ({ audioRefMap: { ...s.audioRefMap, [key]: audio } })),
    })
  )
);
