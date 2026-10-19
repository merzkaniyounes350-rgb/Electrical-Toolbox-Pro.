document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. CABLE SIZE CALCULATOR
    // ==========================================
    const cableModal = document.getElementById("cableSizeModal");
    const openCable = document.getElementById("openCableSize");
    const closeCable = document.getElementById("closeCableSize");
    const calcCableBtn = document.getElementById("calculateCable");
    const resetCableBtn = document.getElementById("resetCable");
    const cableResult = document.getElementById("cableResult");

    if (openCable && cableModal) {
        openCable.onclick = () => cableModal.style.display = "flex";
        closeCable.onclick = () => cableModal.style.display = "none";
    }

    if (calcCableBtn) {
        calcCableBtn.addEventListener("click", function () {
            const current = parseFloat(document.getElementById("cableCurrent").value);
            const length = parseFloat(document.getElementById("cableLength").value);
            const phase = parseInt(document.getElementById("cablePhase").value);
            const maxDrop = parseFloat(document.getElementById("maxDrop").value);

            if (isNaN(current) || current <= 0 || isNaN(length) || length <= 0) {
                cableResult.innerHTML = `<div class="result-box error">Please enter valid current and length values.</div>`;
                return;
            }

            const resistivity = 0.0175; // Copper resistivity (ohm.mm2/m)
            const voltage = (phase === 1) ? 220 : 380;
            const allowedDropVolt = (voltage * maxDrop) / 100;

            // S = (2 * L * I * rho) / Vdrop  [Single Phase]
            // S = (sqrt(3) * L * I * rho) / Vdrop [Three Phase]
            let requiredArea = (phase === 1) 
                ? (2 * length * current * resistivity) / allowedDropVolt
                : (Math.sqrt(3) * length * current * resistivity) / allowedDropVolt;

            const standardSizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240];
            let recommendedSize = standardSizes.find(size => size >= requiredArea) || standardSizes[standardSizes.length - 1];

            cableResult.innerHTML = `
                <div class="result-box">
                    <span>Calculated Area: <strong>${requiredArea.toFixed(2)} mm²</strong></span><br>
                    <span>Recommended Standard Size: <strong>${recommendedSize} mm²</strong></span>
                </div>`;
        });

        resetCableBtn.addEventListener("click", function () {
            document.getElementById("cableCurrent").value = "";
            document.getElementById("cableLength").value = "";
            cableResult.innerHTML = "";
        });
    }

    // ==========================================
    // 2. VOLTAGE DROP CALCULATOR
    // ==========================================
    const vDropModal = document.getElementById("voltageDropModal");
    const openVDrop = document.getElementById("openVoltageDrop");
    const closeVDrop = document.getElementById("closeVoltageDrop");
    const calcVDropBtn = document.getElementById("calculateVDrop");
    const resetVDropBtn = document.getElementById("resetVDrop");
    const vDropResult = document.getElementById("vDropResult");

    if (openVDrop && vDropModal) {
        openVDrop.onclick = () => vDropModal.style.display = "flex";
        closeVDrop.onclick = () => vDropModal.style.display = "none";
    }

    if (calcVDropBtn) {
        calcVDropBtn.addEventListener("click", function () {
            const v = parseFloat(document.getElementById("vDropVoltage").value);
            const i = parseFloat(document.getElementById("vDropCurrent").value);
            const l = parseFloat(document.getElementById("vDropLength").value);
            const size = parseFloat(document.getElementById("vDropSize").value);

            if (isNaN(v) || v <= 0 || isNaN(i) || i <= 0 || isNaN(l) || l <= 0) {
                vDropResult.innerHTML = `<div class="result-box error">Please fill in all inputs correctly.</div>`;
                return;
            }

            const rho = 0.0175; // Copper
            const vDrop = (2 * l * i * rho) / size;
            const dropPercentage = (vDrop / v) * 100;
            const endVoltage = v - vDrop;

            const isAcceptable = dropPercentage <= 3;

            vDropResult.innerHTML = `
                <div class="result-box">
                    <span>Voltage Drop: <strong>${vDrop.toFixed(2)} V (${dropPercentage.toFixed(2)}%)</strong></span><br>
                    <span>Voltage at Load: <strong>${endVoltage.toFixed(2)} V</strong></span><br>
                    <span style="color: ${isAcceptable ? '#00e676' : '#ff5252'}; font-weight: bold;">
                        Status: ${isAcceptable ? '✓ Acceptable (< 3%)' : '⚠ High Drop (> 3%)'}
                    </span>
                </div>`;
        });

        resetVDropBtn.addEventListener("click", function () {
            document.getElementById("vDropVoltage").value = "";
            document.getElementById("vDropCurrent").value = "";
            document.getElementById("vDropLength").value = "";
            vDropResult.innerHTML = "";
        });
    }

    // ==========================================
    // 3. BATTERY BACKUP CALCULATOR
    // ==========================================
    const batteryModal = document.getElementById("batteryModal");
    const openBattery = document.getElementById("openBatteryBackup");
    const closeBattery = document.getElementById("closeBattery");
    const calcBatteryBtn = document.getElementById("calculateBattery");
    const resetBatteryBtn = document.getElementById("resetBattery");
    const batteryResult = document.getElementById("batteryResult");

    if (openBattery && batteryModal) {
        openBattery.onclick = () => batteryModal.style.display = "flex";
        closeBattery.onclick = () => batteryModal.style.display = "none";
    }

    if (calcBatteryBtn) {
        calcBatteryBtn.addEventListener("click", function () {
            const load = parseFloat(document.getElementById("batteryLoad").value);
            const ah = parseFloat(document.getElementById("batteryAh").value);
            const volts = parseFloat(document.getElementById("batteryVolts").value);

            if (isNaN(load) || load <= 0 || isNaN(ah) || ah <= 0) {
                batteryResult.innerHTML = `<div class="result-box error">Please enter valid load power and Ah capacity.</div>`;
                return;
            }

            // Total Watt-hours = Ah * V * Efficiency (approx. 0.85 for Inverter losses)
            const totalWh = ah * volts * 0.85;
            const hours = totalWh / load;
            const totalMinutes = Math.floor(hours * 60);
            const displayHours = Math.floor(totalMinutes / 60);
            const displayMinutes = totalMinutes % 60;

            batteryResult.innerHTML = `
                <div class="result-box">
                    <span>Estimated Backup Time:</span>
                    <strong>${displayHours} Hours and ${displayMinutes} Minutes</strong>
                    <br><small>(Calculated with 85% Inverter Efficiency factor)</small>
                </div>`;
        });

        resetBatteryBtn.addEventListener("click", function () {
            document.getElementById("batteryLoad").value = "";
            document.getElementById("batteryAh").value = "";
            batteryResult.innerHTML = "";
        });
    }

    // Close Modals on outside click
    window.addEventListener("click", function (e) {
        if (e.target === cableModal) cableModal.style.display = "none";
        if (e.target === vDropModal) vDropModal.style.display = "none";
        if (e.target === batteryModal) batteryModal.style.display = "none";
    });
});
