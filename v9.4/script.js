/* v9.4 script.js: modular version of the Director's View logic */
/* PRESETS */
const PRESETS = {
  shots:[ 'Wide establishing shot','Medium tracking shot','Close-up detail','Overhead drone','Dutch angle' ],
  motions:[ 'Smooth push-in','Handheld slight shake','Swooping arc','Rapid dolly-zoom','AI autonomous motion' ],
  lights:[ 'Warm golden hour','High contrast neon','Soft diffused','Dark ambient neon' ],
  moods:[ 'Nostalgic & ethereal','Intense & suspenseful','Calm & reflective','Uplifting & hopeful' ]
};

/* helper: create pills for each target */
function renderPillsFor(targetPrefix){
  ['Shot','Motion','Light','Mood'].forEach(cat=>{
    const container = document.getElementById(`${targetPrefix}${cat}`);
    container.innerHTML = '';
    const list = PRESETS[cat.toLowerCase()];
    list.forEach((label, idx)=>{
      const d = document.createElement('div');
      d.className = 'pill';
      d.textContent = label;
      d.dataset.value = label;
      if(idx===0) d.classList.add('active');
      d.addEventListener('click', ()=>{
        container.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
        d.classList.add('active');
      });
      container.appendChild(d);
    });
  });
}

/* initialize pills for all cuts */
['cut1','cut2','cut3'].forEach(prefix => renderPillsFor(prefix));

/* tab switching */
document.querySelectorAll('.tab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    const which = tab.dataset.cut;
    document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active', t===tab));
    document.querySelectorAll('.cut-form').forEach(f=> f.style.display = (f.dataset.cut===which? '' : 'none'));
  });
});

/* get selected pill */
function selectedValue(prefix, cat){
  const node = document.querySelectorAll(`#${prefix}${cat} .pill`);
  const found = Array.from(node).find(n=> n.classList.contains('active'));
  return found ? found.dataset.value : '';
}

/* build cut text */
function buildCutText(n){
  const scene = document.getElementById(`cut${n}Scene`).value.trim() || '(description omitted)';
  const shot = selectedValue(`cut${n}`, 'Shot');
  const motion = selectedValue(`cut${n}`, 'Motion');
  const light = selectedValue(`cut${n}`, 'Light');
  const mood = selectedValue(`cut${n}`, 'Mood');
  return `Cut ${n}: ${scene}. Cinematography: ${shot}${motion? ', ' + motion : ''}. Lighting: ${light}. Mood: ${mood}.`;
}

/* generate */
document.getElementById('generateBtn').addEventListener('click', ()=>{
  const c1 = buildCutText(1);
  const c2 = buildCutText(2);
  const c3 = buildCutText(3);
  let prompt = '';
  prompt += "=== API Parameters ===\nModel: sora-2\nResolution: 720x1280\nDuration: 8.5s\n\n";
  prompt += "=== Visual Style ===\nNeon purple cinematic realism, wet-surface reflections, subtle film grain.\n\n";
  prompt += `${c1}\n${c2}\n${c3}\n\n`;
  prompt += "=== Production Notes ===\n- Smooth transitions, readable silhouettes, avoid copyrighted elements.\n";
  document.getElementById('outputBox').textContent = prompt;
  document.getElementById('outputBox').scrollIntoView({behavior:'smooth'});
});

/* copy */
document.getElementById('copyBtn').addEventListener('click', ()=>{
  const txt = document.getElementById('outputBox').textContent;
  if(!txt || txt.includes('아직')) return alert('먼저 프롬프트를 생성하세요.');
  navigator.clipboard.writeText(txt).then(()=> alert('✅ 복사 완료'));
});
