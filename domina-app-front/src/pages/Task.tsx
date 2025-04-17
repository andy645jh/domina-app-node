import React, { useEffect, useState } from 'react'
import TaskService from '../services/TaskService';
import { getId, setId } from '../utils/Store';
import TaskItem from '../components/TaskItem';
import { TaskMdl } from '../models/TaskMdl';
import CreateTask from '../components/CreateTask';
import { useNavigate } from 'react-router-dom';

export default function Task() {

    const navigate = useNavigate();
    const [tasks, setTasks] = useState<TaskMdl[]>([]);
    const [needRefresh, setNeedRefresh] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const emptyTask = ({ title: '', description: '', } as TaskMdl);

    useEffect(() => {

        if (getId() < 0) {
            navigate('/login');
        }

        const getTasks = async () => {
            try {
                const response = await TaskService.getTasks(getId());
                console.log("response: ", response);
                setTasks(response.data as TaskMdl[]);
            } catch (err) {
                console.log("Error: ", err);
            }
        }

        if (needRefresh) {
            getTasks();
            setNeedRefresh(false);
        }
    }, [needRefresh, navigate]);

    const closeSession = () => {
        setId("-1");
        navigate('/');
    };

    return (
        <div className='task-container'>
            <div className='task-top-btns'>
                <button type='button' onClick={() => setIsCreating(true)} >Add task</button>
                <button type='button' onClick={closeSession} >Logout</button>
            </div>
            <div>
                <div className='header-row'>
                    <span className='col-title'>Title</span>
                    <span className='col-desc'>Description</span>
                    <span className='col-opt'>Options</span>
                </div>

                {isCreating && <CreateTask data={{ ...emptyTask, id_user: getId() }} refreshCb={() => setNeedRefresh(true)} closeEditingCB={() => setIsCreating(false)} />}

                {tasks?.length > 0 ? tasks.map((task) => <TaskItem key={task.id_task} data={task} refreshCb={setNeedRefresh} />) : 'Empty List'}
            </div>
        </div>
    )
}
