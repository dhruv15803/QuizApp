import { useState } from 'react';
import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Quiz from './Components/Quiz';
// import Quiz from './Quiz';

function App() {

  const [loggedIn,setLoggedIn] = useState(false);
  const [userInfo,setUserInfo] = useState({
    "firstName":"",
    "lastName":"",
    "email":"",
    "password":"",
});

    const [quizData,setQuizData] = useState({
        "noOfQuestions":10,
        "category":"Sports",
    });



  return (
    <>
    <BrowserRouter>
    <Navbar loggedIn={loggedIn} userInfo={userInfo}/>
    <Routes>
      <Route exact path='/' element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} userInfo={userInfo} setUserInfo={setUserInfo} quizData={quizData} setQuizData={setQuizData}/>}/>
      <Route exact path='/Sports' element={<Quiz category='Sports'/>}/>
      <Route exact path='/Entertainment: Film' element={<Quiz category='Entertainment: Film'/>}/>
      <Route exact path='/Entertainment: Music' element={<Quiz category='Entertainment: Music'/>}/>
      <Route exact path='/Science & Nature' element={<Quiz category='Science & Nature'/>}/>
    </Routes>
    </BrowserRouter>
    {/* <Navbar loggedIn={loggedIn} userInfo={userInfo}/>
    <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} userInfo={userInfo} setUserInfo={setUserInfo}/> */}
    </>
  );
}

export default App;
