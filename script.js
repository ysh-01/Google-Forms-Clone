document.addEventListener('DOMContentLoaded', function () {
    const questionsSection = document.getElementById('questions_section');

    function addOption(button) {
        const optionsContainer = button.previousElementSibling;
        const optionCount = optionsContainer.querySelectorAll('.option-input').length;
        const newOption = document.createElement('input');
        newOption.type = 'text';
        newOption.className = 'form-control option-input';
        newOption.placeholder = `Option ${optionCount + 1}`;
        optionsContainer.appendChild(newOption);
    }

    function changeQuestionType(select) {
        const questionInput = select.nextElementSibling;
        questionInput.style.display = 'block';
        const optionsContainer = select.nextElementSibling.nextElementSibling;
        optionsContainer.innerHTML = '<input type="text" class="form-control option-input" placeholder="Option 1">';
    }

    function addNewQuestion() {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <select class="form-control question_type" onchange="changeQuestionType(this)">
                <option value="">Select Question Type</option>
                <option value="multiple_choice">Multiple Choice</option>
                <option value="checkbox">Checkbox</option>
                <option value="dropdown">Dropdown</option>
            </select>
            <input type="text" class="form-control question-input" placeholder="Type your question here">
            <div class="options-container">
                <input type="text" class="form-control option-input" placeholder="Option 1">
            </div>
            <button class="btn btn-secondary" onclick="addOption(this)">Add Option</button>
        `;
        questionsSection.appendChild(questionDiv);
    }

    window.previewForm = function () {
        const formTitle = document.getElementById('form-title').value;
        const formDescription = document.getElementById('form-description').value;
        const questions = document.querySelectorAll('.question');
        let formData = [];

        questions.forEach((question, index) => {
            const questionType = question.querySelector('select').value;
            const questionText = question.querySelector('.question-input').value;
            const options = Array.from(question.querySelectorAll('.option-input')).map(input => input.value);
            formData.push({ type: questionType, text: questionText, options: options });
        });

        const formParams = new URLSearchParams({
            title: formTitle,
            description: formDescription,
            data: JSON.stringify(formData)
        });

        window.open(`preview.html?${formParams.toString()}`, '_blank');
    }

    window.addOption = addOption;
    window.changeQuestionType = changeQuestionType;
    window.addNewQuestion = addNewQuestion;
});
