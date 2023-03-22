class DynamicQuiz {
    constructor(id) {
        this.qustionListDiv = document.getElementById(id)
        loadQuizFromLocalStorage(this.qustionListDiv)
    }

    submitQuizListener(submitId) {
        const submitbtn = document.getElementById(submitId)
        submitbtn.addEventListener("click", function(){
            if (submitbtn.textContent === "Clear") {
                clearRes()
                this.qustionListDiv.innerHTML = ""
                loadQuizFromLocalStorage(this.qustionListDiv)
                submitbtn.textContent = "Submit Quiz"
                submitbtn.className = "btn btn-primary"
                return 
            }
            let numcorrect = 0
            let total = 0
            let quizArray = getLocalQuizArray()
            const quizForms = this.qustionListDiv.querySelectorAll('.card-body form');
            quizForms.forEach((form) => {
                const question = form.dataset.question;
                const selectedAnswer = form.querySelector('input[type="radio"]:checked');
                let isCorrect = false 
                if (selectedAnswer) {
                    for (const quizItem of quizArray) {
                        if (quizItem.question === question) {
                            if (quizItem.correctAnsLetter === selectedAnswer.value) {
                                isCorrect = true
                                numcorrect++
                            }
                        }
                    }
                } 
                markForm(form, isCorrect);
                total++
            });
            showRes(total, numcorrect)
            submitbtn.textContent = "Clear"
            submitbtn.className = "btn btn-warning"
        }.bind(this))
    }
}

function clearRes() {
    const resultDiv = document.getElementById("result")
    resultDiv.innerHTML = ""
}

function showRes(total, numcorrect) {
    clearRes()
    const resultDiv = document.getElementById("result")
    resultDiv.innerHTML = `
        <h2> Result: Total ${total}, You Got ${numcorrect} Correct, and Your Score is ${numcorrect/total*100 + "%"} </h2>
    `
}

function markForm(form, isCorrect) {
    // Remove any existing border classes
    form.classList.remove('border', 'border-success', 'border-danger');
    if (isCorrect) {
        // Mark form green
        form.classList.add('border', 'border-success');
    } else {
        // Mark form red
        form.classList.add('border', 'border-danger');
    }
}

function getLocalQuizArray() {
    let quizData = localStorage.getItem('quizData');
    if (quizData == null) {
        return new Array()
    }
    let quizArray = JSON.parse(quizData)
    return quizArray
}

function showNoQuizItemYet() {
    // Create a notification card element
    const notificationCard = document.createElement("div");
    const image = document.createElement("img");
    image.src = "img/opps.jpg";
    image.classList.add("img-fluid", "w-50", "mx-auto", "d-block");

    notificationCard.appendChild(image);
    const text = document.createElement("p");
    text.classList.add("text-center", "mt-3", "fw-bold", "fs-4", "text-danger");
    text.textContent = "Question bank is empty! You can add question in admin page!!";
    text.style.fontSize = "30px";
    text.style.color = "#FF0000";
    text.style.fontFamily = "comic sans ms";
    notificationCard.appendChild(text);
    // Append the notification card element to the document body
    document.body.appendChild(notificationCard);
}

function loadQuizFromLocalStorage(container) {
    let quizData = localStorage.getItem('quizData');
    if (quizData == null) {
        showNoQuizItemYet()
        return
    }
    let quizArray = JSON.parse(quizData)
    if (quizArray.length <= 0) {
        showNoQuizItemYet()
        return
    }
    for (const quizItem of quizArray) {
        let quizDiv = document.createElement('div')
        quizDiv.className = "container mt-4"
        quizDiv.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">${quizItem.question}</h2>
                </div>
                <div class="card-body">
                    <form data-question="${quizItem.question}">
                        ${Object.entries(quizItem.ansObj).map(([key, value]) => `
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="answer" id="answer-${key}" value="${key}">
                                <label class="form-check-label" for="answer-${key}">
                                    ${key}) ${value}
                                </label>
                            </div>
                        `).join('')}
                    </form>
                </div>
            </div>
        `
        container.appendChild(quizDiv)
    }
}

