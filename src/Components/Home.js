import React, { useState } from 'react'
import './ComponentCss/HomeCss.css';
// import {BrowserRouter,Routes,Route} from 'react-router-dom';
// import Quiz from './Quiz';
export default function Home(props) {

    // const [props.userInfo,setprops.userInfo] = useState({
    //     "firstName":"",
    //     "lastName":"",
    //     "email":"",
    //     "password":"",
    // });

    
    const [errorMessage,setErrorMessage] = useState('');
    const [errorMessage2,setErrorMessage2] = useState(''); 
    const handleChange = (event)=>{
        const {name,value} = event.target;
        props.setUserInfo(prevInfo=>{
            return {
                ...prevInfo,
                [name]:value,
            }
        });
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        Object.keys(props.userInfo).forEach(key=>{
            const value = props.userInfo[key];
            if(value===""){
                setErrorMessage('Please fill in all the fields');
                setTimeout(()=>{
                    setErrorMessage('');
                },3000);
                return ;
            }
        });
        console.log(props.userInfo);
        props.setLoggedIn(true);
    }

    const loggedInChange = (event)=>{
        const {name,value} = event.target;
        props.setQuizData(prevQuizData=>{
            return {
                ...prevQuizData,
                [name]:value,
            }
        });
    }

    const startQuiz = (event)=>{
        event.preventDefault();
        if(props.quizData.noOfQuestions > 50){
            setErrorMessage2('Max no of questions is 50');
            setTimeout(()=>{
                setErrorMessage2('');
            },3000);
            return ;
        }
        console.log(props.quizData);
        localStorage.setItem('quizData',JSON.stringify(props.quizData));
        window.location = `/${props.quizData.category}`;
    }

    console.log(props.loggedIn);

  return (
    <>
    <div id="HomeImg">
        <h1 id='homeHeading'>Welcome to Quizella</h1>
        <p id='headingDesc'>Quizella offers top tier quizzez on topics like sports, films, music, science & nature</p>
    </div>
    <div id="HomeLogin">
        {!props.loggedIn && <h2>Login</h2>}
        {!props.loggedIn && <form className='homeForm' onSubmit={handleSubmit}>
            <input onChange={handleChange} value={props.userInfo.firstName} type="text" name="firstName" id="firstname" className='inputBox' placeholder='Enter first name' />
            <input onChange={handleChange} value={props.userInfo.lastName} type="text" name="lastName" id="lastname" className='inputBox' placeholder='Enter last name' />
            <input onChange={handleChange} value={props.userInfo.email} type="email" name="email" id="emailId" className='inputBox' placeholder='Enter email'/>
            <input onChange={handleChange} value={props.userInfo.password} type="password" name="password" id="passwd" className='inputBox' placeholder='Enter password'/>
            {/* <input onChange={handleChange} value={props.userInfo.noOfQuestions} type="number" name="noOfQuestions" id="questions" className='inputBox' placeholder='Enter no of questions'/>
            <select onChange={handleChange} value={props.userInfo.category} name="category" id="cat" className='inputBox'>
                <option value="Sports">sports</option>
                <option value="Entertainment: Film">Films</option>
                <option value="Entertainment: Music">Music</option>
                <option value="Science&Nature">Science & nature</option>
            </select> */}
            <div className='errorDiv'>
                <p className='errorMessage'>{errorMessage}</p>
            </div>
            <button className="btn" id="submitBtn">Login</button>
        </form>}
        {props.loggedIn && <form id="HomeLoggedIn" onSubmit={startQuiz}>
            <input value={props.quizData.noOfQuestions} onChange={loggedInChange}  type="number" name="noOfQuestions" id="questions" className='inputBox' placeholder='Enter no of questions'/>
            <select value={props.quizData.category} onChange={loggedInChange}  name="category" id="cat" className='inputBox'>
                <option value="Sports">sports</option>
                <option value="Entertainment: Film">Films</option>
                <option value="Entertainment: Music">Music</option>
                <option value="Science & Nature">Science & nature</option>
            </select>
            <div className='errorDiv'>
                <p className='errorMessage'>{errorMessage2}</p>
            </div>
            <button className="btn" id="sloggedInBtn">Start Quiz</button>
        </form>}
    </div>
    </>
  )
}
