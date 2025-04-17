const { validateCreate, validateLogin } = require('../utils/validators/userValidator');
const db = require('./db');
const { salt } = require('../utils/config');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { getErrorMsg } = require('../utils/responseHelper');

const tableName = 'user';

exports.list = asyncHandler(async (req, res, next) => {
    let result = await db.query('SELECT * FROM ' + tableName);
    return res.json(result);
});

exports.create = asyncHandler(async (req, res, next) => {
    const p = req.body;
    try {
        validateCreate(p);
        const pswEnc = await encryptPassword(p.password);
        console.log("pswEnc: ", pswEnc.length);

        let entities = await db.query('SELECT email FROM ' + tableName + ' where email=?', [p.email]);
        if (entities.length > 0) throw Error('The email already exists');

        const result = await db.query('INSERT INTO ' + tableName + ' (name,last_name,email,password) VALUES(?,?,?,?)', [p.name, p.lastname, p.email, pswEnc]);
        entities = await db.query('SELECT * FROM ' + tableName + ' where id_user=?', [result.insertId]);
        delete entities[0].password;
        return res.status(200).json({ status: 'success', message: 'created successfully', data: entities[0] });
    } catch (error) {
        console.log("error", error);
        return getErrorMsg(res, error);
    }
});

exports.login = asyncHandler(async (req, res, next) => {
    const p = req.body;
    try {
        validateLogin(p);

        let entities = await db.query('SELECT * FROM ' + tableName + ' where email=?', [p.email]);
        if (entities.length === 0) throw Error("Username does not exist");

        const result = await bcrypt.compare(p.password, entities[0].password);
        if (result !== true) throw Error("Password is incorrect");

        delete entities[0].password;
        return res.status(200).json({ status: 'success', message: 'logged successfully', data: entities[0] });
    } catch (error) {
        return getErrorMsg(res, error);
    }
});

const encryptPassword = async (password) => {
    const result = await bcrypt.hash(password, 10);
    return result;
};