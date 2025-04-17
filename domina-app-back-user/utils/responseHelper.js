exports.getErrorMsg = (res, error) => {
    const msg = (error.issues) ? error.issues[0].message : error.message;
    return res.status(400).json({ status: 'failed', message: msg, data: [] });
}