"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const ccl = new ConcentricCircleLoader(".l");
});
class ConcentricCircleLoader {
    /**
     * @param el CSS selector of the SVG
     */
    constructor(el) {
        this.delay = 750;
        this.timeout = 0;
        this._progress = 0;
        this._running = false;
        this.el = document.querySelector(el);
        this.timeout = setTimeout(this.progressStart.bind(this), this.delay);
    }
    get progress() {
        return this._progress;
    }
    set progress(value) {
        this._progress = value;
        this.progressDisplay();
    }
    get progressPerceived() {
        return Math.floor(Easing.easeOutCirc(this.progress) * 100);
    }
    get running() {
        return this._running;
    }
    set running(value) {
        this._running = value;
        this.runningClass();
    }
    progressDisplay() {
        var _a, _b;
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.setAttribute("aria-label", `${this.progressPerceived}%`);
        const progressEl = (_b = this.el) === null || _b === void 0 ? void 0 : _b.querySelector("[data-progress]");
        if (progressEl) {
            progressEl.textContent = `${this.progressPerceived}`;
        }
    }
    /**
     * @param amount Amount to add
     */
    progressInc(amount = 0.01) {
        this.progress = this.progress + amount;
        if (this.progress >= 1) {
            this.progress = 1;
            this.running = false;
        }
        else if (this.running) {
            const timeoutInterval = 40;
            this.timeout = setTimeout(this.progressInc.bind(this, 0.01), timeoutInterval);
        }
    }
    progressReset() {
        this.progress = 0;
    }
    progressStart() {
        this.running = true;
        this.progressInc(0.01);
    }
    runningClass() {
        var _a;
        if (this.running) {
            const runningClass = "l--running";
            (_a = this.el) === null || _a === void 0 ? void 0 : _a.classList.add(runningClass);
        }
    }
}
class Easing {
    /**
     * @param x Number along the X-axis (should be between 0 and 1)
     */
    static easeOutCirc(x) {
        return Math.sqrt(1 - (1 - x) ** 2);
    }
    /**
     * @param x Number along the X-axis (should be between 0 and 1)
     */
    static easeOutCubic(x) {
        return 1 - (1 - x) ** 3;
    }
    /**
     * @param x Number along the X-axis (should be between 0 and 1)
     */
    static easeOutSine(x) {
        return Math.sin((x * Math.PI) / 2);
    }
}