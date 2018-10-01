const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const exphbs = require("express-hbs")

// my routes
const uploadRoute = require("./routes/upload")

// create express app and port
const app = express()
const port = process.env.PORT || 3000

// using morgan for logging
app.use(morgan("short"))

// using body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// configure hbs engine
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

// setting view engine
app.set("view engine", "handlebars")

// upload route middleware
app.use("/upload", uploadRoute)

// basic routes for main and about page
app.get("/", (req, res) => {
    res.status(200).render("index")
})

app.get("/about", (req, res) => {
    res.status(200).render("about")
})

// handling errors
app.use((req, res, next) => {
    const err = new Error("Page not found")
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        massage: err.massage || "Page not found",
        status: err.ststus || 404
    })
})

// start listen to specified port
app.listen(port, err => {
    if (err) throw err
    console.log("         ")
    console.log(`App started on port ${port}`)
})
