import React from 'react'
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

interface Category {
  id: number;
  name: string;
  isActive: boolean;
}

interface Props {
  todo: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  categories: Array<Category>;
  handleSelectCategory: (id: number) => void;
  category: number;
  error: string;
  isFilter: boolean
}

const InputTodo: React.FC<Props> = ({ todo, handleChange, handleSubmit, categories, handleSelectCategory, category, error, isFilter }) => {
  return (
    <div className='mt-8'>
      <h2 className='text-sm uppercase text-slate-700 mb-4'>select category</h2>
       <div className='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-2'>
        {categories?.map(cat => 
          <div key={cat.id} className='flex gap-2 items-center'>
            <div  
              onClick={() => handleSelectCategory(cat.id)}
              className={`h-6 w-6 rounded-full ${category === cat.id ? 'border-green-700 bg-green-600' : 'border-slate-700 bg-slate-600' }  border flex justify-center items-center`}>
              <span className='text-white'>{category === cat.id && <AiOutlineCheck />}</span>
            </div>
            <span className={` ${category === cat.id ? 'text-green-600' : 'text-slate-600'} uppercase`}>{cat.name}</span>
          </div>
          )}
       </div>
       <div className='w-full bg-slate-900 rounded-full mb-2  mt-8'>
        <form
          onSubmit={handleSubmit} 
          className={`flex gap-2 items-center justify-between`} >
          <input 
            value={todo} 
            onChange={handleChange} className='flex items-center gap-2 bg-transparent p-4 w-full rounded-full text-white' />
          <div className='h-6 w-6 rounded-full border-slate-700 bg-green-500 border flex justify-center items-center mr-3'>
              <button type='submit' className='text-white'><AiOutlinePlus /></button>
          </div>
        </form>
      </div>
      <span className='text-red-500'>{error}</span>
    </div>
  )
}

export default InputTodo
