const express = require("express")
const router = express.Router()
const tus = require("tus-node-server")
const fs = require("fs")

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

const metadataStringToObject = stringValue => {
    const keyValuePairList = stringValue.split(",")

    return keyValuePairList.reduce((metadata, keyValuePair) => {
        let [key, base64Value] = keyValuePair.split(" ")
        metadata[key] = new Buffer(base64Value, "base64").toString("ascii")

        return metadata
    }, {})
}

server.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, event => {
    fs.rename(
        `./uploads/${event.file.id}`,
        `./uploads/${
            metadataStringToObject(event.file.upload_metadata).filename
        }`
    )
})

module.exports = router
