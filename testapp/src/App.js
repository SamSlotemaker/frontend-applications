import React, { useState, useRef, useEffect } from 'react';
import Todolist from './Todolist'
import { v4 as uuidv4 } from 'uuid';
import Profile from './Profile'
import './style.css'
import Cities from './Cities'

const LOCAL_STORAGE_KEY1 = 'todoApp.todos'
const LOCAL_STORAGE_KEY2 = 'todoApp.profile'

const names = [
  "mark",
  "rick",
  "rianne",
  'marietje'
]

function App() {
  //set todoState
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  //set persoon State
  const [persoon, setPersoon] = useState({ naam: "Sam", leeftijd: '20' })

  //get stored todos on loading page
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY1))
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  //set stored todos on changing todos
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY1, JSON.stringify(todos))
  }, [todos])

  //get stored person on loading page
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY2))
    setPersoon(profile)
  }, [])

  //set stored person on changing person
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(persoon))
  }, [persoon])

  function handleAgeChange(persoon, nieuweLeeftijd) {
    if (!nieuweLeeftijd) return
    setPersoon({
      naam: persoon.naam,
      leeftijd: nieuweLeeftijd
    })
  }

  function handleNameChange(persoon, nieuweNaam) {
    if (!nieuweNaam) return

    let nameCapitalized = nieuweNaam.charAt(0).toUpperCase() + nieuweNaam.slice(1)

    setPersoon({
      naam: nameCapitalized,
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
      <Profile persoon={persoon} handleAgeChange={handleAgeChange} handleNameChange={handleNameChange} names={names} />
      <section className="todo-container">
        <h1>TODO-LIST</h1>
        <Todolist todos={todos} toggleTodo={toggleTodo} />
        <input ref={todoNameRef} type='text' />
        <button onClick={handleAddTodo} style={{ display: "block", "margin": "1em 0em" }}>Add Todo</button>
        <button onClick={clearAllCompleted} style={{ display: "block", "margin": "1em 0em" }}> Clear completed Todos</button>
        <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      </section>
      <Cities />
    </>
  )
}

export default App;