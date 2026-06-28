 
 const {BOOKS}=require('../Model/book')
 exports.getAllBooks=function(req,res){
    //custom header ko x se suru kr good practice
    res.setHeader('x-Ankita','Ankita Jain');
    res.json(BOOKS);
 }

 exports.getAllBooksByID=function(req,res){
    const id=parseInt(req.params.id);
    if(isNaN(id))//bad request
        return res.status(400).json({error: 'Id must be of type number'})
    const book =BOOKS.find(e=> e.id=== id)///select * from 

    if(!book)
        return res
            .status(404)
            .json({error:`Book with id ${id} does not found`})


    return res.json(book);
 }


 exports.CreateBook=function(req,res){
    const {title,author}=req.body;

    if(!title || title==='') return res.status(400).json({error:'title is required'})
    if(!author || author==='') return res.status(400).json({error:'author is required'})

    console.log(req.header)
    console.log(req.body);

     
    const id=BOOKS.length+1;
    const book={id,title,author};
    BOOKS.push(book);

    return res.status(201).json({message:'Book is created with id: ',id});


 }
 exports.deleteBookById=function(req,res){
    const id=parseInt(req.params.id);
    if(isNaN(id))//bad request
        return res.status(400).json({error: 'Id must be of type number'})
    
        
    const IndexTodelete=BOOKS.findIndex(e=>e.id==id)

    if(IndexTodelete<0)
        return res
            .status(404)
            .json({error:`Book with id ${id} does not found`})


    BOOKS.splice(IndexTodelete,1);
    return res.status(200).json({message:'book deleted'});
 }