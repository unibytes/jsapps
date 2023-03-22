class DynamicQuiz {
    constructor(id) {
        this.qustionListDiv = document.getElementById(id)
        loadQuizFromLocalStorage(this.qustionListDiv)
    }
}


function loadQuizFromLocalStorage(container) {
    let quizData = localStorage.getItem('quizData');
    if (quizData == null) {
        return
    }
    let quizArray = JSON.parse(quizData)
    if (quizArray.length <= 0) {
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
                    <form>
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