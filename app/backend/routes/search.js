import express from "express";
var router = express.Router();

router.post("/", async (req, res) => {
    const { query } = req.body;
    res.json({ results: "Search results" });
});

export default router;