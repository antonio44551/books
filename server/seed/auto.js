const Books = require("../models/book");
const seedDb = require(".");

const autoSeed = async () => {
  try {
    const count = await Books.countDocuments();
    if (!count) {
      console.log("start seeding");
      seedDb();
    } else {
      console.log("skip seeding");
    }
  } catch (error) {
    logger.error(`Autoseed failed. ${error.message}`);
  }
};

module.exports = autoSeed;
