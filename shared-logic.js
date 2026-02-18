/**
 * Shared Logic for Statistics Visualization Tool
 */

const StatsUtils = {
    /**
     * Generates HTML for a Flashscore-style bar.
     */
    generateFlashscoreBarHtml(statName, uniqueIdSuffix) {
        return `
            <div class="stat-row">
                <div class="stat-title">${statName}</div>
                <div class="numbers">
                    <div class="home-numbers" id="displayHomeCompositeFlashscore${uniqueIdSuffix}">0%<br>(0/0)</div>
                    <div class="away-numbers" id="displayAwayCompositeFlashscore${uniqueIdSuffix}">0%<br>(0/0)</div>
                </div>
                <div class="bar-container">
                    <div class="bar-bg"></div>
                    <div class="bar-segment left">
                        <div class="bar bar-home" id="barHomeTotalFlashscore${uniqueIdSuffix}"></div>
                    </div>
                    <div class="bar-segment right">
                        <div class="bar bar-away" id="barAwayTotalFlashscore${uniqueIdSuffix}"></div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Generates HTML for a Nested Bar visualization.
     */
    generateNestedBarHtml(statName, uniqueIdSuffix) {
        return `
            <div class="stat-row">
                <div class="stat-title">${statName}</div>
                <div class="numbers">
                    <div class="home-numbers" id="displayHomeCompositeNested${uniqueIdSuffix}">0%<br>(0/0)</div>
                    <div class="away-numbers" id="displayAwayCompositeNested${uniqueIdSuffix}">0%<br>(0/0)</div>
                </div>
                <div class="bar-container nested-bar-container">
                    <div class="bar-bg"></div>
                    <div class="bar-segment left nested-bar-segment">
                        <div class="nested-bar-outer" id="nestedBarHomeTotalNested${uniqueIdSuffix}">
                            <div class="nested-bar-inner" id="nestedBarHomeSuccessfulNested${uniqueIdSuffix}"></div>
                        </div>
                    </div>
                    <div class="bar-segment right nested-bar-segment">
                        <div class="nested-bar-outer" id="nestedBarAwayTotalNested${uniqueIdSuffix}">
                            <div class="nested-bar-inner" id="nestedBarAwaySuccessfulNested${uniqueIdSuffix}"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Core calculation logic for various scaling types.
     */
    calculateScaling: {
        linear(val1, val2) {
            const total = val1 + val2;
            if (total === 0) return [0, 0];
            return [(val1 / total) * 100, (val2 / total) * 100];
        },
        hype(val1, val2, power = 2) {
            const p1 = Math.pow(val1, power);
            const p2 = Math.pow(val2, power);
            return this.linear(p1, p2);
        },
        logarithmic(val1, val2) {
            const l1 = Math.log(val1 + 1);
            const l2 = Math.log(val2 + 1);
            return this.linear(l1, l2);
        }
    },

    /**
     * Updates Flashscore-style bars based on successful/total attempts.
     */
    updateFlashscoreBars(statId, homeSuccessful, homeTotal, awaySuccessful, awayTotal) {
        const homePercentage = homeTotal === 0 ? 0 : Math.round((homeSuccessful / homeTotal) * 100);
        const awayPercentage = awayTotal === 0 ? 0 : Math.round((awaySuccessful / awayTotal) * 100);

        const widths = this.calculateScaling.linear(homePercentage, awayPercentage);
        
        const homeBar = document.getElementById(`barHomeTotalFlashscore${statId}`);
        const awayBar = document.getElementById(`barAwayTotalFlashscore${statId}`);
        const homeText = document.getElementById(`displayHomeCompositeFlashscore${statId}`);
        const awayText = document.getElementById(`displayAwayCompositeFlashscore${statId}`);

        if (homeBar) homeBar.style.width = widths[0] + '%';
        if (awayBar) awayBar.style.width = widths[1] + '%';

        // Color logic
        const homeColor = homePercentage > awayPercentage ? '#e31b23' : '#ffffff';
        const awayColor = awayPercentage > homePercentage ? '#e31b23' : '#ffffff';
        
        if (homeBar) homeBar.style.backgroundColor = (homePercentage === awayPercentage) ? '#ffffff' : homeColor;
        if (awayBar) awayBar.style.backgroundColor = (homePercentage === awayPercentage) ? '#ffffff' : awayColor;

        if (homeText) homeText.innerHTML = `${homePercentage}%<br>(${homeSuccessful}/${homeTotal})`;
        if (awayText) awayText.innerHTML = `${awayPercentage}%<br>(${awaySuccessful}/${awayTotal})`;
    },

    /**
     * Generates HTML for a Nested Bar with Large Progress Rings.
     */
    generateNestedBarWithRingsHtml(statName, uniqueIdSuffix) {
        return `
            <div class="stat-row">
                <div class="stat-title">${statName}</div>
                <div class="numbers rings-layout">
                    <div class="ring-container">
                        <svg class="progress-ring" width="48" height="48">
                            <circle class="progress-ring-circle-bg" stroke-width="4" r="21" cx="24" cy="24"/>
                            <circle class="progress-ring-circle" id="ringHome${uniqueIdSuffix}" stroke-width="4" r="21" cx="24" cy="24" stroke-dasharray="131.95" stroke-dashoffset="131.95"/>
                            <text class="progress-ring-text" id="ringHome${uniqueIdSuffix}Text" x="24" y="24">0%</text>
                        </svg>
                        <span id="displayHomeCompositeNestedRings${uniqueIdSuffix}">(0/0)</span>
                    </div>
                    <div class="ring-container">
                        <svg class="progress-ring" width="48" height="48">
                            <circle class="progress-ring-circle-bg" stroke-width="4" r="21" cx="24" cy="24"/>
                            <circle class="progress-ring-circle" id="ringAway${uniqueIdSuffix}" stroke-width="4" r="21" cx="24" cy="24" stroke-dasharray="131.95" stroke-dashoffset="131.95"/>
                            <text class="progress-ring-text" id="ringAway${uniqueIdSuffix}Text" x="24" y="24">0%</text>
                        </svg>
                        <span id="displayAwayCompositeNestedRings${uniqueIdSuffix}">(0/0)</span>
                    </div>
                </div>
                <div class="bar-container nested-bar-container">
                    <div class="bar-bg"></div>
                    <div class="bar-segment left nested-bar-segment">
                        <div class="nested-bar-outer" id="nestedBarHomeTotalNestedRings${uniqueIdSuffix}">
                            <div class="nested-bar-inner" id="nestedBarHomeSuccessfulNestedRings${uniqueIdSuffix}"></div>
                        </div>
                    </div>
                    <div class="bar-segment right nested-bar-segment">
                        <div class="nested-bar-outer" id="nestedBarAwayTotalNestedRings${uniqueIdSuffix}">
                            <div class="nested-bar-inner" id="nestedBarAwaySuccessfulNestedRings${uniqueIdSuffix}"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Updates Nested-style bars with rings based on successful/total attempts.
     */
    updateNestedBarsWithRings(statId, homeSuccessful, homeTotal, awaySuccessful, awayTotal) {
        const homePercentage = homeTotal === 0 ? 0 : (homeSuccessful / homeTotal) * 100;
        const awayPercentage = awayTotal === 0 ? 0 : (awaySuccessful / awayTotal) * 100;

        const outerWidths = this.calculateScaling.linear(homeTotal, awayTotal);
        const homeInnerWidth = homeTotal === 0 ? 0 : (homeSuccessful / homeTotal) * 100;
        const awayInnerWidth = awayTotal === 0 ? 0 : (awaySuccessful / awayTotal) * 100;

        // Update Bars
        const homeOuter = document.getElementById(`nestedBarHomeTotalNestedRings${statId}`);
        const awayOuter = document.getElementById(`nestedBarAwayTotalNestedRings${statId}`);
        const homeInner = document.getElementById(`nestedBarHomeSuccessfulNestedRings${statId}`);
        const awayInner = document.getElementById(`nestedBarAwaySuccessfulNestedRings${statId}`);
        const homeText = document.getElementById(`displayHomeCompositeNestedRings${statId}`);
        const awayText = document.getElementById(`displayAwayCompositeNestedRings${statId}`);

        if (homeOuter) homeOuter.style.width = outerWidths[0] + '%';
        if (awayOuter) awayOuter.style.width = outerWidths[1] + '%';
        if (homeInner) homeInner.style.width = homeInnerWidth + '%';
        if (awayInner) awayInner.style.width = awayInnerWidth + '%';

        // Color logic for inner bars
        const homeColorInner = homeSuccessful > awaySuccessful ? '#e31b23' : '#ffffff';
        const awayColorInner = awaySuccessful > homeSuccessful ? '#e31b23' : '#ffffff';
        if (homeInner) homeInner.style.backgroundColor = (homeSuccessful === awaySuccessful) ? '#ffffff' : homeColorInner;
        if (awayInner) awayInner.style.backgroundColor = (homeSuccessful === awaySuccessful) ? '#ffffff' : awayColorInner;

        if (homeText) homeText.innerHTML = `(${homeSuccessful}/${homeTotal})`;
        if (awayText) awayText.innerHTML = `(${awaySuccessful}/${awayTotal})`;

        // Update Rings with color logic based on percentage
        let ringHColor = '#ffffff';
        let ringAColor = '#ffffff';
        if (homePercentage > awayPercentage) {
            ringHColor = '#e31b23';
        } else if (awayPercentage > homePercentage) {
            ringAColor = '#e31b23';
        }

        this.updateProgressRing('ringHome' + statId, homePercentage, ringHColor);
        this.updateProgressRing('ringAway' + statId, awayPercentage, ringAColor);
    },

    /**
     * Updates a single progress ring based on percentage and adds text.
     */
    updateProgressRing(ringId, percentage, color) {
        const circle = document.getElementById(ringId);
        const textElement = document.getElementById(ringId + 'Text');
        if (!circle) return;
        
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = offset;
        circle.style.stroke = color;

        if (textElement) {
            textElement.textContent = `${Math.round(percentage)}%`;
            textElement.style.fill = color;
        }
    },

    /**
     * Updates Nested-style bars based on successful/total attempts.
     */
    updateNestedBars(statId, homeSuccessful, homeTotal, awaySuccessful, awayTotal) {
        const homePercentage = homeTotal === 0 ? 0 : Math.round((homeSuccessful / homeTotal) * 100);
        const awayPercentage = awayTotal === 0 ? 0 : Math.round((awaySuccessful / awayTotal) * 100);

        const outerWidths = this.calculateScaling.linear(homeTotal, awayTotal);
        const homeInnerWidth = homeTotal === 0 ? 0 : (homeSuccessful / homeTotal) * 100;
        const awayInnerWidth = awayTotal === 0 ? 0 : (awaySuccessful / awayTotal) * 100;

        const homeOuter = document.getElementById(`nestedBarHomeTotalNested${statId}`);
        const awayOuter = document.getElementById(`nestedBarAwayTotalNested${statId}`);
        const homeInner = document.getElementById(`nestedBarHomeSuccessfulNested${statId}`);
        const awayInner = document.getElementById(`nestedBarAwaySuccessfulNested${statId}`);
        const homeText = document.getElementById(`displayHomeCompositeNested${statId}`);
        const awayText = document.getElementById(`displayAwayCompositeNested${statId}`);

        if (homeOuter) homeOuter.style.width = outerWidths[0] + '%';
        if (awayOuter) awayOuter.style.width = outerWidths[1] + '%';
        if (homeInner) homeInner.style.width = homeInnerWidth + '%';
        if (awayInner) awayInner.style.width = awayInnerWidth + '%';

        // Color logic for inner bars based on successful count
        const homeColor = homeSuccessful > awaySuccessful ? '#e31b23' : '#ffffff';
        const awayColor = awaySuccessful > homeSuccessful ? '#e31b23' : '#ffffff';

        if (homeInner) homeInner.style.backgroundColor = (homeSuccessful === awaySuccessful) ? '#ffffff' : homeColor;
        if (awayInner) awayInner.style.backgroundColor = (homeSuccessful === awaySuccessful) ? '#ffffff' : awayColor;

        if (homeText) homeText.innerHTML = `${homePercentage}%<br>(${homeSuccessful}/${homeTotal})`;
        if (awayText) awayText.innerHTML = `${awayPercentage}%<br>(${awaySuccessful}/${awayTotal})`;
    }
};
