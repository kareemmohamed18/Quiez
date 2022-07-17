export class Quiez
{
    constructor( arrOfQues)
    {
        this.arrOfQues=arrOfQues;
        this.numOfQues=arrOfQues.length
        this.currentQuestion=0;
        this.score=0;
        this.showQuestion();

        this.nextBtn=document.getElementById('next');
        this.nextBtn.addEventListener('click' , this.nextQuestion.bind(this))
        this.tryBtn=document.getElementById('tryBtn');
    }


    showQuestion()
    {
        document.getElementById('question').innerHTML=this.arrOfQues[this.currentQuestion].question;
        document.getElementById("totalNumOfQuestion").innerHTML=this.numOfQues;
        document.getElementById("currentQuestion").innerHTML=this.currentQuestion+1;
        let answers= [this.arrOfQues[this.currentQuestion].correct_answer , ...this.arrOfQues[this.currentQuestion].incorrect_answers]
       
       
        function shuffle(array)
        {
            let currentIndex = array.length,
                randomIndex;

            // While there remain elements to shuffle.
            while (currentIndex != 0) {

                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]
                ];
            }
            return array;
        }
        shuffle(answers)

        let rows='';
        for(let i=0 ; i<answers.length ; i++)
        {
            rows+=
            `<div class="form-check my-2">
            <label class="form-check-label">
                <input type="radio" class="form-check-input" name="answer" id="" value="${answers[i]}" >
                ${answers[i]}
            </label>
            </div>`
        }
        document.getElementById('rowAnswer').innerHTML=rows
    }





    nextQuestion()
    {

        let userAnswerElemnt=document.getElementsByName('answer');
        if([...userAnswerElemnt].filter((el)=>{return el.checked}).length==1)
        {
            $("#alert").fadeOut(500)
            this.checkUserAnswer();
            this.currentQuestion++;
            if(this.currentQuestion<this.numOfQues)
            {
                this.showQuestion(); 
            }
            else
            {
                $("#Quiez").fadeOut(500,()=>
                {
                    $('#finish').fadeIn(500);
                    document.getElementById("score").innerHTML=this.score
                    this.tryBtn.addEventListener('click' , ()=>
                    {
                        location.reload();
                    })
                })
            }
    
        }
        else
        {
            $("#alert").fadeIn(500)
        }

    }

    checkUserAnswer()
    {
        let userAnswerElemnt=document.getElementsByName('answer');
        let userAnswer=[...userAnswerElemnt].filter((el)=>{return el.checked})[0].value;
        if(userAnswer == this.arrOfQues[this.currentQuestion].correct_answer)
        {
            this.score++
            $("#correct").fadeIn(500,()=>
            {
                $("#correct").fadeOut(500)
            })
        }
        else
        {
            $("#inCorrect").fadeIn(500,()=>
            {
                $("#inCorrect").fadeOut(500)
            })
        }
    }



}