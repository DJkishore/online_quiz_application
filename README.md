# Quizzy — Online Quiz Application

A modern, responsive quiz website built with **HTML, CSS, and vanilla JavaScript** for the Auspify Task 4 assignment.

## Features

- 10 multiple-choice questions
- Interactive answer selection
- Previous and next question navigation
- Progress bar and answered-question counter
- Automatic score and percentage calculation
- Correct, incorrect, and unanswered counts
- Result message based on score
- Answer review with explanations
- Restart quiz option
- Responsive layout for desktop, tablet, and mobile
- No database or API key required

## Project files

```text
online_quiz_application/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run locally

1. Download or extract the project folder.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in a browser, or install the **Live Server** extension in VS Code.
4. If using Live Server, right-click `index.html` and choose **Open with Live Server**.
5. Click **Start quiz**, answer the questions, and select **See results** on the final question.

No package installation or backend server is required.

## Customize the questions

Open `script.js` and edit the `questions` array. Each question has:

- `category`: small category label
- `question`: question text
- `options`: four choices
- `answer`: zero-based index of the correct choice (`0` = first choice)
- `explanation`: displayed in the final answer review

Example:

```js
{
  category: "HTML",
  question: "Which tag creates a paragraph?",
  options: ["<h1>", "<p>", "<div>", "<img>"],
  answer: 1,
  explanation: "The <p> element represents a paragraph."
}
```

## Upload to GitHub

### Option A — GitHub website

1. Sign in to GitHub and create a new repository named `online-quiz-application`.
2. Keep the repository public if you need to share it for assignment review.
3. Select **Add file → Upload files**.
4. Upload `index.html`, `style.css`, `script.js`, and `README.md`.
5. Select **Commit changes**.

### Option B — Git commands

Open a terminal inside the project folder and run:

```bash
git init
git add .
git commit -m "Create online quiz application"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/online-quiz-application.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. If `origin` already exists, use `git remote set-url origin https://github.com/YOUR-USERNAME/online-quiz-application.git` instead of `git remote add origin ...`.

## Publish with GitHub Pages

1. Open your repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`.
5. Click **Save** and wait for deployment.
6. Open the Pages URL shown there. It usually looks like `https://YOUR-USERNAME.github.io/online-quiz-application/`.

## Notes

- The score is calculated in the browser using JavaScript.
- Answers are not saved to a database; restarting resets the current attempt.
- The Google Fonts import needs internet access. The website still works if the font service is unavailable.
