const express = require("express");
const router = express.Router();
const algoController = require("../controller/algoController");

router.post("/matrixToGraph", algoController.matrixToGraph);
router.get("/dijkstra", algoController.getDijkstra);
router.get("/aStar", algoController.getAStar);
router.get("/bfs", algoController.getBFS);
router.get("/dfs", algoController.getDFS);

module.exports = router;
