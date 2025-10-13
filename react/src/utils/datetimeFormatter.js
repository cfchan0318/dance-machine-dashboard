/**
 * Converts an ISO datetime string to 'YYYY-MM-DD HH:mm' format.
 * @param {string} isoString - The ISO datetime string to format (e.g., '2025-06-23T08:12:34.676Z').
 * @returns {string} - The formatted datetime string in 'YYYY-MM-DD HH:mm' format.
 */
function formatDateTime(isoString) {
    const date = new Date(isoString);

    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    // Extract hours and minutes
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Combine into desired format
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export { formatDateTime }