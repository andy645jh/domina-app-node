const z = require('zod');

//create
const createSchema = z.object({
    name: z.string().min(4, { message: '[name] Must be 4 or more characters long' }).max(45, { message: '[name] Must be 45 or less characters long' }),
    //last_name: z.string().min(4, { message: '[last_name] Must be 4 or more characters long' }).or(z.literal("")),
    email: z.string({ message: '[email] is required' }).email({ message: '[email] has invalid format' }).max(45, { message: '[email] Must be 45 or less characters long' }),
    password: z.string({ message: '[password] is required' }).min(4, { message: '[password] Must be 4 or more characters long' }).max(100, { message: '[password] Must be 100 or less characters long' }),
});
exports.validateCreate = (body) => createSchema.parse(body);

//create
const loginSchema = z.object({
    email: z.string({ message: '[email] is required' }).email({ message: '[email] has invalid format' }).max(45, { message: '[email] Must be 45 or less characters long' }),
    password: z.string({ message: '[password] is required' }).min(4, { message: '[password] Must be ${count} or more characters long' }).max(100, { message: '[password] Must be 100 or less characters long' }),
});
exports.validateLogin = (body) => loginSchema.parse(body);