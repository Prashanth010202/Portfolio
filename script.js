// --- TYPING ANIMATION ---
const roles = ["Software Engineer", "Android Developer", "Web Developer"];
let i = 0, j = 0, isDeleting = false;

function type() {
    let text = roles[i];
    const typingEl = document.getElementById("typing");
    
    typingEl.textContent = isDeleting ? text.substring(0, j--) : text.substring(0, j++);

    if (!isDeleting && j === text.length) {
        isDeleting = true;
        setTimeout(type, 1200);
        return;
    }
    if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % roles.length;
    }
    setTimeout(type, isDeleting ? 50 : 100);
}
type();

// --- THEME TOGGLE WITH PERSISTENCE ---
const themeBtn = document.getElementById("themeToggle");
// Load saved theme
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add("light");
    themeBtn.textContent = "☀️";
}

themeBtn.onclick = () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeBtn.textContent = isLight ? "☀️" : "🌙";
};

// --- PARTICLES ---
if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        particles: { number: { value: 80 }, size: { value: 3 }, move: { speed: 2 } }
    });
}

// --- MODAL LOGIC ---
const modal = document.getElementById("resumeModal");
function openModal() { modal.style.display = "flex"; }
function closeModal() { modal.style.display = "none"; }

window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
};

// --- CURSOR & TRAIL LOGIC ---
const cursor = document.querySelector(".cursor");
const canvas = document.getElementById("trail");
const ctx = canvas.getContext("2d");
let particles = [];
let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Add trail particles
    particles.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 5 + 2,
        life: 100
    });
});

function updateCursorAndTrail() {
    // Smooth Cursor follow
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;
    cursor.style.left = posX + "px";
    cursor.style.top = posY + "px";

    // Animate Trail
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let k = 0; k < particles.length; k++) {
        let p = particles[k];
        p.life--;
        p.size *= 0.96;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 247, 255, 0.6)";
        ctx.fill();

        if (p.life <= 0) {
            particles.splice(k, 1);
            k--;
        }
    }
    requestAnimationFrame(updateCursorAndTrail);
}
updateCursorAndTrail();

// --- INTERACTIVE ELEMENTS (Hover Scale) ---
document.querySelectorAll("a, button, .card, .btn").forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(2.5)";
        cursor.style.background = "rgba(0, 247, 255, 0.3)";
    });
    el.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursor.style.background = "#00f7ff";
    });
});

// --- MAGNETIC BUTTONS ---
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0)";
    });
});

// --- EXTERNAL LIBRARIES INIT ---
AOS.init({ duration: 1000, once: true });

if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
    });

}