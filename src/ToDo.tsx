import React from 'react'
import { ToDoType } from './App'

const ToDo = (todo: ToDoType) => {
  return (
    <div ref={todo.innerRef}>
        <p>{todo.title}</p>
        <p> taeta </p>
        <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
    </div>
  )
}

export default ToDo