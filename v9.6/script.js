function generatePrompt() {
    const input = document.getElementById("sceneInput").value.trim();
    const box = document.getElementById("outputBox");
    if (!input) return alert("장면 설명을 입력해주세요!");

    const camera = ["Wide shot", "Close-up", "Tracking shot", "Dolly zoom"];
    const lighting = ["Neon reflections", "Rainy mood", "Golden hour", "Low key cinematic"];
    const mood = ["Dynamic", "Melancholic", "Futuristic", "Dramatic", "Peaceful"];

    const random = arr => arr[Math.floor(Math.random() * arr.length)];

    const text = `🎬 Sora2 Prompt v9.6
Model: sora-2
Resolution: 720x1280 (Vertical · 8.5s short)
Style: Cinematic, detailed, realistic lighting
Scene: ${input}
Camera: ${random(camera)}
Lighting: ${random(lighting)}
Mood: ${random(mood)}
Notes: Keep motion smooth and natural. Avoid copyrighted visuals. Maintain visual storytelling integrity.`;

    box.textContent = text;
}

function copyPrompt() {
    const text = document.getElementById("outputBox").textContent;
    if (!text) return alert("복사할 프롬프트가 없습니다.");
    navigator.clipboard.writeText(text);
    showToast();
}

function showToast() {
    const toast = document.getElementById("toast");
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
