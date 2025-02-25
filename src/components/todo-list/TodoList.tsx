import { FormEvent, useState } from "react";

interface Props {
  todos: {
    id: number;
    text: string;
  }[];
}

const TodoList = ({ todos }: Props) => {
  const [todoList, setTodoList] = useState(todos)
  const [todoName, setTodoName] = useState("")

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setTodoName(e.currentTarget.value)
  }

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newTodo = {
      id: Math.random(),
      text: todoName
    }
    setTodoList([...todoList, newTodo])
  }

  const handleRemoveTodo = (id: number) => {
    setTodoList(todoList.filter(todo => todo.id !== id))
  }

  return (
    <section>
      <form onSubmit={e => handleAddTodo(e)}>
        <input type="text" placeholder="Añadir todo" name="todoName" onChange={handleChange}/>
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {
          todoList.map(todo => (
            <li key={todo.id} onClick={() => handleRemoveTodo(todo.id)}>
              {todo.text}
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export { TodoList }
