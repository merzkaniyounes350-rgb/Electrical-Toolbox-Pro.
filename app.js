document.addEventListener("DOMContentLoaded", function () {

    const card = document.querySelector("#openOhm");
    const modal = document.querySelector("#ohmModal");
    const close = document.querySelector("#closeOhm");

    if (!card) {
        alert("Card not found");
        return;
    }

    if (!modal) {
        alert("Modal not found");
        return;
    }

    if (!close) {
        alert("Close button not found");
        return;
    }

    card.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    close.addEventListener("click", function () {
        modal.style.display = "none";
    });

    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

});