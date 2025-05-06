const gifs = [
  'img/one.gif',
  'img/two.gif',
  'img/three.gif',
  'img/four.gif',
  'img/five.gif',
  'img/six.gif',
]

const body = document.querySelector('body');
let current = 0;
function showNextGif() {
  body.style.backgroundImage = `url(${gifs[current]})`;
  current = (current + 1) % gifs.length;
}

setInterval(showNextGif, 3000);

class Quiz {
  constructor() {
    this.correct = 0;
    this.total = 0;
    this.current = 0;
    this.questions = null;
  }
  async getQuestions() {
    fetch('https://api.sampleapis.com/avatar/questions')
      .then(res => res.json())
      .then(data => {
        this.questions = data;
        this.total = data.length;
        this.setNextQuestion();
      })
  }
  setNextQuestion() {
    const quiz = document.querySelector('.quiz');
    quiz.innerHTML = '';
    const question = this.questions[this.current];
    if (question !== undefined) {
      quiz.innerHTML += `<p class="question">${question.question}</p>`
      question.possibleAnsers.forEach(answer => {
        quiz.innerHTML += `
          <div class="opt">
            <input type="radio" id="${answer.split(' ').join('_')}" name="${question.id}" value="${answer}">
            <label for="${answer.split(' ').join('_')}">${answer}</label>
          </div>
        `
      });
      quiz.innerHTML += `
        <button type="submit">Submit</button>
      `;
      document.querySelector('button').addEventListener('click', this.checkAnswer.bind(this));
    } else {
      quiz.innerHTML += `<h2>Congratulations, you have scored ${this.correct}/${this.total}</h2>`
    }
  }
  checkAnswer() {
    const question = this.questions[this.current];
    const chosenAnswer =  document.querySelector(`input[name="${question.id}"]:checked`)?.value;
    if (chosenAnswer == question.correctAnswer) {
      this.correct += 1;
    } else {
    }
    this.current += 1;
    console.log(this.current, this.correct, this.total);
    this.setNextQuestion();
  }
}

const quiz = new Quiz();
quiz.getQuestions();
