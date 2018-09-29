const express = require("express")
const exphbs = require("express-hbs")

const app = express()
const port = 3000

app.use((req, res, next) => {
    next()
})

app.engine(
    "handlebars",
    exphbs.express4({
        defaultLayout: "./views/layouts/main.handlebars",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: [
            //  path to your partials
            __dirname + "/views/partials"
        ]
    })
)

app.set("view engine", "handlebars")

// const scripts = { script:  }

app.get("/", (req, res) => {
    res.render("index", {
        title: "Welcome",
        scripts: "./lib/drag_drop.js"
    })
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.listen(port, err => {
    console.log("         ")
    console.log(`App started on port ${port}`)
})
