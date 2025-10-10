function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildPrompt() {
  const inputs = [
    document.getElementById("sceneInput1").value.trim(),
    document.getElementById("sceneInput2").value.trim(),
    document.getElementById("sceneInput3").value.trim()
  ];

  const camera = ["Wide shot", "Close-up", "Tracking", "Dolly zoom", "Overhead"];
  const lighting = ["Neon reflections", "Cinematic glow", "Soft rim light", "Golden hour", "Dark moody"];
  const mood = ["Epic", "Futuristic", "Emotional", "Suspenseful", "Romantic"];

  let output = "🎬 **Sora2 v10.0 — Quantum Prompt**\n";
  output += "Model: sora-2\nResolution: 720x1280 (Vertical · 8.5s)\n\n";

  inputs.forEach((scene, i) => {
    if (scene) {
      output += `Cut ${i + 1} — Scene: ${scene}\n`;
      output += `• Camera: ${random(camera)}\n• Lighting: ${random(lighting)}\n• Mood: ${random(mood)}\n\n`;
    }
  });

  output += "🎥 Notes: Keep shots cinematic and fluid. No logos or real persons.";
  document.getElementById("outputBox").textContent = output;
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const cut = tab.dataset.cut;
    for (let i = 1; i <= 3; i++) {
      document.getElementById(`sceneInput${i}`).style.display = i == cut ? "block" : "none";
    }
  });
});

document.querySelectorAll("textarea").forEach(area => {
  area.addEventListener("input", buildPrompt);
});

document.getElementById("generateBtn").addEventListener("click", buildPrompt);

document.getElementById("copyBtn").addEventListener("click", () => {
  const text = document.getElementById("outputBox").textContent;
  if (!text) return alert("복사할 프롬프트가 없습니다.");
  navigator.clipboard.writeText(text);
  showToast("✅ 프롬프트 복사 완료!");
});

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

document.querySelectorAll(".review-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const text = document.getElementById("outputBox").textContent;
    if (text) navigator.clipboard.writeText(text);
    window.open(btn.dataset.link, "_blank");
  });
});
