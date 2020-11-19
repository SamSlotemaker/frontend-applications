import React from 'react'
import Todo from './Todo'

export default function Todolist({ todos, toggleTodo }) {
    return (
        <ul style={{ "padding": "0", "listStyleType": "none" }} >{
            todos.map(todo => {
                return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
            })}
        </ul>
    )
}
