const express = require("express")
const app = express()
const { port } = require("./config")
const xigua = require("./video/xigua")

app.get("/video", async (req, res) => {
  res.json(await xigua(encodeURI(req.query.q)))
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
