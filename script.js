document.addEventListener("DOMContentLoaded", function () {
  const questionsSection = document.getElementById("questions_section");

  function addOption(button) {
      const optionContainer = button.previousElementSibling;
      const optionDiv = document.createElement("div");
      optionDiv.className = "option";
      optionDiv.innerHTML = `
        <input type="text" class="form-control option-input" placeholder="New Option" />
        <span class="delete-option" onclick="deleteOption(this)">&#10005;</span>
      `;
      optionContainer.appendChild(optionDiv);
      updateAddButtonPosition();
  }

  function deleteOption(span) {
      const optionDiv = span.parentElement;
      optionDiv.remove();
      updateAddButtonPosition();
  }

  function changeQuestionType(select) {
      const questionInput = select.nextElementSibling;
      questionInput.style.display = "block";
      const optionsContainer = select.nextElementSibling.nextElementSibling;
      optionsContainer.innerHTML =
          '<input type="text" class="form-control option-input" placeholder="Option 1">';
  }

  let questionCount = document.querySelectorAll(".question").length;

  function addNewQuestion() {
      const newQuestionDiv = document.createElement("div");
      newQuestionDiv.className = "question";
      newQuestionDiv.innerHTML = `
        <select class="form-control question_type" onchange="changeQuestionType(this)">
          <option value="">Select Question Type</option>
          <option value="multiple_choice">Multiple Choice</option>
          <option value="checkbox">Checkbox</option>
          <option value="dropdown">Dropdown</option>
        </select>
        <input type="text" class="form-control question-input" placeholder="Type your question here" />
        <div class="options-container">
          <div class="option">
            <input type="text" class="form-control option-input" placeholder="Option 1" />
            <span class="delete-option" onclick="deleteOption(this)">&#10005;</span>
          </div>
        </div>
        <button class="btn btn-secondary" onclick="addOption(this)">Add Option</button>
        <button class="btnn" onclick="deleteQuestion(this)">
          <img src="images/bin.png" alt="" width="20px" height="20px" />
        </button>
      `;
      questionsSection.appendChild(newQuestionDiv);
      questionCount++;
      updateAddButtonPosition();
  }

  window.previewForm = function () {
      const formTitle = document.getElementById("form-title").value;
      const formDescription = document.getElementById("form-description").value;
      const questions = document.querySelectorAll(".question");
      let formData = [];

      questions.forEach((question, index) => {
          const questionType = question.querySelector("select").value;
          const questionText = question.querySelector(".question-input").value;
          const options = Array.from(
              question.querySelectorAll(".option-input")
          ).map((input) => input.value);
          formData.push({
              type: questionType,
              text: questionText,
              options: options,
          });
      });

      const formParams = new URLSearchParams({
          title: formTitle,
          description: formDescription,
          data: JSON.stringify(formData),
      });

      window.open(`preview.html?${formParams.toString()}`, "_blank");
  };

  window.addNewQuestion = addNewQuestion;
  window.deleteQuestion = deleteQuestion;
  window.addOption = addOption;
  window.changeQuestionType = changeQuestionType;
});

function deleteQuestion(element) {
  let questionContainer = element.closest(".question");
  if (questionContainer) {
      questionContainer.remove();
      updateAddButtonPosition();
  }
}

function deleteOption(span) {
  const optionDiv = span.parentElement;
  optionDiv.remove();
  updateAddButtonPosition();
}

function updateAddButtonPosition() {
  const questionsSection = document.getElementById('questions_section');
  const lastQuestion = questionsSection.lastElementChild;
  if (lastQuestion) {
      const selectQuestionType = lastQuestion.querySelector('.question_type');
      const sidebar = document.getElementById('moveableDiv');
      const offset = selectQuestionType.offsetTop - sidebar.offsetHeight;
      sidebar.style.transform = `translateY(${offset}px)`;
      console.log(`Moving sidebar to: ${offset}px`);  // Debugging line
  } else {
      const sidebar = document.getElementById('moveableDiv');
      sidebar.style.transform = `translateY(0px)`;
      console.log(`Moving sidebar to: 0px`);  // Debugging line
  }
}

