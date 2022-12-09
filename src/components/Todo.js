
import { Button, Stack, InputGroup, Input, InputLeftAddon, InputRightAddon } from '@chakra-ui/react';
import { Amplify, API } from 'aws-amplify';
import React, { useEffect, useRef, useState } from 'react';
import TextInput from './TextInput';

const Todo = () => {

    const myAPI = 'todoApi'
    const path = '/item'

    const [mCounter, setMCounter] = useState(1)

    const [todo, setTodo] = useState([])

    const [task, setTask] = useState('')

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

    const inputSubmit = (e) => {
        e.preventDefault()
        console.log('task :>> ', task);
        if (task === '') return
        const body = {
            descp: task,
            status: "pending"
        }
        setTask('')
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

    const onDelete = (id) => {
        API.del(myAPI, `${path}/${id}`).then(res => {
            fetchTodos()
            // setTodo([...todo, body])
            console.log('post res :>> ', res);
        }).catch(err => {
            console.log('post err :>> ', err);
        })
    }

    const setDone = (id, isDone) => {
        console.log('done :>> ', isDone);
        API.put(myAPI, `${path}/${id}`, {
            body: { status: isDone ? "pending" : "done" }
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
            {/* <Button colorScheme='teal' variant='solid' onClick={postData}>Post</Button> */}
            <Stack spacing={4} align='center'>
                {
                    todo.map((task) => {
                        return (
                            <TextInput {...{ task, onDelete, setDone }} />
                        )
                    })
                }
                <form onSubmit={inputSubmit}>

                    <Input
                        id="task"
                        placeholder="Add Task"
                        bg="red.400"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        mt={2}
                    />
                </form>
            </Stack>
        </>
    )
}

export default Todo