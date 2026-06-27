const express=require('express')

const app=express()
const PORT=8000;

//in memory DB
//it is not state less but i dont have database
const books=[
    {id:1,title: 'Book One',auther: 'Another'},
    {id:2,title:'Book two',author:'Author Two'},
];

//Middlww wares (Plugins)
app.use(express.json());
//sent post by json format


//Routes
app.get('/books',(req,res)=>{
    //custom header ko x se suru kr good practice
    res.setHeader('x-Ankita','Ankita Jain');
    res.json(books);
})


app.get('/books/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    if(isNaN(id))//bad request
        return res.status(400).json({error: 'Id must be of type number'})
    const book =books.find(e=> e.id=== id)///select * from 

    if(!book)
        return res
            .status(404)
            .json({error:`Book with id ${id} does not found`})


    return res.json(book);
})


app.post('/books',(req,res)=>{
    const {title,author}=req.body;

    if(!title || title==='') return res.status(400).json({error:'title is required'})
    if(!author || author==='') return res.status(400).json({error:'author is required'})

    console.log(req.header)
    console.log(req.body);

     
    const id=books.length+1;
    const book={id,title,author};
    books.push(book);

    return res.status(201).json({message:'Book is created with id: ',id});



})

app.delete('/books/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    if(isNaN(id))//bad request
        return res.status(400).json({error: 'Id must be of type number'})
    
        
    const IndexTodelete=books.findIndex(e=>e.id==id)

    if(IndexTodelete<0)
        return res
            .status(404)
            .json({error:`Book with id ${id} does not found`})


    books.splice(IndexTodelete,1);
    return res.status(200).json({message:'book deleted'});
})






app.listen(PORT,()=>console.log(`Http server is running on PORT ${PORT}`));
