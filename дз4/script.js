const button = document.getElementById('btn');
const resultText = document.getElementById('result');

function getRandomColorValue() {
    return Math.floor(Math.random() * 256);
}

function getRandomRGB() {
    const r = getRandomColorValue();
    const g = getRandomColorValue();
    const b = getRandomColorValue();
    return { r, g, b };
}

function changeBackgroundColor() {
    const { r, g, b } = getRandomRGB();
    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    document.body.style.backgroundColor = rgbColor;
    resultText.textContent = `${rgbColor}`;
}

button.addEventListener('click', changeBackgroundColor);