const express = require('express');
const { createTodoList, getTodolists, getTodolist, updateTodolist, deleteTodolist } = require('../../resolvers/todolists');

const router = express.Router();

router.post('/:user_id', createTodoList);
router.get('/', getTodolists);
router.get('/:id', getTodolist);
router.put('/:id', updateTodolist);
router.delete('/:id', deleteTodolist);

module.exports = router;
