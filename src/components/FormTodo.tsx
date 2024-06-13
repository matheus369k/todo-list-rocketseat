import { PlusCircle } from '@phosphor-icons/react';
import { faker } from '@faker-js/faker';

import { ChangeEvent, FormEvent, InvalidEvent, useContext, useState } from 'react';
import { TodoListContext } from '../App';

import styles from './FormTodo.module.css';

export function FormTodo() {
    const { todoListDb, setTodoListDb } = useContext(TodoListContext);

    const [textForm, setTextForm] = useState("");

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();

        if (!setTodoListDb) return;

        setTextForm("");

        if (!todoListDb) {
            setTodoListDb([{
                id: faker.database.mongodbObjectId().toString(),
                status: "incomplete",
                taskText: textForm
            }
            ]);

            return;
        }

        setTodoListDb([
            ...todoListDb,
            {
                id: faker.database.mongodbObjectId().toString(),
                status: "incomplete",
                taskText: textForm
            }
        ]);
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        setTextForm(event.target.value)

        event.target.setCustomValidity('')
    }

    function handleShouldCampEmpty(event: InvalidEvent<HTMLInputElement>) {
        event.target.setCustomValidity('O Campo e Obrigatorio Para criação de tasks');
    }

    return (
        <form onSubmit={handleCreateNewTask} className={styles.formTodo}>
            <input 
                type="text" 
                value={textForm} 
                onInvalid={handleShouldCampEmpty} 
                onChange={handleNewTaskChange} 
                placeholder="Adicione uma nova tarefa" 
                required 
            />
            <button type="submit">Criar<PlusCircle size={16} /></button>
        </form>
    )
} 