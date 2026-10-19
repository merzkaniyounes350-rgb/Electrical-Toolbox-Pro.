const resistorResult = document.getElementById("resistorResult");

document.getElementById("calculateResistor").addEventListener("click", function () {

    const b1 = document.getElementById("band1").value;
    const b2 = document.getElementById("band2").value;
    const mult = document.getElementById("multiplier").value;

    if (b1 === "" || b2 === "" || mult === "") {
        resistorResult.innerHTML = `
        <div class="result-box">
            <span>Error</span>
            <strong>Please select all colors.</strong>
        </div>`;
        return;
    }

    const value = parseInt(b1 + b2) * parseInt(mult);

    resistorResult.innerHTML = `
    <div class="result-box">
        <span>Resistance</span>
        <strong>${value} Ω</strong>
    </div>`;
});

document.getElementById("resetResistor").addEventListener("click", function () {

    document.getElementById("band1").selectedIndex = 0;
    document.getElementById("band2").selectedIndex = 0;
    document.getElementById("multiplier").selectedIndex = 0;

    resistorResult.innerHTML = "";

});

const resistorModal = document.getElementById("resistorModal");

document.getElementById("openResistor").onclick = function () {
    resistorModal.style.display = "flex";
};

document.getElementById("closeResistor").onclick = function () {
    resistorModal.style.display = "none";
};

window.addEventListener("click", function (e) {
    if (e.target === resistorModal) {
        resistorModal.style.display = "none";
    }
});