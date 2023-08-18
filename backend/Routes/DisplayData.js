const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    // console.log(global.foodData);
    res.send([global.foodItems, global.foodCategory]);
  } catch (err) {
    console.error(err);
    res.send("Server Error");
  }
});

module.exports = router;
