import { useState, useEffect } from 'react'
import { InputTodo, TodoCategory, TodoList, TodoDetails } from './components'

interface Category {
  id: number;
  name: string;
  isActive: boolean;
}

interface Todos {
  id: number;
  name: string;
  isCompleted: boolean;
  category: string;
}

const DEFAULT_CATEGORIES: Category[] = [
  { 
    id: Math.floor(Math.random() * 100),
    name: 'business',  
    isActive: false,
  },
  { 
    id: Math.floor(Math.random() * 100),
    name: 'personal',  
    isActive: false,
  },
  { 
    id: Math.floor(Math.random() * 100),
    name: 'social',  
    isActive: false,
  },
];

const DEFAULT_TODOS: Todos[] = [
  { 
    id: Math.floor(Math.random() * 100),
    name: 'Business',  
    isCompleted: false,
    category: 'business',
  },
  { 
    id: Math.floor(Math.random() * 100),
    name: 'Personal',  
    isCompleted: false,
    category: 'personal',
  },
  { 
    id: Math.floor(Math.random() * 100),
    name: 'Social',  
    isCompleted: false,
    category: 'social',
  },
];

const isTodos = localStorage.getItem('todos');

let parsedValue: any[] = [];
if (isTodos) {
  parsedValue = JSON.parse(isTodos);
}

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todos[]>(parsedValue)
  const [category, setCategory] = useState<number>(0)
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [personal, setPersonal] = useState<number>(0)
  const [social, setSocial] = useState<number>(0)
  const [business, setBusiness] = useState<number>(0)
  const [error, setErrors] = useState<string>('')
  const [isFilter, setIsFilter] = useState<boolean>(false)
  const [filteredTodos, setIFilteredTodos] = useState<Todos[]>([])
  const [pending, setPending] = useState<number>(0)
  const [completed, setCompleted] = useState<number>(0)
  const [allTodos, setAllTodos] = useState<number>(0)
  const [save, setSave] = useState<boolean>(false)
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [isCurrentTodo, setIsCurrentTodo] = useState<number>(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }

  useEffect(() => {
    setPersonal(todos.filter(t => t.category === 'personal').length)
    setSocial(todos.filter(t => t.category === 'social').length)
    setBusiness(todos.filter(t => t.category === 'business').length)
    setCompleted(todos.filter(t => t.isCompleted).length)
    setPending(todos.filter(t => !t.isCompleted).length)
    setAllTodos(todos.map(t => t).length)
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [save])
  

  const getTodoItems = () => {
    const isTodos = localStorage.getItem('todos');
    let parsedValue: any[] = [];
    if (isTodos) {
      parsedValue = JSON.parse(isTodos);
    }
    return parsedValue
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFilter(false);
    let isCategory: string = '';
    const activeCategory = categories.find(cat => cat.id === category);
    if (activeCategory) {
      isCategory = activeCategory.name;
    }

    if (!activeCategory) {
      setErrors('Please add Category')
      return;
    }

    if (!todo) {
      setErrors('Please add Todo')
      return;
    }

    if (isUpdate) {
      const todos = getTodoItems().map(t => {
        if (t.id === isCurrentTodo) {
          return {...t, name: todo, category: isCategory}
        }
        return t;
      })
      setTodos(todos)
    } else {
      const newTodo = {
        id: Math.floor(Math.random() * 100),
        name: todo, 
        isCompleted: false,
        category: isCategory,
      }
  
      setTodos(prev => ([
        ...prev,
        newTodo
      ]))
    }

    setCategory(0)
    setTodo('')
    setErrors('')
    setSave(prev => !prev)
    setIsUpdate(false)
  }

  const handleSelectCategory = (id: number) => {
    setCategory(id)
  }

  const handleTodo = (id: number) => {
    const todo = getTodoItems().map(t => {
      if (t.id === id) {
        return {...t, isCompleted: !t.isCompleted}
      }
      return t
    })

    setTodos(todo)
    setSave(prev => !prev)
  }

  const handleDelete = (id: number) => {
    const todo = getTodoItems().filter(t => t.id !== id)
    setTodos(todo)
    setSave(prev => !prev)
    setCategory(0)
  }

  const filterTodos = (category: string) => {
    const filterTodos = getTodoItems().filter(todo => todo.category === category)
    setIsFilter(true);
    setTodos(filterTodos)
  }

  const getTodos = (category: string) => {
    filterTodos(category)
  }

  const getAllTodos = () => {
    setIsFilter(false);
    setTodos(getTodoItems())
  }

  const getTodosDetails = (category: boolean) => {
    const filterTodos = getTodoItems().filter(todo => todo.isCompleted === category)
    setIsFilter(true);
    setCategory(0)
    setTodos(filterTodos)
  }

  const handleUpdate = (id: number) => {
    let todo: string = '';
    let category: any;

    const findTodo =  getTodoItems().find(todo => todo.id === id);
    if (findTodo) {
      todo = findTodo.name;
    }

    const findCategory =  categories.find(cat => cat.name === findTodo.category);
    if (findCategory) {
      category = findCategory.id;
    }
    
    setTodo(todo)
    setIsUpdate(true)
    setCategory(category)
    setIsCurrentTodo(findTodo.id)
  }

  return (
    <div className="App min-h-screen bg-slate-800 flex items-center flex-col py-32">
      <div className='w-full lg:w-1/2 px-6'>
        <div className='mt-8'>
          <h1 className='text-2xl text-white'>TODO BRUTOS</h1>
        </div>
        <TodoCategory
         personal={personal}
         business={business}
         social={social}
         getTodos={getTodos}
         />

         <TodoDetails 
          pending={pending}
          completed={completed}
          todos={todos}
          getAllTodos={getAllTodos}
          getTodosDetails={getTodosDetails}
          allTodos={allTodos}
         />
        <TodoList 
          todos={todos}
          handleTodo={handleTodo}  
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          />
        <InputTodo
          todo={todo}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          categories={categories}
          handleSelectCategory={handleSelectCategory}
          category={category}
          error={error}
          isFilter={isFilter}
        />
      </div>
    </div>
  )
}

export default App
