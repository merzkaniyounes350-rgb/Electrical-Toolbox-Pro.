const calculateBtn = document.getElementById("calculateOhm");
const resetBtn = document.getElementById("resetOhm");
const result = document.getElementById("ohmResult");

calculateBtn.addEventListener("click", function () {

    const V = parseFloat(document.getElementById("voltage").value);
    const I = parseFloat(document.getElementById("current").value);
    const R = parseFloat(document.getElementById("resistance").value);

    let filled = 0;

    if (!isNaN(V)) filled++;
    if (!isNaN(I)) filled++;
    if (!isNaN(R)) filled++;

    if (filled !== 2) {
        result.innerHTML = `
        <div class="result-box">
            <span>Error</span>
            <strong>Please enter exactly two values.</strong>
        </div>`;
        return;
    }

    if (isNaN(R)) {

        const resistance = V / I;
        const power = V * I;

        result.innerHTML = `
        <div class="result-box">
            <span>Resistance</span>
            <strong>${resistance.toFixed(2)} Ω</strong>
        </div>

        <div class="result-box">
            <span>Power</span>
            <strong>${power.toFixed(2)} W</strong>
        </div>`;

    } else if (isNaN(I)) {

        const current = V / R;
        const power = V * current;

        result.innerHTML = `
        <div class="result-box">
            <span>Current</span>
            <strong>${current.toFixed(2)} A</strong>
        </div>

        <div class="result-box">
            <span>Power</span>
            <strong>${power.toFixed(2)} W</strong>
        </div>`;

    } else {

        const voltage = I * R;
        const power = voltage * I;

        result.innerHTML = `
        <div class="result-box">
            <span>Voltage</span>
            <strong>${voltage.toFixed(2)} V</strong>
        </div>

        <div class="result-box">
            <span>Power</span>
            <strong>${power.toFixed(2)} W</strong>
        </div>`;
    }

});

resetBtn.addEventListener("click", function () {

    document.getElementById("voltage").value = "";
    document.getElementById("current").value = "";
    document.getElementById("resistance").value = "";
    result.innerHTML = "";

});

const ohmModal = document.getElementById("ohmModal");

document.getElementById("openOhm").onclick = function () {
    ohmModal.style.display = "flex";
};

document.getElementById("closeOhm").onclick = function () {
    ohmModal.style.display = "none";
};

window.addEventListener("click", function (e) {
    if (e.target === ohmModal) {
        ohmModal.style.display = "none";
    }
});