import {
    Checkbox,
    IconButton,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Text,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

const TextInput = ({ task, onDelete, setDone }) => {
    // const [task, setTask] = useState(initialState);
    const isDone = task.status === "pending" ? false : true
    return (
        <div>
            <InputGroup >
                <InputLeftAddon
                    bg={!isDone ? 'red.400' : 'blue.400'}
                    children={
                        <>
                            <IconButton
                                variant="ghost"
                                onClick={() => onDelete(task?.id)}
                                icon={<AiOutlineDelete />}
                            />
                            <Text>{task?.id}</Text>
                        </>
                    }
                />{' '}

                <Input
                    //   variant={}
                    bg={!isDone ? 'red.400' : 'blue.400'}
                    value={task?.descp}
                    readOnly={true}
                />
                <InputRightAddon
                    bg={!isDone ? 'red.400' : 'blue.400'}

                    children={
                        <Checkbox
                            colorScheme="red"
                            isChecked={isDone}
                            onChange={() => setDone(task?.id , isDone)}
                        ></Checkbox>
                    }
                />
            </InputGroup>
        </div>
    );
};

export default React.memo(TextInput);