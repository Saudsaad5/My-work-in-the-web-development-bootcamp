import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Hello</h1>")
});

app.get("/about", (req, res) => {
    res.send("<h1>My name is:</h1> <p>Saud Saad Aljedani</p>")
});

app.get("/contact", (req, res) => {
    res.send("<h1>Email:</h1> <p>saudsaadj3@gmail.com</p>")
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});