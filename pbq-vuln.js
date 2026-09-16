/* ============================================================
   CySA+ PBQ — Vulnerability Management Interactivity
   Morning Light Solutions
   ============================================================ */

/* -----------------------------
   1. Row Flagging
----------------------------- */

document.querySelectorAll(".vuln-table tbody tr").forEach((row) => {
    row.addEventListener("click", () => {
        row.classList.toggle("flagged");
    });
});

/* -----------------------------
   2. Grading Logic
----------------------------- */

document.getElementById("submitBtn").addEventListener("click", () => {
    const feedback = document.getElementById("feedback");

    /* Correct flagged rows based on the PBQ content:
       These indexes match the suspicious entries in your tab:
       - DNS tunneling attempts
       - Lateral movement
       - WKS‑114 compromise
    */
    const correctFlags = [1, 2, 3, 4, 6]; // zero‑based row indexes

    const flagged = [...document.querySelectorAll(".vuln-table tbody tr.flagged")]
        .map((row) => [...row.parentNode.children].indexOf(row));

    const flagsCorrect =
        JSON.stringify(flagged.sort()) === JSON.stringify(correctFlags.sort());

    /* Dropdown answers */
    const q1 = document.getElementById("q1").value === "DNS Tunneling / Exfiltration";
    const q2 = document.getElementById("q2").value === "Lateral Movement";
    const q3 = document.getElementById("q3").value === "WKS-114";

    if (flagsCorrect && q1 && q2 && q3) {
        feedback.textContent = "✔ All answers correct! Excellent work.";
        feedback.style.color = "#0b8f3a";
    } else {
        feedback.textContent = "❌ Some answers are incorrect. Review the logs and try again.";
        feedback.style.color = "#c62828";
    }
});

/* -----------------------------
   3. Reset Button
----------------------------- */

document.getElementById("resetBtn").addEventListener("click", () => {
    document.querySelectorAll(".vuln-table tbody tr.flagged")
        .forEach((row) => row.classList.remove("flagged"));

    document.getElementById("q1").value = "";
    document.getElementById("q2").value = "";
    document.getElementById("q3").value = "";

    document.getElementById("feedback").textContent = "";
});

/* -----------------------------
   4. Highlight Style (optional)
----------------------------- */

const style = document.createElement("style");
style.textContent = `
    .flagged {
        background-color: #fff3c4 !important;
        transition: background 0.2s ease;
    }
`;
document.head.appendChild(style);
