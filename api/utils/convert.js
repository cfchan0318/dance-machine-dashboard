function timestampToDecimal(timestamp) {
    const [hms, ms] = timestamp.split('.');
    const [hours, minutes, seconds] = hms.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds + (ms ? Number(ms) / 1000 : 0);
}

module.exports = {timestampToDecimal}