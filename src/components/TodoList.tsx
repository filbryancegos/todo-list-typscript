import React from 'react'
import { AiOutlineCheck, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

interface Todos {
  id: number;
  name: string;
  isCompleted: boolean;
}

interface Props {
  todos: Array<Todos>;
  handleTodo: (id: number) => void;
  handleDelete: (id: number) => void;
  handleUpdate: (id: number) => void;
}

const TodoList: React.FC<Props> = ({ todos, handleTodo, handleDelete, handleUpdate }) => {
  return (
    <div className='mt-8'>
      {todos.length > 0 ? 
        todos.map(todo =>
          <div key={todo.id} className='w-full bg-slate-900 p-3 rounded-full mb-2 flex gap-2 items-center justify-between'>
            <div onClick={() => handleTodo(todo.id)} className={`flex items-center gap-2`}>
              <div className={`h-6 w-6 rounded-full ${todo.isCompleted ? 'border-green-700 bg-green-600' : 'border-slate-700 bg-slate-600'}  border flex justify-center items-center`}>
                <span className='text-white'>{todo.isCompleted && <AiOutlineCheck />}</span>
              </div>
              <span className={` ${todo.isCompleted ? 'line-through text-green-600' : 'text-slate-600'}`}>{todo.name}</span>
            </div>
            <div className='flex gap-2'>
              <div onClick={() => handleUpdate(todo.id)} className={`h-6 w-6 ${todo.isCompleted ? 'pointer-events-none opacity-50' : ''} rounded-full border-green-700 bg-green-600 hover:bg-green-500 border flex justify-center items-center`}>
                <span className='text-white'><AiOutlineEdit /></span>
              </div>
              <div onClick={() => handleDelete(todo.id)} className={`h-6 w-6 rounded-full  border-red-700 bg-red-600 hover:bg-red-500 border flex justify-center items-center`}>
                  <span className='text-white'><AiOutlineDelete /></span>
              </div>
            </div>
          </div>
        ) : 
        <div className='text-slate-500'>no todo records</div>
      }
    </div>
  )
}

export default TodoList
