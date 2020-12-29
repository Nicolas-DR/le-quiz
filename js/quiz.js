const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "La COVID-19 est une maladie ?",
    choice1: "Exactement comme la grippe",
    choice2: "Annuelle",
    choice3: "Causée par une bactérie",
    choice4: "Nouvelle",
    answer: 4,
  },
  {
    question: "Une pandémie c’est",
    choice1: "Un synonyme du mot épidémie",
    choice2:
      "La propagation d’une nouvelle maladie, d'une maladie existante ou d'une nouvelle souche d'une maladie existante qui pourrait causer beaucoup de décès partout dans le monde",
    choice3: "Une autre mot pour désigner une flambée épidémique",
    choice4:
      "Une façon pour les compagnies pharmaceutiques de faire de l’argent en créant de nouveaux vaccins et médicaments",
    answer: 2,
  },
  {
    question: "La COVID-19 peut s’attraper par l’entremise",
    choice1: "Des animaux domestiques",
    choice2: "Des vaccins",
    choice3: "De surfaces contaminées",
    choice4: "De la 5G",
    answer: 3,
  },
  {
    question: "Un désinfectant pour les mains doit contenir au moins",
    choice1: "90% d’alcool",
    choice2: "40% de gel d’aloe vera",
    choice3: "Entre 60% et 80% d’alcool",
    choice4: "Assez d’alcool pour le sentir",
    answer: 3,
  },
  {
    question:
      "Lorsque vous croyez avoir été exposé au virus de la COVID-19, vous pouvez :",
    choice1: "Vous désinfecter les mains avec une lampe UV",
    choice2: "Pulvériser de l’eau de Javel sur votre corps",
    choice3:
      "Boire de petits verres de désinfectants tous les soirs pendant 7 jours",
    choice4:
      "Vous isoler de vos proches pendant 14 jours et surveiller l’apparition de symptômes",
    answer: 4,
  },
  {
    question: "Lorsqu’on a déjà attrapé la COVID-19 et qu’on a récupéré, on",
    choice1: "Est automatiquement immunisé contre la maladie, à vie",
    choice2: "Doit continuer de se protéger et de protéger les autres",
    choice3: "Ne peut plus jamais la transmettre aux autres",
    choice4: "Ne peut pas l’attraper à nouveau dans les mois qui suivent",
    answer: 2,
  },
];

const SCORE_POINTS = 1;
const MAX_QUESTIONS = 6;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("./end.html");
  }

  questionCounter++;
  progressText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "vrai" : "faux";

    if (classToApply === "vrai") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
