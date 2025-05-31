// This is a utility file for string functions
// utils.js

// Capitalizes the first letter of a given string
export const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// This variable is intentionally unused
const unusedVariable = 42;