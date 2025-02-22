const canvas = document.getElementById("fireworkCanvas");
const ctx = canvas.getContext("2d");
alert("Melanie");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function randColor() {
    return `hsl(${Math.random() * 360}, 100%, 60%)`;
}

function makeFullCircleFirework(fire) {
    let color = randColor();
    let velocity = Math.random() * 8 + 8;
    let max = 30;

    for (let i = 0; i < max; i++) {
        let rad = (i * Math.PI * 2) / max;
        let firework = {
            x: fire.x,
            y: fire.y,
            size: Math.random() * 1.5 + 1,
            fill: color,
            vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
            vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
            ay: 0.06,
            alpha: 1,
            life: Math.round((Math.random() * 50) / 2) + 20
        };
        fireworks.push(firework);
    }
}

function makeStarFirework(fire) {
    let color = randColor();
    let velocity = Math.random() * 8 + 8;
    let max = 10;

    for (let i = 0; i < max; i++) {
        let rad = (i * Math.PI * 2) / max;
        let firework = {
            x: fire.x,
            y: fire.y,
            size: Math.random() * 1.5 + 1,
            fill: color,
            vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
            vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
            ay: 0.06,
            alpha: 1,
            life: Math.round((Math.random() * 50) / 2) + 20
        };
        fireworks.push(firework);
    }
}

function makeHeartFirework(fire) {
    let color = randColor();
    let velocity = Math.random() * 8 + 8;
    let max = 30;

    for (let i = 0; i < max; i++) {
        let t = (i / max) * Math.PI * 2;
        let x = 16 * Math.sin(t) ** 3;
        let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        let firework = {
            x: fire.x,
            y: fire.y,
            size: Math.random() * 1.5 + 1,
            fill: color,
            vx: x * velocity * 0.1 + (Math.random() - 0.5) * 0.5,
            vy: y * velocity * 0.1 + (Math.random() - 0.5) * 0.5,
            ay: 0.06,
            alpha: 1,
            life: Math.round((Math.random() * 50) / 2) + 20
        };
        fireworks.push(firework);
    }
}

let fireworks = [];

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((fire, index) => {
        fire.x += fire.vx;
        fire.y += fire.vy;
        fire.vy += fire.ay;
        fire.alpha -= 0.01;

        ctx.globalAlpha = fire.alpha;
        ctx.fillStyle = fire.fill;
        ctx.beginPath();
        ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
        ctx.fill();

        if (fire.alpha <= 0) fireworks.splice(index, 1);
    });

    requestAnimationFrame(animate);
}

function randomFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const types = [makeFullCircleFirework, makeStarFirework, makeHeartFirework];
    const type = types[Math.floor(Math.random() * types.length)];
    type({ x, y });
}

setInterval(randomFirework, 1000);

animate();