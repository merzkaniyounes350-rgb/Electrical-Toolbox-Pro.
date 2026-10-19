document.addEventListener("DOMContentLoaded", function () {

    // 1. Cable Size Modal Binding
    const openCable = document.getElementById("openCable");
    const cableModal = document.getElementById("cableModal");
    const closeCable = document.getElementById("closeCable");

    if (openCable && cableModal) {
        openCable.addEventListener("click", function () {
            cableModal.style.display = "flex";
        });
    }
    if (closeCable && cableModal) {
        closeCable.addEventListener("click", function (e) {
            e.stopPropagation();
            cableModal.style.display = "none";
        });
    }

    // 2. Voltage Drop Modal Binding
    const openVDrop = document.getElementById("openVoltageDrop");
    const vDropModal = document.getElementById("vDropModal");
    const closeVDrop = document.getElementById("closeVDrop");

    if (openVDrop && vDropModal) {
        openVDrop.addEventListener("click", function () {
            vDropModal.style.display = "flex";
        });
    }
    if (closeVDrop && vDropModal) {
        closeVDrop.addEventListener("click", function (e) {
            e.stopPropagation();
            vDropModal.style.display = "none";
        });
    }

    // 3. Battery Backup Modal Binding
    const openBattery = document.getElementById("openBattery");
    const batteryModal = document.getElementById("batteryModal");
    const closeBattery = document.getElementById("closeBattery");

    if (openBattery && batteryModal) {
        openBattery.addEventListener("click", function () {
            batteryModal.style.display = "flex";
        });
    }
    if (closeBattery && batteryModal) {
        closeBattery.addEventListener("click", function (e) {
            e.stopPropagation();
            batteryModal.style.display = "none";
        });
    }

    // Close modals on backdrop click
    window.addEventListener("click", function (e) {
        const modalIds = ["cableModal", "vDropModal", "batteryModal"];
        modalIds.forEach(function(id) {
            const m = document.getElementById(id);
            if (m && e.target === m) {
                m.style.display = "none";
            }
        });
    });

    // ==========================================
    // CABLE SIZE CALCULATOR
    // ==========================================
    const calcCable = document.getElementById("calculateCable");
    const resetCable = document.getElementById("resetCable");
    const cableResult = document.getElementById("cableResult");

    if (calcCable) {
        calcCable.addEventListener("click", function (e) {
            e.stopPropagation();
            const current = parseFloat(document.getElementById("cableCurrent").value);
            const length = parseFloat(document.getElementById("cableLength").value);
            const phase = parseInt(document.getElementById("cablePhase").value);
            const maxDrop = parseFloat(document.getElementById("maxDrop").value) || 3;

            if (isNaN(current) || current <= 0 || isNaN(length) || length <= 0) {
                cableResult.innerHTML = `<div class="result-box error">Please enter valid current and length values.</div>`;
                return;
            }

            const rho = 0.0175;
            const voltage = (phase === 1) ? 220 : 380;
            const allowedDropVolt = (voltage * maxDrop) / 100;

            let requiredArea = (phase === 1) 
                ? (2 * length * current * rho) / allowedDropVolt
                : (Math.sqrt(3) * length * current * rho) / allowedDropVolt;

            const standardSizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240];
            let recommended = standardSizes.find(function(s) { return s >= requiredArea; }) || standardSizes[standardSizes.length - 1];

            cableResult.innerHTML = `
                <div class="result-box">
                    <span>Calculated Section: <strong>${requiredArea.toFixed(2)} mm²</strong></span><br>
                    <span>Recommended Cable Size: <strong>${recommended} mm²</strong></span>
                </div>`;
        });
    }

    if (resetCable) {
        resetCable.addEventListener("click", function (e) {
            e.stopPropagation();
            document.getElementById("cableCurrent").value = "";
            document.getElementById("cableLength").value = "";
            cableResult.innerHTML = "";
        });
    }

    // ==========================================
    // VOLTAGE DROP CALCULATOR
    // ==========================================
    const calcVDrop = document.getElementById("calculateVDrop");
    const resetVDrop = document.getElementById("resetVDrop");
    const vDropResult = document.getElementById("vDropResult");

    if (calcVDrop) {
        calcVDrop.addEventListener("click", function (e) {
            e.stopPropagation();
            const v = parseFloat(document.getElementById("vDropVoltage").value);
            const i = parseFloat(document.getElementById("vDropCurrent").value);
            const l = parseFloat(document.getElementById("vDropLength").value);
            const size = parseFloat(document.getElementById("vDropSize").value);

            if (isNaN(v) || v <= 0 || isNaN(i) || i <= 0 || isNaN(l) || l <= 0) {
                vDropResult.innerHTML = `<div class="result-box error">Please enter valid inputs.</div>`;
                return;
            }

            const rho = 0.0175;
            const vDrop = (2 * l * i * rho) / size;
            const dropPercent = (vDrop / v) * 100;
            const finalVoltage = v - vDrop;
            const isOk = dropPercent <= 3;

            vDropResult.innerHTML = `
                <div class="result-box">
                    <span>Voltage Drop: <strong>${vDrop.toFixed(2)} V (${dropPercent.toFixed(2)}%)</strong></span><br>
                    <span>Voltage at Load: <strong>${finalVoltage.toFixed(2)} V</strong></span><br>
                    <strong style="color:${isOk ? '#00e676' : '#ff5252'}">${isOk ? '✓ Acceptable Drop (<3%)' : '⚠ High Voltage Drop (>3%)'}</strong>
                </div>`;
        });
    }

    if (resetVDrop) {
        resetVDrop.addEventListener("click", function (e) {
            e.stopPropagation();
            document.getElementById("vDropVoltage").value = "";
            document.getElementById("vDropCurrent").value = "";
            document.getElementById("vDropLength").value = "";
            vDropResult.innerHTML = "";
        });
    }

    // ==========================================
    // BATTERY BACKUP CALCULATOR
    // ==========================================
    const calcBattery = document.getElementById("calculateBattery");
    const resetBattery = document.getElementById("resetBattery");
    const batteryResult = document.getElementById("batteryResult");

    if (calcBattery) {
        calcBattery.addEventListener("click", function (e) {
            e.stopPropagation();
            const load = parseFloat(document.getElementById("batteryLoad").value);
            const ah = parseFloat(document.getElementById("batteryAh").value);
            const volts = parseFloat(document.getElementById("batteryVolts").value);

            if (isNaN(load) || load <= 0 || isNaN(ah) || ah <= 0) {
                batteryResult.innerHTML = `<div class="result-box error">Please enter valid load and capacity.</div>`;
                return;
            }

            const totalWh = ah * volts * 0.85; 
            const totalMinutes = Math.floor((totalWh / load) * 60);
            const hrs = Math.floor(totalMinutes / 60);
            const mins = totalMinutes % 60;

            batteryResult.innerHTML = `
                <div class="result-box">
                    <span>Estimated Runtime:</span><br>
                    <strong>${hrs} Hours and ${mins} Minutes</strong>
                </div>`;
        });
    }

    if (resetBattery) {
        resetBattery.addEventListener("click", function (e) {
            e.stopPropagation();
            document.getElementById("batteryLoad").value = "";
            document.getElementById("batteryAh").value = "";
            batteryResult.innerHTML = "";
        });
    }

});

