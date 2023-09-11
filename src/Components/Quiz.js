import React, { useEffect, useState } from 'react'
import './ComponentCss/QuizCss.css'
export default function Quiz(props) {

    const [questions,setQuestions] = useState([]);
    const [submitted,setSubmitted] = useState(false);
    const [quizError,setQuizError] = useState('');
    const [score,setScore] = useState(0);
    const [ans,setAns] = useState({
        0:"",
    });

    useEffect(()=>{
        const quizData = JSON.parse(localStorage.getItem('quizData'));
        if(props.category==='Sports'){
            fetch(`https://opentdb.com/api.php?amount=${quizData.noOfQuestions}&category=21&type=multiple`).then((res)=>res.json()).then((data)=>setQuestions(data.results));
        }
        else if(props.category==='Entertainment: Film'){
            fetch(`https://opentdb.com/api.php?amount=${quizData.noOfQuestions}&category=11&type=multiple`).then((res)=>res.json()).then((data)=>setQuestions(data.results));
        }
        else if(props.category==='Entertainment: Music'){
            fetch(`https://opentdb.com/api.php?amount=${quizData.noOfQuestions}&category=12&type=multiple`).then((res)=>res.json()).then((data)=>setQuestions(data.results));
        }
        else{
            fetch(`https://opentdb.com/api.php?amount=${quizData.noOfQuestions}&category=17&type=multiple`).then((res)=>res.json()).then((data)=>setQuestions(data.results));
        }

    },[props.category]);

    const newState = questions.map((item)=>{
        return {
            ...item,
            "answers":[...item.incorrect_answers,item.correct_answer],
        }
    });

    const handleChange = (event)=>{
        const {name,value} = event.target;
        setAns(prevAns=>{
            return {
                ...prevAns,
                [name]:value,
            }
        });
    }

    const submitQuiz = (event)=>{
        event.preventDefault();
        let keyArr = [];
        let i = 0;
        let flag = false;
        Object.keys(ans).forEach(key=>{
            keyArr[i] = parseInt(key);
            i++;
        })
        for(let i=0;i<keyArr.length-1;i++){
            if(keyArr[i+1] === keyArr[i]+1){
                flag = true;
            }
            else{
                flag = false;
                break;
            }
        }
        setSubmitted(flag);
        if(flag && keyArr.length===newState.length){
            console.log('Successfully submitted');
            let i = 0;
            Object.keys(ans).forEach(key=>{
                let value = ans[key];
                if(value===newState[i].correct_answer){
                    setScore(prevScore=>prevScore+1);
                }
                i++;
            });
        }
        else{
            setQuizError('Please answer all the questions');
            setTimeout(()=>{
                setQuizError('');
            },3000);
        }
        console.log(ans);
    }

  return (
    <>
    <div className="quizContainer">
        {!submitted && <form className='quizForm' onSubmit={submitQuiz}>
        {newState.map((item,index)=>{
            return <><div className="quizQuestion">
            <h2>{item.question}</h2>
            {item.answers.map((val)=>{
                return <div className="answerDiv">
                <input value={val} onChange={handleChange} type="radio" name={index} id=""/>
                <label htmlFor="">{val}</label>
            </div>
            })}
        </div>
        <hr />
        </>
        })}
        <div className="errorDiv">
            <p className="errorMessage">{quizError}</p>
        </div>
        <center><button className="btn">Submit</button></center>
        </form>}
        {submitted && <div className="scoreDiv">
            <h2>Thank you for Giving this test!</h2>
            <p>{`You scored a ${score}/${newState.length}`}</p>
            <a href="/">Play again</a>
        </div>}
    </div>
    </>
  )
}
