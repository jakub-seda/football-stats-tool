/**
 * Shared Logic for Statistics Visualization Tool
 */

const StatsUtils = {
    calculateScaling: {
        linear(val1, val2) {
            const total = val1 + val2;
            if (total === 0) return [0, 0];
            return [(val1 / total) * 100, (val2 / total) * 100];
        }
    },

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
                        <div class="bar bar-home" id="barHomeTotalFlashscore${uniqueIdSuffix}">
                            <span class="bar-value-label" id="labelHomeFlashscore${uniqueIdSuffix}"></span>
                        </div>
                    </div>
                    <div class="bar-segment right">
                        <div class="bar bar-away" id="barAwayTotalFlashscore${uniqueIdSuffix}">
                            <span class="bar-value-label" id="labelAwayFlashscore${uniqueIdSuffix}"></span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

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
                            <div class="nested-bar-inner bar-home" id="nestedBarHomeSuccessfulNested${uniqueIdSuffix}">
                                <span class="bar-value-label" id="labelHomeNested${uniqueIdSuffix}"></span>
                            </div>
                        </div>
                    </div>
                    <div class="bar-segment right nested-bar-segment">
                        <div class="nested-bar-outer" id="nestedBarAwayTotalNested${uniqueIdSuffix}">
                            <div class="nested-bar-inner bar-away" id="nestedBarAwaySuccessfulNested${uniqueIdSuffix}">
                                <span class="bar-value-label" id="labelAwayNested${uniqueIdSuffix}"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

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
                        <div class="home-numbers" id="displayHomeCompositeNestedRings${uniqueIdSuffix}">(0/0)</div>
                    </div>
                    <div class="ring-container">
                        <svg class="progress-ring" width="48" height="48">
                            <circle class="progress-ring-circle-bg" stroke-width="4" r="21" cx="24" cy="24"/>
                            <circle class="progress-ring-circle" id="ringAway${uniqueIdSuffix}" stroke-width="4" r="21" cx="24" cy="24" stroke-dasharray="131.95" stroke-dashoffset="131.95"/>
                            <text class="progress-ring-text" id="ringAway${uniqueIdSuffix}Text" x="24" y="24">0%</text>
                        </svg>
                        <div class="away-numbers" id="displayAwayCompositeNestedRings${uniqueIdSuffix}">(0/0)</div>
                    </div>
                </div>
                <div class="bar-container nested-bar-container">
                    <div class="bar-bg"></div>
                    <div class="bar-segment left nested-bar-segment">
                        <div class="nested-bar-outer" id="nestedBarHomeTotalNestedRings${uniqueIdSuffix}">
                            <div class="nested-bar-inner bar-home" id="nestedBarHomeSuccessfulNestedRings${uniqueIdSuffix}">
                                <span class="bar-value-label" id="labelHomeNestedRings${uniqueIdSuffix}"></span>
                            </div>
                        </div>
                    </div>
                    <div class="bar-segment right nested-bar-segment">
                        <div class="nested-bar-outer" id="nestedBarAwayTotalNestedRings${uniqueIdSuffix}">
                            <div class="nested-bar-inner bar-away" id="nestedBarAwaySuccessfulNestedRings${uniqueIdSuffix}">
                                <span class="bar-value-label" id="labelAwayNestedRings${uniqueIdSuffix}"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    updateFlashscoreBars(statId, hS, hT, aS, aT) {
        const hP = hT === 0 ? 0 : (hS / hT) * 100;
        const aP = aT === 0 ? 0 : (aS / aT) * 100;
        const widths = this.calculateScaling.linear(hP, aP);
        
        const barH = document.getElementById(`barHomeTotalFlashscore${statId}`);
        const barA = document.getElementById(`barAwayTotalFlashscore${statId}`);
        const lblH = document.getElementById(`labelHomeFlashscore${statId}`);
        const lblA = document.getElementById(`labelAwayFlashscore${statId}`);
        const txtH = document.getElementById(`displayHomeCompositeFlashscore${statId}`);
        const txtA = document.getElementById(`displayAwayCompositeFlashscore${statId}`);

        if (barH) barH.style.width = widths[0] + '%';
        if (barA) barA.style.width = widths[1] + '%';
        if (lblH) lblH.textContent = widths[0] > 15 ? Math.round(widths[0]) + '%' : '';
        if (lblA) lblA.textContent = widths[1] > 15 ? Math.round(widths[1]) + '%' : '';

        const hpR = Math.round(hP), apR = Math.round(aP);
        const finH = hpR > apR ? '#e31b23' : '#ffffff';
        const finA = apR > hpR ? '#e31b23' : '#ffffff';
        const colorH = (hpR === apR) ? '#ffffff' : finH;
        const colorA = (hpR === apR) ? '#ffffff' : finA;
        
        if (barH) {
            barH.style.backgroundColor = colorH;
            if (lblH) lblH.style.color = colorH === '#e31b23' ? 'white' : 'black';
        }
        if (barA) {
            barA.style.backgroundColor = colorA;
            if (lblA) lblA.style.color = colorA === '#e31b23' ? 'white' : 'black';
        }
        if (txtH) txtH.innerHTML = `${hpR}%<br>(${hS}/${hT})`;
        if (txtA) txtA.innerHTML = `${apR}%<br>(${aS}/${aT})`;
    },

    _updateNestedLogic(statId, suffix, hS, hT, aS, aT) {
        const barH = document.getElementById(`nestedBarHomeSuccessful${suffix}${statId}`);
        const barA = document.getElementById(`nestedBarAwaySuccessful${suffix}${statId}`);
        const outH = document.getElementById(`nestedBarHomeTotal${suffix}${statId}`);
        const outA = document.getElementById(`nestedBarAwayTotal${suffix}${statId}`);
        const lblH = document.getElementById(`labelHome${suffix}${statId}`);
        const lblA = document.getElementById(`labelAway${suffix}${statId}`);
        const txtH = document.getElementById(`displayHomeComposite${suffix}${statId}`);
        const txtA = document.getElementById(`displayAwayComposite${suffix}${statId}`);

        const totalAttempts = hT + aT;
        const hP = hT === 0 ? 0 : (hS / hT) * 100;
        const aP = aT === 0 ? 0 : (aS / aT) * 100;
        
        const totalWidths = this.calculateScaling.linear(hT, aT);
        const hShare = totalAttempts === 0 ? 0 : (hS / totalAttempts) * 100;
        const aShare = totalAttempts === 0 ? 0 : (aS / totalAttempts) * 100;

        if (outH) outH.style.width = totalWidths[0] + '%';
        if (outA) outA.style.width = totalWidths[1] + '%';
        if (barH) barH.style.width = hP + '%';
        if (barA) barA.style.width = aP + '%';

        const colorH = hS > aS ? '#e31b23' : '#ffffff';
        const colorA = aS > hS ? '#e31b23' : '#ffffff';
        const finH = (hS === aS) ? '#ffffff' : colorH;
        const finA = (hS === aS) ? '#ffffff' : colorA;

        if (barH) {
            barH.style.backgroundColor = finH;
            if (lblH) {
                lblH.textContent = hShare > 10 ? Math.round(hShare) + '%' : '';
                lblH.style.color = finH === '#e31b23' ? 'white' : 'black';
            }
        }
        if (barA) {
            barA.style.backgroundColor = finA;
            if (lblA) {
                lblA.textContent = aShare > 10 ? Math.round(aShare) + '%' : '';
                lblA.style.color = finA === '#e31b23' ? 'white' : 'black';
            }
        }

        if (txtH) txtH.innerHTML = `<span style="font-weight: normal; opacity: 0.7;">(${hS}/${hT})</span>`;
        if (txtA) txtA.innerHTML = `<span style="font-weight: normal; opacity: 0.7;">(${aS}/${aT})</span>`;

        return { hP: Math.round(hP), aP: Math.round(aP) };
    },

    updateNestedBars(statId, hS, hT, aS, aT) {
        this._updateNestedLogic(statId, 'Nested', hS, hT, aS, aT);
    },

    updateNestedBarsWithRings(statId, hS, hT, aS, aT) {
        const res = this._updateNestedLogic(statId, 'NestedRings', hS, hT, aS, aT);
        if (!res) return;
        let rH = res.hP > res.aP ? '#e31b23' : '#ffffff';
        let rA = res.aP > res.hP ? '#e31b23' : '#ffffff';
        if (res.hP === res.aP) { rH = '#ffffff'; rA = '#ffffff'; }
        this.updateProgressRing('ringHome' + statId, res.hP, rH);
        this.updateProgressRing('ringAway' + statId, res.aP, rA);
    },

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
    }
};
