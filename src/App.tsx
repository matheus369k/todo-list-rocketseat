import { createContext, useState } from 'react';

import { Header } from './components/Header';
import { FormTodo } from './components/FormTodo';
import { ListTodo } from './components/ListTodo';

interface TodoListType {
    id: string;
    status: "complete" | "incomplete";
    taskText: string
}

interface TodoListContextType {
  todoListDb?: TodoListType[]
  setTodoListDb?: React.Dispatch<React.SetStateAction<TodoListType[] | undefined>>;
}

export const TodoListContext = createContext<TodoListContextType>({});

export function App() {
  const [todoListDb, setTodoListDb] = useState<TodoListType[]>();

  return (
    <TodoListContext.Provider value={{todoListDb, setTodoListDb}}>
      <Header />

      <main>
        <FormTodo />

        <ListTodo />
      </main>
    </TodoListContext.Provider>
  )
}
