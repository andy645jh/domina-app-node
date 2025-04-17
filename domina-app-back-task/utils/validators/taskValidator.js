const z = require('zod');

//delete
const deleteSchema = z.object({
    id_task: z.number({ message: 'id_task is required' }),
});
exports.validateDelete = (body) => deleteSchema.parse(body);

//update
const updateSchema = z.object({
    id_task: z.number({ message: '[id_task] is required' }),
    title: z.string().trim().nonempty({ message: '[title] cannot be empty' }).min(4, { message: '[title] Must be 4 or more characters long' }),
    description: z.string().trim().nonempty({ message: '[description] cannot be empty' }).min(4, { message: '[description] Must be 4 or more characters long' }),
});
exports.validateUpdate = (body) => updateSchema.parse(body);

//create
const createSchema = z.object({
    id_user: z.number({ message: '[id_user] is required' }),
    title: z.string().trim().nonempty({ message: '[title] cannot be empty' }).min(4, { message: '[title] Must be 4 or more characters long' }),
    description: z.string().trim().nonempty({ message: '[description] cannot be empty' }).min(4, { message: '[description] Must be 4 or more characters long' }),
});
exports.validateCreate = (body) => createSchema.parse(body);