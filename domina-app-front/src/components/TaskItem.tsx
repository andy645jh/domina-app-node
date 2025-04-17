import { Dialog } from '@mui/material';
import { TaskMdl } from '../models/TaskMdl';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import TaskService from '../services/TaskService';
import CreateTask from './CreateTask';
import { Trash2Fill, PencilSquare } from 'react-bootstrap-icons';

export default function TaskItem(props: Readonly<{ data: TaskMdl, refreshCb: (act: boolean) => void }>) {


    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    function onClickEdit() {
        console.log("onClickEdit");
        setIsEditing(true);
    }

    function onClickDelete() {
        console.log("onClickDelete");
        setOpen(true);
    }

    async function onClickConfirmDelete() {
        console.log("onClickConfirmDelete");
        await TaskService.deleteTask(props.data.id_task);
        props.refreshCb(true);
        onCloseDialog();
    }

    const onCloseDialog = () => {
        setOpen(false);
    };

    const onClickCancelEdit = () => {
        setIsEditing(false);
    }

    return (
        <div className='task-item'>

            {!isEditing && <div className='item-row'>
                <div className='col-title'>{props.data.title}</div>
                <div className='col-desc'>{props.data.description}</div>
                <div className='col-opt'>

                    <button type='button' className='btn-opt' onClick={onClickEdit} ><PencilSquare size={20} /></button>
                    <button type='button' className='btn-opt' onClick={onClickDelete} ><Trash2Fill size={20} /></button>
                </div>
            </div>}

            {isEditing && <CreateTask data={props.data} refreshCb={props.refreshCb} closeEditingCB={onClickCancelEdit} />}

            <Dialog open={open} onClose={onCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Confirm delete</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>Cancel</Button>
                    <Button onClick={onClickConfirmDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
