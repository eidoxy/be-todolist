const knex = require('../../database');
const { check, validationResult } = require('express-validator');

module.exports = {
  createTodoList: async (req, res) => {
    const { title, description, user_id } = req.body;
    await check('title').isString().notEmpty().run(req);
    await check('description').isString().notEmpty().run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).json({ errors: result.array() });
    const todolist = await knex('todolists').insert({
      user_id,
      title,
      description,
    });
    if (todolist.length == 0) return res.status(400).json({ message: 'Failed Create Todo List' });
    return res.status(200).json({ message: 'Success Create Todo List' });
  },
  getTodolists: async (req, res) => {
    const todolists = await knex('todolists').select('*');
    return res.status(200).json({ data: todolists, message: 'Success get all todolists data' });
  },
  getTodolist: async (req, res) => {
    const { id } = req.params;
    const todolists = await knex('todolists').select('*').where({ id });
    return res.status(200).json({ data: todolists, message: 'Success get todolist data' });
  },
  updateTodolist: async (req, res) => {
    const { id, user_id } = req.params;
    const { title, description } = req.body;
    const todolists = await knex('todolists').select('*').where({ id });
    if (!todolists) return res.status(404).json({ message: 'Todolist not found' });
    await knex('todolists').update({ title, description }).where({ id });
    return res.status(200).json({ data: todolists, message: 'Success update todolist data' });
  },
  deleteTodolist: async (req, res) => {
    const { id } = req.params;
    await knex('todolists').where({ id }).delete();
    return res.status(200).json({ message: 'Success delete todolist data' });
  },
};
