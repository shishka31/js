const quiz = [
  {
    question: "Сколько будет 2+2?",
    options: [2, 3, 4, 5],
    correct: 4
  },
  {
    question: "Столица Франции?",
    options: ["Берлин", "Париж", "Рим"],
    correct: "Париж"
  },
  {
    question: "JS это?",
    options: ["Язык", "База данных", "ОС"],
    correct: "Язык"
  }
]

let correctAnswersCount = 0;

for (let i = 0; i < quiz.length; i++) {
  const item = quiz[i];

  const optionsStr = item.options.join(", ");

  const userAnswer = prompt(`${item.question}\nВарианты: ${optionsStr}\nВведите ваш ответ:`);

  if (userAnswer !== null && String(userAnswer).trim() === String(item.correct)) {
    correctAnswersCount++;
    alert("Правильно!");
  } else {
    alert(`Неправильно. Правильный ответ: ${item.correct}`);
  }
}

alert(`Игра окончена! Вы ответили правильно на ${correctAnswersCount} из ${quiz.length} вопросов.`)