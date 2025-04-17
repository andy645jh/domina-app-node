import React, { ChangeEvent, useState } from 'react'
import { TaskMdl } from '../models/TaskMdl';
import TaskService from '../services/TaskService';
import { ResponseMdl } from '../models/ResponseMdl';
import { Box, BoxArrowLeft, CheckCircle } from 'react-bootstrap-icons';

type CreateTaskProps = {
    data: TaskMdl,
    refreshCb: (act: boolean) => void,
    closeEditingCB: () => void,
}
    ;

export default function CreateTask(props: Readonly<CreateTaskProps>) {

    const [taskData, setTaskData] = useState<TaskMdl>(props.data);
    const [error, setError] = useState('');

    const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setTaskData({ ...taskData, [evt.target.name]: evt.target.value });
    };

    const onClickSaveEdit = async () => {

        let res: ResponseMdl;
        if (taskData.id_task !== undefined) {
            res = await TaskService.updateTask(taskData);
        } else {
            console.log("id: ", taskData);
            res = await TaskService.createTask(taskData);
        }

        if (res.status === 'success') {
            props.refreshCb(true);
            props.closeEditingCB();
        } else {
            setError(res.message);
        }
    }

    return (
        <div>
            <div className='item-row'>
                <div className='col-title'><input className='task-input' type='text' name='title' value={taskData.title} onChange={onChange} /></div>
                <div className='col-desc'><input className='task-input' type='text' name='description' value={taskData.description} onChange={onChange} /></div>
                <div className='col-opt'>
                    <button type='button' className='btn-opt' onClick={props.closeEditingCB}><BoxArrowLeft size={20} /></button>
                    <button type='button' className='btn-opt' onClick={onClickSaveEdit}><CheckCircle size={20} /></button>
                </div>
            </div>
            <span className='task-error'>{error}</span>
        </div>
    )
}
