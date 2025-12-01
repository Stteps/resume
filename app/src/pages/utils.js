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


export {
    subdivideSegments,
};