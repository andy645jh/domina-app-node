import { ResponseMdl } from '../models/ResponseMdl';
import { TaskMdl } from "../models/TaskMdl";
import { BASE_URL_TASK } from "../utils/Constants";

export default class TaskService {

    static readonly getTasks = async (userId: number): Promise<ResponseMdl> => {
        try {
            const response = await fetch(BASE_URL_TASK + 'tasks/' + userId, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            const json = await response.json();
            return json;

        } catch (error) {
            console.error("Error: ", error);
            return { status: 'failed', message: String(error) };
        }
    }

    static readonly deleteTask = async (taskId: number) => {
        try {
            const response = await fetch(BASE_URL_TASK + 'tasks/', {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_task: taskId,
                })
            });

            const json = await response.json();
            return json;

        } catch (error) {
            console.error("Error: ", error);
            return { status: 'failed', message: String(error) };
        }
    }

    static readonly updateTask = async (task: TaskMdl) => {
        try {

            console.log("update task: ", task);
            const response = await fetch(BASE_URL_TASK + 'tasks/', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task)
            });

            const json = await response.json();
            return json;

        } catch (error) {
            console.error("Error: ", error);
            return { status: 'failed', message: String(error) };
        }
    }

    static readonly createTask = async (task: TaskMdl) => {
        try {
            console.log("create task: ", task);
            const response = await fetch(BASE_URL_TASK + 'tasks/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task)
            });

            const json = await response.json();
            console.log("created task: ", json);

            return json;

        } catch (error) {
            console.error("CreateTask: ", error);
            return { status: 'failed', message: String(error) };
        }
    }
}