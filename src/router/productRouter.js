let express = require("express");

let productRouter = express.Router();

let mongodb = require("mongodb").MongoClient;

function router(menu) {
  productRouter.route("/").get(function (req, res) {
    mongodb.connect(process.env.mongoUrl, function (err, dc) {
      if (err) {
        res.status(500).send("Error while connecting database");
      } else {
        let dbObj = dc.db("march_node");
        dbObj
          .collection("products")
          .find()
          .toArray(function (err, response) {
            if (err) {
              res.status(500).send("Error while Fetching Data");
            } else {
              res.render("product", {
                title: "Product Page",
                data: response,
                menu,
              });
            }
          });
      }
    });
  });

  productRouter.route("/category/:id").get(function (req, res) {
    let id = req.params.id;
    mongodb.connect(process.env.mongoUrl, function (err, dc) {
      if (err) {
        res.status(500).send("Error while connecting to database");
      } else {
        let dbObj = dc.db("march_node");
        dbObj
          .collection("products")
          .find({ category_id: Number(id) })
          .toArray(function (err, response) {
            if (err) {
              res.status(500).send("Error while fetching data");
            } else {
              res.render("product", {
                title: "Product Page",
                data: response,
                menu,
              });
            }
          });
      }
    });
  });

  return productRouter;
}

module.exports = router;
