import React, { useState, useRef, useEffect } from 'react';
import Todolist from './Todolist'
import { v4 as uuidv4 } from 'uuid';
import Profile from './Profile'
import './style.css'

const LOCAL_STORAGE_KEY1 = 'todoApp.todos'
const LOCAL_STORAGE_KEY2 = 'todoApp.profile'


function App() {
  //set todoState
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  //set persoon State
  const [persoon, setPersoon] = useState({ naam: "Sam", leeftijd: '20' })



  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY1))
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY1, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    console.log('get name')
    const profile = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY2))
    setPersoon(profile)
  }, [])

  useEffect(() => {
    console.log('set name')
    localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(persoon))
  }, [persoon])

  function handleAgeChange(persoon, nieuweLeeftijd) {
    setPersoon({
      naam: persoon.naam,
      leeftijd: nieuweLeeftijd
    })
  }

  function handleNameChange(persoon, nieuweNaam) {
    setPersoon({
      naam: nieuweNaam,
      leeftijd: persoon.leeftijd
    })
  }

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }
  function clearAllCompleted() {
    var newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <Profile persoon={persoon} handleAgeChange={handleAgeChange} handleNameChange={handleNameChange} />

      <section className="todo-container">
        <h1>TODO-LIST</h1>
        <Todolist todos={todos} toggleTodo={toggleTodo} />
        <input ref={todoNameRef} type='text' />
        <button onClick={handleAddTodo} style={{ display: "block", "margin": "1em 0em" }}>Add Todo</button>
        <button onClick={clearAllCompleted} style={{ display: "block", "margin": "1em 0em" }}> Clear completed Todos</button>
        <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      </section>
    </>
  )
}

export default App;