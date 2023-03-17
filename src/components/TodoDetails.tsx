import React from 'react'
import { AiOutlineFolderOpen, AiOutlineFolderView, AiOutlineFolder } from "react-icons/ai";

interface Todos {
  id: number;
  name: string;
  isCompleted: boolean;
}

interface Props {
  pending: number;
  completed: number;
  allTodos: number;
  todos: Array<Todos>;
  getAllTodos: () => void;
  getTodosDetails: (category: boolean) => void;
}


const TodoDetails: React.FC<Props> = ({pending, completed, todos, getAllTodos, getTodosDetails, allTodos }) => {
  return (
    <div className="grid sm:grid-cols-3 mt-4 gap-2">
      <div className='rounded-lg bg-slate-900 py-4 px-6 relative'>
        <div onClick={() => getTodosDetails(true)} className='flex justify-end text-slate-500 absolute top-2 right-2 text-sm cursor-pointer hover:underline'>view all</div>
        <span className='text-green-700'>{completed} {`task${completed > 1 ? 's' : ''}`}</span>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl text-slate-400 uppercase'>Completed</h2>
          <span><AiOutlineFolderOpen className='text-slate-500 text-4xl' /></span>
        </div>
      </div>
      <div className='rounded-lg bg-slate-900 py-4 px-6 relative'>
      <div onClick={() => getTodosDetails(false)} className='flex justify-end text-slate-500 absolute top-2 right-2 text-sm cursor-pointer hover:underline'>view all</div>
        <span className='text-red-700'>{pending} {`task${pending > 1 ? 's' : ''}`}</span>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl text-slate-400 uppercase'>Pending</h2>
          <span><AiOutlineFolderView className='text-slate-500 text-4xl' /></span>
        </div>
      </div>
      <div className='rounded-lg bg-slate-900 py-4 px-6 relative'>
      <div onClick={getAllTodos} className='flex justify-end text-slate-500 absolute top-2 right-2 text-sm cursor-pointer hover:underline'>view all</div>
        <span className='text-slate-700'>{allTodos} {`task${allTodos > 1 ? 's' : ''}`}</span>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl text-slate-400 uppercase'>All todos</h2>
          <span><AiOutlineFolder className='text-slate-500 text-4xl' /></span>
        </div>
      </div>
    </div>
  )
}

export default TodoDetails
