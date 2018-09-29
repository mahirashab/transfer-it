const express = require("express")
const expresshbs = require("express-handlebars")

const app = express()
const port = 3000

app.use((req, res, next) => {
    console.log("New request")
})

app.listen(port, err => {
    console.log("         ")
    console.log(`App started on port ${port}`)
})
