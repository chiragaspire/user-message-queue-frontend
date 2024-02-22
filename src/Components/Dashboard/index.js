import { Button, Container, Divider, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useHttpApiHook } from '../../services/ApiServices';
import CreateTask from './CreateTask';
import CustomPopup from '../CustomPopup';
import TaskDetails from './TaskDetails';

const initialTasks = [
  {
    title: 'Task 1',
    status: 'in-progress',
    due_date: new Date()
  },
  {
    title: 'Task 2',
    status: 'completed',
    due_date: new Date()
  },
]

const Dashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { getApi, deleteApi } = useHttpApiHook();

  const fetchApi = async () => {
    const { status, data } = await getApi(`/api/tasks/fetch`)
    if (status === 401) {
      throw data.error;
    }
    setTasks(data.tasks)
  }

  useEffect(() => {
    fetchApi();
  }, []);

  
  const removeTask = async (task) => {
    try {
      const url = `/api/tasks/${task._id}`;
      const result = await deleteApi(url);
      if (result.status === 200) {
        alert('Removed Task Successfully!!!!');
        fetchApi();
      } else {
        alert('Failed to remove Task!!');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handlePopupOpen=() => {
    setPopupOpen(true);
  }

  const handlePopupClose=() => {
    setPopupOpen(false);
  }
  return (
    <Container >
      <div className="mt-2">

        {isPopupOpen && (
          <CustomPopup
          onClose={handlePopupClose}
         
          >
            <CreateTask reloadData={fetchApi} handleClose={handlePopupClose} />
          </CustomPopup>
        )}
        
        <Button onClick={handlePopupOpen} variant="outlined">Create New Task</Button>
        <hr />
        <h2 className='m-2'>Task List</h2>
        <Stack
          sx={{ marginY: 5 }}
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          {tasks.map(task => (
            <TaskDetails key={task?._id} task={task} removeTask={removeTask} />
          ))}
        </Stack>
      </div>

    </Container>
    // <div>
    //   Dashboard
    // </div>
  )
}

export default Dashboard;