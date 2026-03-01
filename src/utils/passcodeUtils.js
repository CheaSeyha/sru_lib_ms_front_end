const SECRET_KEY = "sru_lib_ms_secret";

/**
 * Encrypts a 4-digit passcode using base64 and a secret key.
 * @param {string} passcode - The 4-digit passcode.
 * @returns {string} - The encrypted passcode.
 */
export const encryptPasscode = (passcode) => {
    if (!passcode) return "";
    return btoa(SECRET_KEY + ":" + passcode);
};

/**
 * Verifies if the input passcode matches the encrypted one.
 * @param {string} inputPasscode - The passcode entered by the user.
 * @param {string} encryptedPasscode - The stored encrypted passcode.
 * @returns {boolean} - True if matches, false otherwise.
 */
export const verifyPasscode = (inputPasscode, encryptedPasscode) => {
    if (!encryptedPasscode) return true; // If no passcode set, allow access? Or block?
    try {
        const decrypted = atob(encryptedPasscode);
        return decrypted === (SECRET_KEY + ":" + inputPasscode);
    } catch (e) {
        return false;
    }
};

/**
 * Saves the encrypted passcode to local storage.
 * @param {string} passcode - The 4-digit passcode.
 */
export const savePasscode = (passcode) => {
    localStorage.setItem('admin_passcode', encryptPasscode(passcode));
};

/**
 * Retrieves the encrypted passcode from local storage.
 * @returns {string|null} - The encrypted passcode or null.
 */
export const getStoredPasscode = () => {
    return localStorage.getItem('admin_passcode');
};

/**
 * Checks if a passcode is currently set.
 * @returns {boolean}
 */
export const hasPasscode = () => {
    const stored = getStoredPasscode();
    return stored !== null && stored !== "";
};

/**
 * Marks the current session as "unlocked" after a successful passcode entry.
 */
export const unlockNavigation = () => {
    sessionStorage.setItem('nav_unlocked', 'true');
};

/**
 * Locks the navigation again (should be called when entering the QR page).
 */
export const lockNavigation = () => {
    sessionStorage.removeItem('nav_unlocked');
};

/**
 * Checks if the navigation is currently unlocked for the session.
 * @returns {boolean}
 */
export const isNavUnlocked = () => {
    return sessionStorage.getItem('nav_unlocked') === 'true';
};
