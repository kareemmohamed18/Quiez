import {Quiez}from './Quiez.js'
export class Setting
{
    constructor()
    {
        this.CategoryElement=document.getElementById('Category');
        this.numOfQuestionElement=document.getElementById('numOfQuestion');
        this.difficultyElement=document.getElementsByName('difficulty');
        this.startBtn=document.getElementById('startBtn');
        this.startBtn.addEventListener('click' ,this.startQuiez.bind(this))
    }

    
   

    async startQuiez()
    {
        let Category = this.CategoryElement.value
        let numOfQuestion =this.numOfQuestionElement.value;
        let difficulty = [...this.difficultyElement].filter((elemnt)=>{ return elemnt.checked})[0].value;
        let Api = `https://opentdb.com/api.php?amount=${numOfQuestion}&category=${Category}&difficulty=${difficulty}`
        let response= await this.fetchApi(Api);

        if(response.length > 0)
        {
            $('#setting').fadeOut(500 , ()=>
            {
                $('#Quiez').fadeIn(500)
            })
            let quiez=new Quiez(response)
        }
       
    }

    async fetchApi(url)
   {
       let response =await fetch(url);
       let result =await response.json();
       let finalResult=result.results;
       return finalResult  
   }





}