import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Featured from '../components/Featured'
import List from '../components/List'
import Navbar from '../components/Navbar'
import { fetchlists } from '../reducers/listSlice'
import './home.scss'

const Home = ({ type }) => {
  const navigate = useNavigate();
  const theLists = useSelector(store => store.lists.lists)
  
  
  const dispatch = useDispatch()
  

  
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate('/register')
    }
    dispatch(fetchlists({ type, genre }))
  }, [dispatch,genre,navigate,type])
  

  
  return (
    <div className="home">
    <Navbar />
    <Featured type={type} setGenre={setGenre} genre={genre} />
    {theLists.map((list,index) => (
      <List key={index} list={list} />
    ))}
  </div>
  )
}

export default Home