import React, { createContext, useState, useContext } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        headTracking: false,
        voiceControl: false,
        highContrast: false,
        screenReader: false
    });

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const applyProfile = (profileType) => {
        const profiles = {
            'motor': { headTracking: true, voiceControl: true, highContrast: false, screenReader: false },
            'visual': { headTracking: false, voiceControl: true, highContrast: true, screenReader: true },
            'cognitive': { headTracking: false, voiceControl: false, highContrast: false, screenReader: true },
            'none': { headTracking: false, voiceControl: false, highContrast: false, screenReader: false }
        };

        if (profiles[profileType]) {
            setSettings(profiles[profileType]);
        }
    };

    return (
        <AccessibilityContext.Provider value={{ settings, toggleSetting, applyProfile }}>
            {children}
        </AccessibilityContext.Provider>
    );
};
