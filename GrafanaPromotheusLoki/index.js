const express = require("express");
const { doSomeHeavyTask } = require("./util");
const client = require("prom-client")
const app = express();
const PORT = process.env.PORT || 8000;

const collectDefaulMetrics = client.collectDefaultMetrics
collectDefaulMetrics({register:client.register})

app.get("/", (req, res) => {
    return res.json({ message: 'Hello from Express Server' });
});

app.get("/slow", async (req, res) => {
    try {
        const timeTaken = await doSomeHeavyTask();
        return res.json({
            status: "Success",
            message: `Heavy task completed in ${timeTaken}ms`,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ status: "Error", error: "Internal Server Error" });
    }
});

app.get('/metrics',async (req, res) => {
  res.setHeader("Content-Type" , client.register.contentType)
  const metrics = await client.register.metrics()
  res.send(metrics)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});