class DynamicForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
    }

    addAnswerBtnClickBind(addButtonId) {
        const addAnsBtn = document.getElementById(addButtonId)
        addAnsBtn.addEventListener("click", function(){

            var possibleAnswerDiv = document.getElementById("possibleAnswers")
            var numPossibleAnswer = possibleAnswerDiv.querySelectorAll("div") == null ? 0 : possibleAnswerDiv.querySelectorAll("div").length
            var nxtLetter = String.fromCharCode(65 + numPossibleAnswer)
    
            // creat a new possible answer div
            var newAnswerDiv = document.createElement("div")
            var divContent = "Answer " + nxtLetter
            newAnswerDiv.id = nxtLetter
            newAnswerDiv.className = "form-group"
            newAnswerDiv.textContent = divContent

            // rmbtn a rmtbtn inside the new possible answer div 
            var rmbtn = document.createElement("button")
            rmbtn.textContent = "x"
            rmbtn.type = "button"
            rmbtn.className = "btn btn-danger btn-sm"
            rmbtn.addEventListener("click", function() {
                // shift to up by one
                const answerDiv = possibleAnswerDiv.children
                var startIdx = Array.prototype.indexOf.call(answerDiv, newAnswerDiv);
                
                for (let i = startIdx; i < answerDiv.length - 1; i++) {
                    answerDiv[i].querySelector("textarea").value = answerDiv[i+1].querySelector("textarea").value
                }
                
                // always delete the last possible ans 
                possibleAnswerDiv.lastElementChild.remove()

                // for selecting field, just delete the last
                var ansSelect = document.getElementById("ansSelect")
                var lastOption = ansSelect.options[ansSelect.options.length - 1];
                lastOption.remove();
            })
            newAnswerDiv.appendChild(rmbtn)

            // create textarea field inside the new possinle answer div
            var ansTextArea = document.createElement("textarea")
            ansTextArea.className = "form-control"
            ansTextArea.id = "answer" + nxtLetter
            ansTextArea.placeholder = "Enter your answer"
            ansTextArea.style = "margin-top: 5px;"
            newAnswerDiv.appendChild(ansTextArea)
            
   
            // put new possible answer div into possibleAnswerDiv
            possibleAnswerDiv.appendChild(newAnswerDiv)

            const ansSelect = document.getElementById("ansSelect")
            const newOption = document.createElement("option")
            newOption.value = nxtLetter
            newOption.text = nxtLetter
            ansSelect.appendChild(newOption)
        }.bind(this));
    }
 
    publishButtonBind(pubButtonId) {
        const pubBtn = document.getElementById(pubButtonId)
            // validate form
        pubBtn.addEventListener("click", function(){
            // Validation Form -------------------------
            if (document.getElementById("questionDiv").querySelector("textarea").value.length == 0) {
                alert("Question Should Not Be Empty")
                return
            }

            // Local Storage --------------------------
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
            const qid = localStorage.length + 1
            const quizItem = new QuizItem(qid, question, answers, correctAnsLetter)
            // put quizItem into local storage
            localStorage.setItem(qid, JSON.stringify(quizItem))
            console.log(JSON.stringify(quizItem))
        }.bind(this))

    } 

 
}