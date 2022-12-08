// require NPM packes and helper function file
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid =require("./helpers/uuid");
const { allowedNodeEnvironmentFlags } = require("process");


// Setup for Backend- cookie cutter
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));


//HTML Routes
app.get("/", (req,res) =>
    res.sendFile(path.join(__dirname, "./public/index.html"))
);
app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "./public/notes.html"))
);

//API routes
// GET ROUTE
app.get("/api/notes", (req,res) => {
let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
res.json(notes);
});

// POST ROUTE
app.post("/api/notes", (req,res) => {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let addnote = req.body;
    addnote.title = req.body.title;
    addnote.text = req.body.text;
    addnote.id = uuid();
    let updatedNotes = [...notes,addnote];
    fs.writeFileSync("./db/db.json", JSON.stringify(updatedNotes));
    res.json(updatedNotes)
});

// sets up backend to listen for any requests to local PORT
app.listen(PORT, () =>
console.log(`App is listening at hhtp://localhost:${PORT}`)
)