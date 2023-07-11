import React, { ChangeEvent, ChangeEventHandler, MouseEventHandler, SyntheticEvent, useEffect, useState } from 'react';
import './task2.css';


function Task2() {
    // setting the useStates for the different functionalities of the code. 
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState<string[]>([]);
    const [editTodoIdx, setEditTodoIdx] = useState<number | null>();
   
    var CustomMap: { [key:string]: any} = {};
    
    //gets an existing list of todos from the local storage
    const getExistingList = (): string[] => {
        const eListStr: string | null = localStorage.getItem('todoList') ?? "";
        const existingList: string[] = eListStr?.length > 0 ? JSON.parse(eListStr): [];    
        return existingList;
    };
    
    //saves a todo to local storage.
    const saveTodoList = (toSave: string[]) => {
        localStorage.setItem('todoList', JSON.stringify(toSave));
        setTodoList(toSave);
    }
    
    //entering a todo in the input field
    const enterTodo: MouseEventHandler<Element> = () => {
        const existingList = getExistingList();
        console.log(todo);
        if (editTodoIdx != null) {
            existingList[editTodoIdx] = todo;
        } else {
            existingList.push(todo);
        }
        localStorage.setItem("todoList", JSON.stringify(existingList));
        setTodoList(existingList);
        setTodo("");
        setEditTodoIdx(null);
    };

    //handling the change event. 
    const handleChange: ChangeEventHandler<Element> = (event: ChangeEvent) => {
        var elem = event.target as HTMLTextAreaElement;

    setTodo(elem.value);
    }
    //deleting an item from the list
    const deleteTodo: MouseEventHandler<Element> = (btn: React.MouseEvent<HTMLElement>) => {
        const idxNoStr = (btn.target as HTMLTextAreaElement).value;
        const idx = Number(idxNoStr);
        const existingList = getExistingList();
        existingList.splice(idx, 1);
        saveTodoList(existingList);
    }

    return(

        <>
            <header>
               <h1>Task 2: Todo List</h1>
            </header>
            <div>
                <div>
                    <div className="TodoArea">
                        <div>
                            <input type='text' placeholder='Enter Task' onChange={handleChange} value={todo} />
                            <button onClick={enterTodo}>Add</button>
                        </div>
                        <ul>
                            {todoList.map( (t:string, idx: number) => (
                                <div className='Todo' key={idx}>
                                    <li> {t} </li> 
                                    <p>
                                        <button  value={""+idx} onClick={deleteTodo}> Delete</button>                                        
                                    </p>
                                </div>
                             ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Task2;