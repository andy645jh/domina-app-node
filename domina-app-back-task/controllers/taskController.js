const { validateDelete, validateUpdate, validateCreate } = require('../utils/validators/taskValidator');
const { getErrorMsg } = require('../utils/responseHelper');
const db = require('./db');
const asyncHandler = require('express-async-handler');
const tableName = 'task';

exports.list = asyncHandler(async (req, res, next) => {
    const condition = req.params.userId === undefined ? '' : ' WHERE id_user=' + req.params.userId;
    let result = await db.query('SELECT * FROM ' + tableName + condition + ' order by id_task desc');
    return res.status(200).json({ status: 'success', message: 'listed successfully', data: result });
});

exports.create = asyncHandler(async (req, res, next) => {
    const p = req.body;
    try {
        validateCreate(p);
        const params = [p.title, p.description, new Date(Date.now()), p.id_user];
        const result = await db.query('INSERT INTO ' + tableName + ' (title,description,create_at,id_user) VALUES(?,?,?,?)', params);
        let entities = await db.query('SELECT * FROM ' + tableName + ' where id_task=?', [result.insertId]);
        return res.status(200).json({ status: 'success', message: 'created successfully', data: entities[0] });
    } catch (error) {
        console.log(error);
        return getErrorMsg(res, error);
    }
});

exports.update = asyncHandler(async (req, res, next) => {
    const p = req.body;
    try {
        validateUpdate(p);
        await db.query('UPDATE ' + tableName + ' SET title=?,description=? WHERE id_task=' + p.id_task, [p.title, p.description]);
        let entities = await db.query('SELECT * FROM ' + tableName + ' where id_task=?', [p.id_task]);
        console.log("task updated: ", entities[0]);
        return res.status(200).json({ status: 'success', message: 'updated successfully', data: entities[0] });
    }
    catch (error) {
        return getErrorMsg(res, error);
    }
});

exports.delete = asyncHandler(async (req, res, next) => {
    const p = req.body;
    try {
        validateDelete(p);
        await db.query('DELETE FROM ' + tableName + ' WHERE id_task=' + p.id_task);
        return res.status(200).json({ status: 'success', message: 'deleted successfully', data: [] });
    }
    catch (error) {
        return getErrorMsg(res, error);
    }
});