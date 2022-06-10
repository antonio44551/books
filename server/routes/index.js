const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");

router.get("/getBooks", controller.getAllBooks);
router.get("/getBook", controller.getBookById);
router.post("/createBook", controller.createBook);
router.put("/updateBook", controller.updateBook);
router.delete("/deleteBook", controller.deleteBook);

module.exports = router;
