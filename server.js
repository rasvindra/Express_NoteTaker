const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid =require("./helpers/uuid")

const PORT = process.env.PORT || 3001;

const app =express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

// need to add routes


app.listen(PORT, () =>
console.log(`App is listening at hhtp://localhost:${PORT}`)
)