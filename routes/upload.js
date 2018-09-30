const express = require("express")
const router = express.Router()

router.post("/", (req, res, next) => {
    res.status(200).json({
        masage: "this facility is not yet programmed"
    })
})

module.exports = router
