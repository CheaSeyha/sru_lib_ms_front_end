// src/utils/soundUtils.js
export const getSoundState = () => {
    return JSON.parse(localStorage.getItem('soundEnabled')) ?? true; // Default to true if not set
};

export const setSoundState = (enabled) => {
    localStorage.setItem('soundEnabled', JSON.stringify(enabled));
};