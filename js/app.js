const defaultState = {
  xp: 0,
  completed: [],
  streak: 0,
  lastVisit: null
};

let state = loadState();

let currentCourse = null;
let currentLesson = null;
let questionIndex = 0;
let selectedAnswer = null;
let answered = false;


// LOAD AND SAVE PROGRESS

function loadState() {
  try {
    return {
      ...defaultState,
      ...JSON.parse(
        localStorage.getItem("hs-learning-state") || "{}"
      )
    };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(
    "hs-learning-state",
    JSON.stringify(state)
  );

  updateStats();
}


// UPDATE USER STATISTICS

function updateStats() {
  document.getElementById("xp").textContent = state.xp;
  document.getElementById("streak").textContent = state.streak;

  document.getElementById("profileXP").textContent =
    state.xp + " XP";

  document.getElementById("completedCount").textContent =
    state.completed.length;

  document.getElementById("profileStreak").textContent =
    state.streak + " days";
}


// DAILY STREAK SYSTEM

function registerVisit() {
  const today = new Date().toISOString().slice(0, 10);

  if (state.lastVisit !== today) {
    if (state.lastVisit) {
      const previous = new Date(
        state.lastVisit + "T00:00:00"
      );

      const current = new Date(
        today + "T00:00:00"
      );

      const diff = Math.round(
        (current - previous) / 86400000
      );

      state.streak =
        diff === 1 ? state.streak + 1 : 1;
    } else {
      state.streak = 1;
    }

    state.lastVisit = today;
    saveState();
  }
}


// PAGE NAVIGATION

function showPage(page) {
  ["home", "courses", "lesson", "museum", "profile"]
    .forEach(p => {
      document
        .getElementById(p + "Page")
        .classList.toggle("hidden", p !== page);
    });

  document.querySelectorAll("nav button").forEach(b => {
    b.classList.toggle(
      "active",
      b.dataset.page === page ||
      (page === "lesson" && b.dataset.page === "courses")
    );
  });

  if (page === "profile") {
    renderProfile();
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

document.querySelectorAll("nav button").forEach(b => {
  b.addEventListener("click", () => {
    showPage(b.dataset.page);
  });
});


// COURSE PROGRESS

function courseProgress(course) {
  const lessonIds = course.lessons.map(l => l.id);

  const done = lessonIds.filter(id =>
    state.completed.includes(id)
  ).length;

  return Math.round(
    done / lessonIds.length * 100
  );
}


// DISPLAY DEPARTMENTS

function renderDepartments() {
  document.getElementById("departmentGrid").innerHTML =
    DEPARTMENTS.map(d => `
      <article class="card">
        <div class="dept-icon">${d.icon}</div>
        <h3>${d.name}</h3>
        <p>${d.desc}</p>
        <span class="meta">
          ${COURSES.filter(c => c.department === d.id).length}
          course(s)
        </span>
      </article>
    `).join("");
}


// COURSE CARDS

function courseCard(c) {
  const d = DEPARTMENTS.find(
    x => x.id === c.department
  );

  const progress = courseProgress(c);

  return `
    <article class="card">

      <div class="course-row">
        <span class="tag">${d.name}</span>
        <span class="meta">${c.level}</span>
      </div>

      <h3 style="margin-top:13px">${c.title}</h3>

      <p>${c.description}</p>

      <div class="progress">
        <span style="width:${progress}%"></span>
      </div>

      <div class="course-row">
        <span class="meta">
          ${progress}% complete
        </span>

        <button
          class="button"
          onclick="openCourse('${c.id}')"
        >
          Open course
        </button>
      </div>

    </article>
  `;
}


function renderCourses() {
  document.getElementById("allCourses").innerHTML =
    COURSES.map(courseCard).join("");

  document.getElementById("featuredCourses").innerHTML =
    COURSES.slice(0, 3).map(courseCard).join("");
}


// OPEN A COURSE

function openCourse(id) {
  currentCourse = COURSES.find(c => c.id === id);

  if (!currentCourse) return;

  const d = DEPARTMENTS.find(
    x => x.id === currentCourse.department
  );

  document.getElementById("lessonDepartment").textContent =
    d.name + " • " + currentCourse.level;

  document.getElementById("lessonTitle").textContent =
    currentCourse.title;

  document.getElementById("lessonDescription").textContent =
    currentCourse.description;

  const list = document.createElement("div");

  list.className = "lesson-list";

  list.innerHTML = currentCourse.lessons.map((l, i) => `
    <div class="lesson-item">

      <div>
        <strong>${i + 1}. ${l.title}</strong>

        <div class="meta">
          ${l.questions.length} questions •
          ${state.completed.includes(l.id)
            ? "Completed"
            : "Not completed"}
        </div>
      </div>

      <button onclick="startLesson('${l.id}')">
        ${state.completed.includes(l.id) ? "Review" : "Start"}
      </button>

    </div>
  `).join("");

  document
    .getElementById("lessonPage")
    .querySelector(".lesson-layout")
    .innerHTML = `
      <div class="card">
        <h3>Course lessons</h3>
        <div class="lesson-list">
          ${list.innerHTML}
        </div>
      </div>

      <aside class="card">
        <h3>Course overview</h3>
        <p>${currentCourse.description}</p>
        <div class="meta">
          ${currentCourse.lessons.length} lessons
        </div>
      </aside>
    `;

  showPage("lesson");
}


// START A LESSON

function startLesson(id) {
  currentLesson = currentCourse.lessons.find(
    l => l.id === id
  );

  questionIndex = 0;
  selectedAnswer = null;
  answered = false;

  document
    .getElementById("lessonPage")
    .querySelector(".lesson-layout")
    .innerHTML = `

      <div class="card">

        <div class="meta" id="questionCounter"></div>

        <div class="progress">
          <span id="lessonProgress"></span>
        </div>

        <div class="question" id="questionText"></div>

        <div class="answers" id="answerOptions"></div>

        <div
          class="feedback"
          id="feedback"
          aria-live="polite"
        ></div>

        <button
          class="button"
          id="checkButton"
          disabled
          onclick="checkAnswer()"
        >
          Check answer
        </button>

        <button
          class="button hidden"
          id="nextButton"
          onclick="nextQuestion()"
        >
          Continue →
        </button>

      </div>

      <aside class="card">
        <h3>Learning note</h3>
        <p id="lessonNote"></p>
        <div class="meta">
          Take your time and think about each answer.
        </div>
      </aside>
    `;

  renderQuestion();
}


// DISPLAY A QUESTION

function renderQuestion() {
  const q = currentLesson.questions[questionIndex];

  selectedAnswer = null;
  answered = false;

  document.getElementById("questionCounter").textContent =
    `QUESTION ${questionIndex + 1} OF ${currentLesson.questions.length}`;

  document.getElementById("lessonProgress").style.width =
    (questionIndex / currentLesson.questions.length * 100) + "%";

  document.getElementById("questionText").textContent =
    q.q;

  document.getElementById("lessonNote").textContent =
    currentLesson.note;

  document.getElementById("feedback").textContent = "";

  document.getElementById("checkButton").classList.remove("hidden");

  document.getElementById("checkButton").disabled = true;

  document.getElementById("nextButton").classList.add("hidden");

  document.getElementById("answerOptions").innerHTML =
    q.options.map((o, i) => `
      <button
        class="answer"
        data-index="${i}"
        onclick="selectAnswer(${i})"
      >
        ${o}
      </button>
    `).join("");
}


// SELECT AN ANSWER

function selectAnswer(i) {
  if (answered) return;

  selectedAnswer = i;

  document.querySelectorAll(".answer").forEach(
    (b, index) => {
      b.classList.toggle(
        "selected",
        index === i
      );
    }
  );

  document.getElementById("checkButton").disabled = false;
}


// CHECK THE ANSWER

function checkAnswer() {
  if (selectedAnswer === null || answered) return;

  answered = true;

  const q = currentLesson.questions[questionIndex];

  const correct = selectedAnswer === q.correct;

  document.querySelectorAll(".answer").forEach((b, i) => {
    if (i === q.correct) {
      b.classList.add("correct");
    }

    if (i === selectedAnswer && !correct) {
      b.classList.add("wrong");
    }
  });

  document.getElementById("feedback").textContent =
    (correct ? "Correct! +10 XP. " : "Not quite. ") +
    q.explanation;

  if (correct) {
    state.xp += 10;
    saveState();
  }

  document.getElementById("checkButton").classList.add("hidden");

  document.getElementById("nextButton").classList.remove("hidden");

  document.getElementById("nextButton").textContent =
    questionIndex === currentLesson.questions.length - 1
      ? "Finish lesson"
      : "Continue →";
}


// NEXT QUESTION OR FINISH LESSON

function nextQuestion() {
  if (questionIndex < currentLesson.questions.length - 1) {
    questionIndex++;
    renderQuestion();
  } else {
    if (!state.completed.includes(currentLesson.id)) {
      state.completed.push(currentLesson.id);
      state.xp += 20;
      saveState();
    }

    document.getElementById("lessonProgress").style.width =
      "100%";

    document.getElementById("questionText").textContent =
      "Lesson complete!";

    document.getElementById("answerOptions").innerHTML = "";

    document.getElementById("feedback").textContent =
      "Well done. You earned 20 completion XP.";

    document.getElementById("nextButton").textContent =
      "Back to course";

    document.getElementById("nextButton").onclick = () => {
      document.getElementById("nextButton").onclick = nextQuestion;
      openCourse(currentCourse.id);
    };
  }
}


// MUSEUM PAGE

function renderMuseum() {
  const items = [
    [
      "🗺️",
      "Maps & places",
      "Explore how geography shapes human history."
    ],
    [
      "🏺",
      "Artifacts",
      "Discover objects that help us understand past societies."
    ],
    [
      "📅",
      "Historical timelines",
      "Place major events in chronological context."
    ],
    [
      "👤",
      "People & biographies",
      "Learn about individuals and their historical settings."
    ]
  ];

  document.getElementById("museumGrid").innerHTML =
    items.map(x => `
      <article class="card">
        <div class="dept-icon">${x[0]}</div>
        <h3>${x[1]}</h3>
        <p>${x[2]}</p>
        <span class="tag">Coming soon</span>
      </article>
    `).join("");
}


// PROFILE PAGE

function renderProfile() {
  updateStats();

  document.getElementById("progressList").innerHTML =
    COURSES.map(c => `
      <div style="margin:12px 0">

        <div class="course-row">
          <strong>${c.title}</strong>

          <span class="meta">
            ${courseProgress(c)}%
          </span>
        </div>

        <div class="progress">
          <span style="width:${courseProgress(c)}%"></span>
        </div>

      </div>
    `).join("");
}


// RESET PROGRESS

function resetProgress() {
  if (confirm("Reset all learning progress saved in this browser?")) {
    state = { ...defaultState };

    saveState();
    renderCourses();
    renderProfile();
  }
}


// INITIALIZE THE WEBSITE

registerVisit();

updateStats();

renderDepartments();

renderCourses();

renderMuseum();
