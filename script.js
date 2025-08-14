const cube = document.getElementById("cube");
let rotateX = 0;
let rotateY = 0;
let velocityX = 0;
let velocityY = 0;
let lastX = null;
let lastY = null;
let isAnimating = false;
const friction = 0.95;

// 🖱️ الماوس
document.querySelector('.cube-container').addEventListener('mousemove', (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (lastX !== null && lastY !== null) {
    const dx = x - lastX;
    const dy = y - lastY;

    velocityY = dx * 0.5;
    velocityX = -dy * 0.5;

    rotateX += velocityX;
    rotateY += velocityY;

    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  lastX = x;
  lastY = y;
});

document.querySelector('.cube-container').addEventListener('mouseleave', () => {
  lastX = null;
  lastY = null;
  if (!isAnimating) animateInertia();
});

// 📱 اللمس
document.querySelector('.cube-container').addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  const rect = e.target.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  if (lastX !== null && lastY !== null) {
    const dx = x - lastX;
    const dy = y - lastY;

    velocityY = dx * 0.5;
    velocityX = -dy * 0.5;

    rotateX += velocityX;
    rotateY += velocityY;

    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  lastX = x;
  lastY = y;
});

document.querySelector('.cube-container').addEventListener('touchend', () => {
  lastX = null;
  lastY = null;
  if (!isAnimating) animateInertia();
});

function animateInertia() {
  isAnimating = true;
  function step() {
    velocityX *= friction;
    velocityY *= friction;

    rotateX += velocityX;
    rotateY += velocityY;

    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    if (Math.abs(velocityX) > 0.01 || Math.abs(velocityY) > 0.01) {
      requestAnimationFrame(step);
    } else {
      isAnimating = false;
    }
  }
  requestAnimationFrame(step);
}
