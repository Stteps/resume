const subdivideSegments = (points, segmentsPerLine = 50) => {
    const subdivided = [];

    for (let i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];

    for (let j = 0; j < segmentsPerLine; j++) {
        const t = j / segmentsPerLine;
        subdivided.push(start.clone().lerp(end, t));
    }
    }

    subdivided.push(points[points.length - 1]);
    return subdivided;
};

const getGradient = (level) => {
  // Clamp level between 0 and 100
  const clamped = Math.max(0, Math.min(100, level));

  if (clamped <= 50) {
    // Interpolate from red to orange-yellow (0 to 50)
    const t = clamped / 50;
    const r = Math.round(244 + t * (250 - 244));  // 244 → 250
    const g = Math.round(63 + t * (204 - 63));    // 63 → 204
    const b = Math.round(94 + t * (21 - 94));     // 94 → 21
    return `linear-gradient(to right, rgb(244, 63, 94), rgb(${r}, ${g}, ${b}))`;
  } else {
    // Interpolate from orange-yellow to green (50 to 100)
    const t = (clamped - 50) / 50;
    const r = Math.round(250 + t * (34 - 250));   // 250 → 34
    const g = Math.round(204 + t * (197 - 204));  // 204 → 197
    const b = Math.round(21 + t * (94 - 21));     // 21 → 94
    return `linear-gradient(to right, rgb(250, 204, 21), rgb(${r}, ${g}, ${b}))`;
  }
};


export {
    subdivideSegments,
    getGradient
};