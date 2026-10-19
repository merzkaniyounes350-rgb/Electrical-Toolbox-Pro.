/*
 * Electrical Toolbox Pro v2.0
 * Copyright (c) 2026 YOUNES PROD. All Rights Reserved.
 *
 * This source code is licensed under the terms agreed upon purchase.
 * Unauthorized distribution or reselling as a standalone item is strictly prohibited.
 * For extended usage or white-label customization, contact YOUNES PROD.
 */

/*
 * Electrical Toolbox Pro - HTML5 Electrical Calculators
 * Copyright (c) 2026 YOUNES PROD
 * All Rights Reserved.
 */

document.addEventLi
stener("DOMContentLoaded", function () {
    const langSelect = document.getElementById("language");

    if (langSelect) {
        langSelect.addEventListener("change", function () {
            const selectedLang = langSelect.value;
            const t = translations[selectedLang];

            if (!t) return;

            // تحديث النصوص مباشرة بدون دوال فرعية
            document.querySelector(".topbar .logo span").textContent = t.title;
            document.querySelector(".hero h1").textContent = t.title;
            document.querySelector(".hero p").textContent = t.subtitle;

            // تحديث كروت الحاسبات
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

            // تحديث الفوتر
            const footer = document.querySelector(".footer .footer-content");
            if (footer) {
                footer.querySelector("h2").textContent = t.title;
                footer.querySelector("p").textContent = t.footerText;
            }

            // دعم اتجاه اللغة العربية (RTL)
            if (selectedLang === "ar") {
                document.documentElement.setAttribute("dir", "rtl");
            } else {
                document.documentElement.setAttribute("dir", "ltr");
            }
        });
    }
});
