// This is a utility file for string functions
// utils.js
// Collection of reusable utility functions for text manipulation

// Version identifier for utility module
const UTILS_VERSION = "1.0.0";
// Default return value for empty strings
const EMPTY_STRING_DEFAULT = '';

// Capitalizes the first letter of a given string
// @param {string} string - The input string to capitalize
export const capitalizeFirstLetter = (string) => {
    if (!string) return EMPTY_STRING_DEFAULT;
    return string.charAt(0).toUpperCase() + string.slice(1);
};


const unusedVariable = 42;


const anotherUnused = "not used";