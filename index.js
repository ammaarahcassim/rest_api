const express = require("express");
const { title } = require("process");
const app =express();
app.use(express.json());
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server listening on PORT:", PORT);
});

let books = [];

let text = {"studentNumber": "2453749"} 

app.get("/whoami", (req, res) => {
    
    res.json(text)
});

app.get("/books", (req, res) => {
    res.json(books);
})

app.get("/books/:id", (req, res) => {
    const parsedID = parseInt(req.params.id);
    if(isNaN(parsedID)) return res.status(400).json({msg:'Book does not exist.'})

    const book = books.find((book) => book.id === parsedID);
    if (!book) return res.sendStatus(400);

    res.json(book);
});

app.post("/books", (req, res) => {
    const newBook = {
        id: req.body.id,
        title: req.body.title,
        details:{
            id: req.body.id,
            author: req.body.author,
            genre: req.body.genre,
            publicationYear: req.body.publicationYear
        }
    }
    books.push(newBook);
    res.json(books);
    return res.send(200);
    //error handling
});

app.put("/books/:id", (req, res) => {
    const {
        body,
        params:{id,},
    } = request;
    const parsedID = parseInt(id);
    if(isNaN(parsedID)) return res.sendStatus(400);
    const findBookIndex = books.findIndex((book) => book.id === parsedID);
    if (findBookIndex === -1) return response.sendStatus(404);
    books[findBookIndex] = {id: parsedID, ...body};
    return express.response.sendStatus(200);
    
});

app.delete("/books/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === book);
    if(index === -1){
        return res.status(404).json({message: "Not Found"});
    }
    const deletedItem = books.splice(index, 1);
    res.json({message:"Deleted Successfully"})
});

