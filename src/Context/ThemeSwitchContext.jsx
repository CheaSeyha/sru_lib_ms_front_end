import React, { createContext, useEffect, useState, useContext } from 'react';

// Create the ThemeSwitchContext
const ThemeSwitchContext = createContext();

export const ThemeSwitchProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Check local storage for theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        } else {
            // If no preference, use system theme
            const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return userPrefersDark ? 'dark' : 'light';
        }
    });

    useEffect(() => {
        // Apply the theme to the document
        document.documentElement.setAttribute('data-theme', theme);
        // Save the theme in local storage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    return (
        <ThemeSwitchContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeSwitchContext.Provider>
    );
};

// Custom hook to use the ThemeSwitchContext
export const useThemeSwitch = () => {
    return useContext(ThemeSwitchContext);
};
