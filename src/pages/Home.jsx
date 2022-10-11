import React, { useRef, useState } from 'react'; 
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const ref = useRef()
    const navigate = useNavigate()

    const [questions, setQuestions] = useState([]);  
    const [categories, setCategories] = useState([]);
    const [catInput, setCatInput] = useState("");
    const [dffInput, setDffInput] = useState("");
    const [octg, setOctg] = useState(false)
    const [odff, setOdff] = useState(false)
    const [details, setDetails] = useState({
        cat: "",
        diff:""
    })


    const fetchCategories = async() => {
        const response = await axios.get('https://the-trivia-api.com/api/categories')
        setCategories(Object.keys(response.data))
        console.log(categories)
    }

    const handleCatInput = (e) => {
        setCatInput(e.target.textContent)
    }

    const fetchQuestions = async() => {
        const response = await axios.get(`https://the-trivia-api.com/api/questions?categories=arts_and_literature&limit=10&difficulty=easy`)
        console.log(response.data)
    }

    const setLocalDiffAndCat = () => {
        
    }
    
    const handleDffInput = (e) => {
        setDffInput(e.target.textContent)
    }
    
    useEffect(() => {
        const handleCloseAll = (e) => {
            if (octg && ref.current && !ref.current.contains(e.target)) {
                setOctg(false)
            }
        }
        document.addEventListener('mousedown', handleCloseAll)
        return () => {
            document.removeEventListener('mousedown', handleCloseAll)

        }
     }, [octg])

    useEffect(() => { 
        fetchCategories()
    }, [])



  return (
      <div className="home">
          <div className="container">
              <div className="hero">
                  <div className="h-cont">
                      <h1>Quiz App</h1>
                      <p>Wanna test your Knowledge ? <br/> Feel free to take Our Quiz!</p>
                  </div>
                  <div className="h-phone">
                      <div className='h-phone-cont'>
                          <Icon className='bulb-icon' icon="noto:light-bulb" />
                          <p>Welcome to my</p>
                          <h3>QUIZ APP</h3>
                          <p>How far can you go!</p>
                      </div>
                      <div className="h-phone-btns">
                          <div onClick={() => {setOctg(!octg)}} className='h-phone-input'>
                              <input disabled={true} type="text" value={ catInput === "" ? "" : catInput} placeholder="Choose a Category" />
                            <Icon style={{transform: octg === true ? "rotateZ(-180deg)" : "none"}} className='h-dropDownIcon' icon="ci:chevron-down" />
                              <div style={{
                                  height: octg === true ? "26vh" : "0",
                                  padding: octg === true ? ".4rem" : "0rem"
                              }} className='h-cat-drw'>
                                  {
                                      categories ? categories.map((cat, index) => (
                                          <p onClick={handleCatInput} key={index} >{categories[index] }</p>
                                      )) : (<div>No Categories</div>)
                                  }
                            </div>
                          </div>
                          <div onClick={() => {setOdff(!odff)}} className='h-phone-input'>
                            <input disabled={true} type="text"  value={ dffInput === "" ? "" : dffInput} placeholder='Select Difficulty'/>
                            <Icon style={{transform: odff === true ? "rotateZ(-180deg)" : "none"}} className='h-dropDownIcon' icon="ci:chevron-down" />
                                <div 
                                  style={{
                                  height: odff === true ? "26vh" : "0",
                                  padding: odff === true ? ".4rem" : "0rem"
                                }} className='h-cat-drw'>
                                    <p onClick={handleDffInput} >Easy</p>
                                    <p onClick={handleDffInput} >Medium</p>
                                    <p onClick={handleDffInput} >Hard</p>
                            </div>
                          </div>
                          <button
                              onClick={() => {
                                  fetchQuestions()
                                //   navigate("quiz-page")
                              }}
                              className="h-start">Start Test</button>
                          <button className="h-learnmore">Learn More</button>
                      </div>

                  </div>
              </div>
          </div>
    </div>
  )
}

export default Home