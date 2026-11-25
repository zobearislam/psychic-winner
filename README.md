# History & Society Learning Prototype

An interactive educational prototype for exploring history, geography, government, economics, and culture through short lessons and quizzes.

## Features
- Department-based courses
- Interactive multiple-choice lessons with explanations
- XP and streak tracking (saved in localStorage)
- Progress tracking per course
- Museum section (expandable)

## How to run
Open `index.html` in a web browser. No build step required.

## Adding content
Edit the `COURSES` and `DEPARTMENTS` arrays in `js/data.js`. Each question needs `q`, `options` (array), `correct` (0-based index), and `explanation`.
