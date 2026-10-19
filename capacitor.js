document.addEventListener("DOMContentLoaded", function () {
    console.log("capacitor.js loaded");
    
    const result = document.getElementById("capacitorResult");
    const calculateBtn = document.getElementById("calculateCapacitor");
    const resetBtn = document.getElementById("resetCapacitor");
    const motorPowerInput = document.getElementById("motorPower");
    const capacitorModal = document.getElementById("capacitorModal");
    const openBtn = document.getElementById("openCapacitor");
    const closeBtn = document.getElementById("closeCapacitor");

    if (calculateBtn) {
        calculateBtn.addEventListener("click", function () {
            const hp = parseFloat(motorPowerInput.value);

            if (isNaN(hp) || hp <= 0) {
                result.innerHTML = `
                <div class="result-box">
                    <span>Error</span>
                    <strong>Please enter a valid motor power.</strong>
                </div>`;
                return;
            }

            const capacitor = hp * 50;

            result.innerHTML = `
            <div class="result-box">
                <span>Recommended Capacitor</span>
                <strong>${capacitor.toFixed(1)} µF</strong>
            </div>`;
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            motorPowerInput.value = "";
            result.innerHTML = "";
        });
    }

    if (openBtn && capacitorModal) {
        openBtn.onclick = function () {
            capacitorModal.style.display = "flex";
        };
    }

    if (closeBtn && capacitorModal) {
        closeBtn.onclick = function () {
            capacitorModal.style.display = "none";
        };
    }

    window.addEventListener("click", function (e) {
        if (capacitorModal && e.target === capacitorModal) {
            capacitorModal.style.display = "none";
        }
    });
});
