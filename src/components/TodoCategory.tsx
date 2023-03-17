import React from 'react'

interface Props {
  personal: number,
  business: number,
  social: number,
  getTodos: (category: string) => void;
}

const TodoCategory: React.FC<Props> = ({ personal, social, business, getTodos }) => {
  return (
    <div className='mt-12'>
      <h2 className='text-sm uppercase text-slate-700'>Categories</h2>
      <div className="grid sm:grid-cols-3 mt-4 gap-2">
        <div className='rounded-lg bg-slate-900 py-4 px-6 relative'>
          <div onClick={() => getTodos('business')} className='flex justify-end text-slate-500 absolute top-2 right-2 text-sm cursor-pointer hover:underline'>view all</div>
          <span className='text-slate-700'>{business} {`task${business > 1 ? 's': ''}`}</span>
          <h2 className='text-2xl text-slate-400 uppercase'>Business</h2>
          <div className='border-b pt-6'></div>
        </div>
        <div className='rounded-lg bg-slate-900 py-4 px-6 relative'>
        <div onClick={() => getTodos('personal')} className='flex justify-end text-slate-500 absolute top-2 right-2 text-sm cursor-pointer hover:underline'>view all</div>
          <span className='text-slate-700'>{personal} {`task${personal > 1 ? 's': ''}`}</span>
          <h2 className='text-2xl text-slate-400 uppercase'>PERSONAL</h2>
          <div className='border-b pt-6'></div>
        </div>
        <div className='rounded-lg bg-slate-900 py-4 px-6 relative'>
        <div onClick={() => getTodos('social')} className='flex justify-end text-slate-500 absolute top-2 right-2 text-sm cursor-pointer hover:underline'>view all</div>
          <span className='text-slate-700'>{social} {`task${social > 1 ? 's': ''}`}</span>
          <h2 className='text-2xl text-slate-400 uppercase'>SOCIAL</h2>
          <div className='border-b pt-6'></div>
        </div>
      </div>
    </div>
  )
}

export default TodoCategory
