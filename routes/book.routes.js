const express=require('express');
const controller=require('../controller/book.controller')
const router =express.Router();

router.get('/',controller.getAllBooks)


router.get('/:id',controller.getAllBooksByID)


router.post('/',controller.CreateBook)

router.delete('/:id',controller.deleteBookById)



module.exports=router;