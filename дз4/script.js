const button = document.getElementById('btn');
const resultText = document.getElementById('result');

function getRandomValue() {
    return Math.floor(Math.random() * 256);
}

function getRandomRGB() {
    const r = getRandomValue();
    const g = getRandomValue();
    const b = getRandomValue();
    return { r, g, b };
}

function changeBackgroundColor() {
    const { r, g, b } = getRandomRGB();
    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    document.body.style.backgroundColor = rgbColor;
    resultText.textContent = `${rgbColor}`;
}

button.addEventListener('click', changeBackgroundColor);
