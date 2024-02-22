import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import { Paper } from '@mui/material';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    padding: 15,
    textAlign: 'center',
    color: '#000',
}));


const TaskDetails = (props) => {
    const { task, removeTask } = props;
    return (
        <Item>
            <div>
                <div>
                    <p><b>Title: </b>{task.title}</p>
                </div>
                <div>
                    <p><b>Description: </b>{task.description || '--'}</p>
                </div>
                <div>
                    <p><b>Status: </b>{task.status}</p>
                </div>
            </div>

            <DeleteIcon cursor="pointer" onClick={() => removeTask(task)} />
        </Item>
    )
}

export default TaskDetails;