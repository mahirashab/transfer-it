const express = require("express")
const router = express.Router()
const tus = require("tus-node-server")

const server = new tus.Server()
const EVENTS = require("tus-node-server").EVENTS

server.datastore = new tus.FileStore({
    path: "/uploads"
})

router.all("*/", server.handle.bind(server))
router.all("*/:id", server.handle.bind(server))

server.on(EVENTS.EVENT_UPLOAD_COMPLETE, event => {
    console.log(`Upload complete for file ${event.file.id}`)
})

module.exports = router
