import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import CustomDatePicker from '../CustomDatePicker'
import { useHttpApiHook } from '../../services/ApiServices';

const CreateTask = (props) => {
    const { reloadData, handleClose } = props;
    const [newTask, setNewTask] = useState({})

    const { postApi } = useHttpApiHook();

    const createTask = async () => {
        try {
            debugger
            if (!newTask.title) {
                alert('Title is required to created task!!')
                return false
            }
            const url = '/api/tasks/';
            const payload = {
                ...newTask,
                status: 'in-progress'
            }
            const result = await postApi(url, payload);
            if (result.status === 201) {
                setNewTask({});
                await reloadData()
                handleClose()
                alert(`Task created successfully!!`)
            } else {
                alert(`Failed to create task!!`)
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleChange = (field, event) => {
        const editedTask = { ...newTask }
        editedTask[field] = event.target.value;
        setNewTask(editedTask);
    }
    return newTask ? (
        <div>
            <h2 className='m-2'>Create New Task</h2>
            <div className='border p-3'>
                <div className='m-1'>
                    <TextField label={'Title'} type='text' onChange={(e) => handleChange('title', e)} value={newTask.title} />
                </div >
                <div className='m-1'>
                    <TextField label={'Description'} type='text' onChange={(e) => handleChange('description', e)} value={newTask.description} />
                </div>
                <div className='m-1'>
                    <CustomDatePicker label={'Due Date'} value={newTask?.due_date} onChange={(newValue) => handleChange('due_date', { target: { value: newValue?.$d } })} />
                </div>
                <Button className='m-1' variant='outlined' onClick={createTask}>
                    create
                </Button>
                <Button className='m-1' variant='outlined' onClick={handleClose}>
                    cancel
                </Button>
            </div>
        </div>
    ) : null;
}

export default CreateTask