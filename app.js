// Grab elements once so we can reuse them
const input = document.getElementById("qr-input");
const btn   = document.getElementById("qr-btn");
const box   = document.getElementById("qr-result");
const dl    = document.getElementById("dl");

let qr;     // will hold our QRCode object

btn.addEventListener("click", () => {
  const text = input.value.trim();

  // Simple validation
  if (!text) {
    alert("Please enter text or a URL first 🙂");
    return;
  }

  // First click? create; Later clicks? clear + recreate
  if (qr) box.innerHTML = "";
  qr = new QRCode(box, {
    text,
    width: 200,
    height: 200,
  });

  /* Wait a tick for the canvas/img to actually render
     then extract its data‑URL so we can download it */
  setTimeout(() => {
    const img = box.querySelector("img") || box.querySelector("canvas");
    dl.href = img.src;
    dl.hidden = false;
  }, 50);
});

// Also hit ENTER to generate
input.addEventListener("keyup", e => {
  if (e.key === "Enter") btn.click();
});
