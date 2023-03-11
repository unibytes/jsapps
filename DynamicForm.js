class DynamicForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
    }

    addAnswerBtnClickBind(addButtonId) {
        const addAnsBtn = document.getElementById(addButtonId)
        addAnsBtn.addEventListener("click", function(){
            
            // calculate the next character 
            const formLen = this.form.querySelectorAll("div").length
            const nxtLetter = String.fromCharCode(65 + formLen)
            const divContent = "Answer " + nxtLetter
            
            // add div
            const newDiv = document.createElement("div")
            newDiv.id = nxtLetter
            newDiv.className = "form-group"
            newDiv.textContent = divContent

            // rmbtn inside the div
            var rmbtn = document.createElement("button")
            rmbtn.textContent = "x"
            rmbtn.type = "button"
            rmbtn.className = "btn btn-danger btn-sm"
            rmbtn.addEventListener("click", function() {
                this.form.removeChild(newDiv)
            })
            newDiv.appendChild(rmbtn)

            // add newAnswer to div
            var newAnswer = document.createElement("textarea")
            newAnswer.className = "form-control"
            newAnswer.id = "answer" + nxtLetter
            newAnswer.placeholder = "Enter your answer"
            newAnswer.style = "margin-top: 5px;"
            newDiv.appendChild(newAnswer)
            
            // add div to form
            const secondToLast = this.form.children[formLen - 1];
            this.form.insertBefore(newDiv, secondToLast)

            // add new option 
            const ansSelect = document.getElementById("ansSelect")
            const newOption = document.createElement("option")
            newOption.value = nxtLetter
            newOption.text = nxtLetter
            ansSelect.appendChild(newOption)

        }.bind(this));
    }

    publishButtonBind(pubButtonId) {
        const pubBtn = document.getElementById(pubButtonId)
        pubBtn.addEventListener("click", function(){
            let correctAnsLetter = "A"
            let question = ""
            let answers = {}
            var divs = this.form.querySelectorAll("div")
            for (var i = 0; i < divs.length - 1; i++) {
                var d = divs[i];
                var txtarea = d.querySelector("textarea")
                if (i == 0) {
                    // question
                    question = txtarea.value
                } else if (i == divs.length - 1) {
                    // correct answer
                    var select = document.getElementById("ansSelect")
                    correctAnsLetter = select.value
                } else {
                    // possibe answers
                    answers[d.id.toString()] = txtarea.value
                }
                // reset
                txtarea.value = ""
            }
            const quizItem = new QuizItem(localStorage.length, question, answers, correctAnsLetter)
            localStorage.removeItem("myObj")
            console.log(localStorage)
        }.bind(this))

    } 
}