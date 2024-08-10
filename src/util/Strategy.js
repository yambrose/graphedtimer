class GraphStrategy {
    manipulateTime(maxTime, currentTime, isFlipped) {
        throw new Error("Method 'manipulateTime()' must be implemented.");
    }
}

class SinusoidalTime extends GraphStrategy {
    manipulateTime(maxTime, currentTime, isFlipped) {
        // slow start fast finish
        if (!isFlipped) return maxTime * Math.sin((currentTime / maxTime) * (Math.PI / 2));

        // fast start slow finish
        return Math.ceil(maxTime * (1 - Math.cos((currentTime / maxTime) * (Math.PI / 2))));
    }
}

class LinearTime extends GraphStrategy {
    manipulateTime(maxTime, currentTime, isFlipped) {
        return currentTime;
    }
}

class ExponentialTime extends GraphStrategy {
    manipulateTime(maxTime, currentTime, isFlipped) {
        //return maxTime * (1 - Math.exp(-5 * (currentTime / maxTime)));
        return maxTime * Math.sin((Math.PI / 2) * ratio);
    }
}

class QuadraticTime extends GraphStrategy {
    manipulateTime(maxTime, currentTime, isFlipped) {
        let t = currentTime / maxTime;
        if (isFlipped) return Math.ceil(maxTime * t * t);
        return Math.ceil(maxTime * (1 - (1 - t) * (1 - t)));
    }
}

class CubicTime extends GraphStrategy {
    manipulateTime(maxTime, currentTim, isFlipped) {
        const ratio = currentTime / maxTime;
        return maxTime * ratio * ratio * ratio; // Cubic growth
    }
}

export default { GraphStrategy, LinearTime, QuadraticTime, SinusoidalTime, ExponentialTime, CubicTime }