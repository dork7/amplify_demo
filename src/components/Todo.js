import { Amplify, API } from 'aws-amplify';
import React, { useEffect, useRef, useState } from 'react';

const Todo = () => {

    const myAPI = 'todoApi'
    const path = '/item'

    const [mCounter, setMCounter] = useState(1)

    const [todo, setTodo] = useState([])

    const fetchTodos = () => {
        API.get(myAPI, path).then(res => {
            setTodo((res.data.Items))
            console.log('res :>> ', res);
        }).catch(err => {
            console.log('err :>> ', err);
        })
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    const postData = () => {
        setMCounter(mCounter + 1)
        const body = {
            descp: "task " + mCounter,
            status: "pending"
        }
        API.post(myAPI, path, {
            body
        }).then(res => {
            fetchTodos()
            // setTodo([...todo, body])
            console.log('post res :>> ', res);
        }).catch(err => {
            console.log('post err :>> ', err);
        })
    }


    return (
        <>
            <div>Todo</div>
            <div>{todo.map(({ id, descp, status }) =>
                (<div key={id}> {id + ' - ' + descp + ' - ' + status} </div>)
            )}</div>
            <button onClick={postData}>Post</button>
        </>
    )
}

export default Todo