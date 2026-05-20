function metricToValue(m, min, max, cutoff) {
    if (m <= cutoff) {
        return ((m - min) / (cutoff - min)) * 80;
    } else {
        return 80 + ((m - cutoff) / (max - cutoff)) * 20;
    }
}

function valueToMetric(v, min, max, cutoff) {
    if (v <= 80) {
        return min + (v / 80) * (cutoff - min);
    } else {
        return cutoff + ((v - 80) / 20) * (max - cutoff);
    }
}
