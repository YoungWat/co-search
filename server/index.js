const express = require("express")
const app = express()
const { port } = require("./config")
const generator = require("./generator")

app.get("/video", async (req, res) => {
  const encodedQ = encodeURI(req.query.q)

  const json = await Promise.all(generator.generate(encodedQ, req.query.size))

  res.json(json)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
