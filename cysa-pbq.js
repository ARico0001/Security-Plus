/* ============================================================
   CySA+ PBQ Suite — Full Interactivity
   Morning Light Solutions
   ============================================================ */

/* ------------------------------------------------------------
   UTILITIES
------------------------------------------------------------ */

function addFlagging(tableSelector) {
    const rows = document.querySelectorAll(`${tableSelector} tbody tr`);
    rows.forEach((row) => {
        row.addEventListener("click", () => {
            row.classList.toggle("flagged");
        });
    });
}

function resetDropdowns(dropdownIds) {
    dropdownIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });
}

function clearFeedback(id) {
    const fb = document.getElementById(id);
    if (fb) fb.textContent = "";
}

/* ------------------------------------------------------------
   TAB 1 — Vulnerability Management
------------------------------------------------------------ */

function initVulnPBQ() {
    if (!document.querySelector(".vuln-table")) return;

    addFlagging(".vuln-table");

    const correctFlags = [1, 2, 3, 4, 6]; // based on your PBQ content

    document.getElementById("submitBtn").addEventListener("click", () => {
        const feedback = document.getElementById("feedback");

        const flagged = [...document.querySelectorAll(".vuln-table tbody tr.flagged")]
            .map(row => [...row.parentNode.children].indexOf(row));

        const flagsCorrect =
            JSON.stringify(flagged.sort()) === JSON.stringify(correctFlags.sort());

        const q1 = document.getElementById("q1").value === "DNS Tunneling / Exfiltration";
        const q2 = document.getElementById("q2").value === "Lateral Movement";
        const q3 = document.getElementById("q3").value === "WKS-114";

        if (flagsCorrect && q1 && q2 && q3) {
            feedback.textContent = "✔ All answers correct!";
            feedback.style.color = "#0b8f3a";
        } else {
            feedback.textContent = "❌ Some answers are incorrect.";
            feedback.style.color = "#c62828";
        }
    });

    document.getElementById("resetBtn").addEventListener("click", () => {
        document.querySelectorAll(".vuln-table tbody tr.flagged")
            .forEach(r => r.classList.remove("flagged"));

        resetDropdowns(["q1", "q2", "q3"]);
        clearFeedback("feedback");
    });
}

/* ------------------------------------------------------------
   TAB 2 — Security Operations
   (Example PBQ: SIEM log classification)
------------------------------------------------------------ */

function initSecOpsPBQ() {
    if (!document.querySelector(".secops-table")) return;

    addFlagging(".secops-table");

    const correctFlags = [0, 3, 5]; // example suspicious entries

    document.getElementById("secopsSubmit").addEventListener("click", () => {
        const fb = document.getElementById("secopsFeedback");

        const flagged = [...document.querySelectorAll(".secops-table tbody tr.flagged")]
            .map(row => [...row.parentNode.children].indexOf(row));

        const flagsCorrect =
            JSON.stringify(flagged.sort()) === JSON.stringify(correctFlags.sort());

        const q1 = document.getElementById("soq1").value === "Privilege Escalation";
        const q2 = document.getElementById("soq2").value === "Beaconing";

        if (flagsCorrect && q1 && q2) {
            fb.textContent = "✔ Correct — Security Operations PBQ complete.";
            fb.style.color = "#0b8f3a";
        } else {
            fb.textContent = "❌ Incorrect — review the SIEM logs.";
            fb.style.color = "#c62828";
        }
    });

    document.getElementById("secopsReset").addEventListener("click", () => {
        document.querySelectorAll(".secops-table tbody tr.flagged")
            .forEach(r => r.classList.remove("flagged"));

        resetDropdowns(["soq1", "soq2"]);
        clearFeedback("secopsFeedback");
    });
}

/* ------------------------------------------------------------
   TAB 3 — Incident Response
   (Example PBQ: IR lifecycle ordering)
------------------------------------------------------------ */

function initIncidentPBQ() {
    const list = document.getElementById("irList");
    if (!list) return;

    let dragSrc = null;

    list.querySelectorAll("li").forEach(li => {
        li.addEventListener("dragstart", (e) => {
            dragSrc = li;
            e.dataTransfer.setData("text/plain", li.textContent);
        });

        li.addEventListener("dragover", (e) => e.preventDefault());

        li.addEventListener("drop", (e) => {
            e.preventDefault();
            if (dragSrc !== li) {
                const temp = dragSrc.textContent;
                dragSrc.textContent = li.textContent;
                li.textContent = temp;
            }
        });
    });

    const correctOrder = [
        "Preparation",
        "Detection & Analysis",
        "Containment",
        "Eradication",
        "Recovery",
        "Post-Incident Activity"
    ];

    document.getElementById("irSubmit").addEventListener("click", () => {
        const fb = document.getElementById("irFeedback");

        const userOrder = [...list.querySelectorAll("li")].map(li => li.textContent.trim());

        const correct =
            JSON.stringify(userOrder) === JSON.stringify(correctOrder);

        fb.textContent = correct
            ? "✔ Correct IR sequence!"
            : "❌ Incorrect IR sequence — review NIST lifecycle.";
        fb.style.color = correct ? "#0b8f3a" : "#c62828";
    });

    document.getElementById("irReset").addEventListener("click", () => {
        clearFeedback("irFeedback");
    });
}

/* ------------------------------------------------------------
   TAB 4 — Reporting & Communication
   (Example PBQ: classify report types)
------------------------------------------------------------ */

function initReportingPBQ() {
    if (!document.getElementById("repSubmit")) return;

    document.getElementById("repSubmit").addEventListener("click", () => {
        const fb = document.getElementById("repFeedback");

        const q1 = document.getElementById("rep1").value === "Executive Summary";
        const q2 = document.getElementById("rep2").value === "Technical Report";
        const q3 = document.getElementById("rep3").value === "Post-Incident Report";

        if (q1 && q2 && q3) {
            fb.textContent = "✔ Reporting PBQ complete!";
            fb.style.color = "#0b8f3a";
        } else {
            fb.textContent = "❌ Incorrect — check report classifications.";
            fb.style.color = "#c62828";
        }
    });

    document.getElementById("repReset").addEventListener("click", () => {
        resetDropdowns(["rep1", "rep2", "rep3"]);
        clearFeedback("repFeedback");
    });
}

/* ------------------------------------------------------------
   INITIALIZE ALL PBQs
------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
    initVulnPBQ();
    initSecOpsPBQ();
    initIncidentPBQ();
    initReportingPBQ();
});

/* ------------------------------------------------------------
   GLOBAL FLAG STYLE
------------------------------------------------------------ */

const style = document.createElement("style");
style.textContent = `
    .flagged {
        background-color: #fff3c4 !important;
        transition: background 0.2s ease;
    }
`;
document.head.appendChild(style);
