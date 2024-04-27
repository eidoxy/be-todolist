const knex = require('../../database');
const { check, validationResult } = require('express-validator');

module.exports = {
  createUser: async (req, res) => {
    const { nrp, name } = req.body;
    await check('nrp').isString().notEmpty().isLength({ min: 10, max: 10 }).run(req);
    await check('name').isString().notEmpty().run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).json({ error: result.array() });
    const user = await knex('users').insert({ nrp, name });
    if (user.length == 0) return res.status(400).json({ message: 'Failed to create user' });
    return res.status(200).json({ message: 'User created successfully' });
  },
  getUsers: async (req, res) => {
    const users = await knex('users').select('*');
    return res.status(200).json({ data: users, message: 'Success get all users data' });
  },
  getUser: async (req, res) => {
    const { id } = req.params;
    const users = await knex('users').select('*').where({ id });
    return res.status(200).json({ data: users, message: 'Success get user data' });
  },
  updateUser: async (req, res) => {
    const { nrp, name } = req.body;
    const { id } = req.params;
    const user = await knex('users').where({ id }).first();
    if (!user) return res.status(404).json({ message: 'User not found' });
    const users = await knex('users')
      .update({
        nrp,
        name,
      })
      .where({ id });
    return res.status(200).json({ data: users, message: 'Success update user data' });
  },
  deleteUser: async (req, res) => {
    const { nrp, name } = req.body;
    const { id } = req.params;
    const user = await knex('users').where({ nrp }).first();
    if (!user) return res.status(404).json({ message: 'User not found' });
    const users = await knex('users').where({ id }).delete();
    return res.status(200).json({ data: users, message: 'Success delete user data' });
  },
};
