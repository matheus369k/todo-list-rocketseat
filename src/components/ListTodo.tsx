import { Check, ClipboardText, Trash } from '@phosphor-icons/react';
import { MouseEvent as NewMouseEvent, useContext } from 'react';

import { TodoListContext } from '../App';

import styles from './ListTodo.module.css';

export function ListTodo() {
    const { todoListDb, setTodoListDb } = useContext(TodoListContext);

    function handleCheckedTask(event: NewMouseEvent<HTMLLIElement>,taskId: string) {
        event.stopPropagation();

        if (!setTodoListDb || !todoListDb) return;

        const todoListUpdateStatus = todoListDb.filter(task => {
            if (task.id !== taskId) {
                return task;
            }

            if (task.status === "complete") {
                task.status = "incomplete"

                return task;
            }

            task.status = "complete"

            return task;
        })

        setTodoListDb(todoListUpdateStatus);
    }

    function handleDeleteTask(event: NewMouseEvent<SVGSVGElement, MouseEvent>,taskId: string) {
        event.stopPropagation();

        if (!setTodoListDb || !todoListDb) return;

        const todoListWithOutDelete = todoListDb.filter(task => task.id !== taskId);

        setTodoListDb(todoListWithOutDelete);
    }

    function GetTotalCompleteTask() {
        const completeTask = todoListDb?.filter(task => task.status === "complete");
        return completeTask?.length || 0;
    }

    const isEmptyTodoListDb = todoListDb?.length === 0 || todoListDb === undefined;
    const totalTasks = todoListDb?.length || 0;
    const totalTaskComplete = isEmptyTodoListDb ? "0" : GetTotalCompleteTask() + " de " + totalTasks;
    
    return (
        <div className={styles.listTodo}>
            <header className={styles.header}>
                <span className={styles.createTasks} data-tasks={totalTasks}>Tarefas criadas</span>
                <span className={styles.finnishTasks} data-tasks={totalTaskComplete.toString()}>Concluídas</span>
            </header>
            {isEmptyTodoListDb ?
                <div className={styles.emptyList}>
                    <ClipboardText size={56} />
                    <p>Você ainda não tem tarefas cadastradas</p>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
                :
                <ul className={styles.list}>
                    {todoListDb.map(task => {
                        return (
                            <li key={task.id} onClick={(event) => handleCheckedTask(event, task.id)}>
                                <input type="checkbox" defaultChecked={task.status === "complete"} />
                                <i className={styles.checkedTask}>
                                    <Check size={14} />
                                </i>
                                <p>
                                    {task.taskText}
                                </p>
                                <Trash onClick={(event) => handleDeleteTask(event, task.id)} className={styles.deleteTask} size={24} />
                            </li>
                        )
                    })}
                </ul>
            }
        </div>
    )
}