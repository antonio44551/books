const express = require("express");
const router = express.Router();

const controller = require("../controllers");

router.get("/books", controller.getBooks);
router.get("/books/:id", controller.getBook);
router.post("/books", controller.createBook);
router.put("/books/:id", controller.updateBook);
router.delete("/books/:id", controller.deleteBook);
router.delete("/books", controller.deleteAll);

module.exports = router;
