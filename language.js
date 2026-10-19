document.addEventListener("DOMContentLoaded", function () {
    const langSelect = document.getElementById("language");

    if (langSelect) {
        langSelect.addEventListener("change", function () {
            const selectedLang = langSelect.value;
            const t = translations[selectedLang];

            if (!t) return;

            // Update Header & Hero
            document.querySelector(".topbar .logo span").textContent = t.title;
            document.querySelector(".hero h1").textContent = t.title;
            document.querySelector(".hero p").textContent = t.subtitle;

            // Update Dashboard Cards
            const cards = document.querySelectorAll(".dashboard .card");
            if (cards.length >= 6) {
                cards[0].querySelector("h3").textContent = t.ohmTitle;
                cards[0].querySelector("p").textContent = t.ohmDesc;
                cards[0].querySelector("button").textContent = t.openBtn;

                cards[1].querySelector("h3").textContent = t.resistorTitle;
                cards[1].querySelector("p").textContent = t.resistorDesc;
                cards[1].querySelector("button").textContent = t.openBtn;

                cards[2].querySelector("h3").textContent = t.capacitorTitle;
                cards[2].querySelector("p").textContent = t.capacitorDesc;
                cards[2].querySelector("button").textContent = t.openBtn;

                cards[3].querySelector("h3").textContent = t.cableTitle;
                cards[3].querySelector("p").textContent = t.cableDesc;
                cards[3].querySelector("button").textContent = t.openBtn;

                cards[4].querySelector("h3").textContent = t.vDropTitle;
                cards[4].querySelector("p").textContent = t.vDropDesc;
                cards[4].querySelector("button").textContent = t.openBtn;

                cards[5].querySelector("h3").textContent = t.batteryTitle;
                cards[5].querySelector("p").textContent = t.batteryDesc;
                cards[5].querySelector("button").textContent = t.openBtn;
            }

            // Update Footer
            const footer = document.querySelector(".footer .footer-content");
            if (footer) {
                footer.querySelector("h2").textContent = t.title;
                footer.querySelector("p").textContent = t.footerText;
            }

            // Set RTL for Arabic language
            if (selectedLang === "ar") {
                document.documentElement.setAttribute("dir", "rtl");
            } else {
                document.documentElement.setAttribute("dir", "ltr");
            }
        });
    }
});
