// Convert objects to CSV content
const convertToCSV = (array) => {
    // Get headers from first object
    const headers = Object.keys(array[0]);

    // Create CSV header row
    const csvRows = [headers.join(',')];

    // Add data rows
    array.forEach(row => {
        const values = headers.map(header => {
            let val = row[header]
            if (!val) {
                val = null;
            }
            // Handle values with commas, quotes, or newlines
            if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
                return `"${val.replace(/"/g, '""')}"`;
            }
            return val;
        });
        csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
};

module.exports = { convertToCSV };