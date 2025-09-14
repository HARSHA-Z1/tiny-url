const shortenBtn = document.getElementById("shortenBtn");
const longUrlInput = document.getElementById("longUrlInput");
const shortenedResult = document.getElementById("shortenedResult");

shortenBtn.addEventListener("click", async () => {
  const longUrl = longUrlInput.value.trim();
  if (!longUrl) return;
  shortenedResult.textContent = "Generating...";

  try {
    const response = await fetch("http://localhost:8080/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: longUrl })
    });
    const data = await response.json();

    // Display short URL and Copy button below
    shortenedResult.innerHTML = `
      <a href="${data.url}" target="_blank">${data.url}</a>
      <button class="copy-btn" onclick="navigator.clipboard.writeText('${data.url}')">Copy</button>
    `;
  } catch (err) {
    shortenedResult.textContent = "Error creating short URL";
    console.error(err);
  }
});