function generatePrompt() {
    const input = document.getElementById("sceneInput").value.trim();
    const box = document.getElementById("outputBox");
    if (!input) return alert("장면을 입력해주세요!");

    const text = `🎬 Sora2 Prompt
Model: sora-2
Resolution: 720x1280 (8.5s short)
Style: Cinematic lighting, natural motion, realistic environment
Scene: ${input}
Mood: Dynamic, engaging, visually expressive`;

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
    btn.addEventListener("click", e => {
        const text = document.getElementById("outputBox").textContent;
        if (text) navigator.clipboard.writeText(text);
        window.open(btn.dataset.link, "_blank");
    });
});
