let express = require("express");
let mongodb = require("mongodb").MongoClient;
let categoryRouter = express.Router();

function router(menu) {
  categoryRouter.route("/").get(function (req, res) {
    mongodb.connect(process.env.mongoUrl, function (err, dc) {
      if (err) {
        res.status(500).send("Error While Connecting to Database");
      } else {
        let dbObj = dc.db("march_node");
        dbObj
          .collection("category")
          .find()
          .toArray(function (err, response) {
            if (err) {
              res.status(500).send("Error while fetching data");
            } else {
              res.render("category", {
                title: "Category Page",
                data: response,
                menu,
              });
            }
          });
      }
    });
  });

  categoryRouter.route("/details").get(function (req, res) {
    res.send("Category Details");
  });

  return categoryRouter;
}

module.exports = router;
