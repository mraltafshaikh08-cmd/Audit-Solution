(function () {
  const scriptTag = document.currentScript;
  const apiKey = scriptTag ? scriptTag.getAttribute("data-api-key") : null;
  const backendUrl = (scriptTag && scriptTag.getAttribute("data-backend-url")) || window.location.origin;

  if (!apiKey) {
    console.error("Audit Widget: Missing data-api-key attribute.");
    return;
  }

  // Inject Styles
  const style = document.createElement("style");
  style.innerHTML = `
    .audit-widget-container {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      max-width: 500px;
      margin: 20px auto;
      padding: 24px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background: #ffffff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
      box-sizing: border-box;
    }
    .audit-widget-title { 
      font-size: 18px; 
      font-weight: 700; 
      margin-bottom: 8px; 
      color: #0f172a; 
      line-height: 1.3;
    }
    .audit-widget-subtitle {
      font-size: 13px;
      color: #64748b;
      margin-bottom: 16px;
    }
    .audit-widget-input {
      width: 100%; 
      padding: 11px 13px; 
      margin-bottom: 12px;
      border: 1px solid #cbd5e1; 
      border-radius: 8px; 
      box-sizing: border-box;
      font-size: 14px;
      color: #1e293b;
      outline: none;
      transition: border-color 0.2s;
    }
    .audit-widget-input:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
    }
    .audit-widget-btn {
      width: 100%; 
      padding: 12px; 
      background: #2563eb; 
      color: #ffffff;
      border: none; 
      border-radius: 8px; 
      font-weight: 700; 
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s, opacity 0.2s;
    }
    .audit-widget-btn:hover { background: #1d4ed8; }
    .audit-widget-btn:disabled { background: #94a3b8; cursor: not-allowed; }
    .audit-widget-status { 
      margin-top: 12px; 
      font-size: 13px; 
      color: #475569; 
      line-height: 1.4;
      text-align: center;
    }
    .audit-widget-badge {
      display: inline-block;
      font-size: 11px;
      color: #94a3b8;
      text-align: center;
      width: 100%;
      margin-top: 10px;
    }
  `;
  document.head.appendChild(style);

  // Inject Form HTML
  const container = document.getElementById("audit-lead-widget");
  if (!container) {
    console.error("Audit Widget: Element #audit-lead-widget not found.");
    return;
  }

  container.innerHTML = `
    <div class="audit-widget-container">
      <div class="audit-widget-title">Get Your Free Instant SEO & Web Audit</div>
      <div class="audit-widget-subtitle">Discover Core Web Vitals, technical crawlability & on-page fixes in seconds.</div>
      <input type="email" id="widget-lead-email" class="audit-widget-input" placeholder="Enter your work email address" required />
      <input type="url" id="widget-target-url" class="audit-widget-input" placeholder="https://yourwebsite.com" required />
      <button id="widget-submit-btn" class="audit-widget-btn">Run Audit Now</button>
      <div id="widget-status" class="audit-widget-status"></div>
      <div class="audit-widget-badge">Powered by AuditSolution Agency Network</div>
    </div>
  `;

  document.getElementById("widget-submit-btn").addEventListener("click", async function () {
    const emailInput = document.getElementById("widget-lead-email");
    const urlInput = document.getElementById("widget-target-url");
    const statusDiv = document.getElementById("widget-status");
    const btn = document.getElementById("widget-submit-btn");

    const email = emailInput ? emailInput.value.trim() : "";
    const url = urlInput ? urlInput.value.trim() : "";

    if (!email || !url) {
      statusDiv.style.color = "#dc2626";
      statusDiv.innerText = "Please fill in both email and website URL.";
      return;
    }

    btn.disabled = true;
    statusDiv.style.color = "#2563eb";
    statusDiv.innerText = "Running comprehensive audit... Please wait.";

    try {
      const response = await fetch(`${backendUrl}/api/v1/widget/audit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey
        },
        body: JSON.stringify({ email: email, target_url: url })
      });

      const data = await response.json();
      if (response.ok) {
        statusDiv.style.color = "#16a34a";
        statusDiv.innerHTML = `Audit Complete! Your report has been generated. <a href="${data.report_url || '#'}" target="_blank" style="color:#2563eb;font-weight:bold;text-decoration:underline;margin-left:4px;">View Report &rarr;</a>`;
        if (data.report_url) {
          try {
            window.open(data.report_url, "_blank");
          } catch(e) {}
        }
      } else {
        throw new Error(data.message || data.detail || "Failed to process audit request.");
      }
    } catch (err) {
      statusDiv.style.color = "#dc2626";
      statusDiv.innerText = err.message || "Network error occurred.";
    } finally {
      btn.disabled = false;
    }
  });
})();
