const express = require("express");
const connection = require("../db");

const router = express.Router();

router.get("/", function (req, res, next) {
  connection.execute(
    `
    SELECT p.*, pc.ProductCategoryName, pi.Productimagecode
    FROM product p
    LEFT JOIN productcategory pc ON p.ProductCategoryID = pc.ProductCategoryID
    LEFT JOIN productimage pi ON p.ProductID = pi.ProductID
    `,
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", data: results });
    }
  );
});

// fetch all categories
router.get("/categories", function (req, res, next) {
  connection.execute(
    "SELECT * FROM `productcategory`",
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", data: results });
    }
  );
});

// NOTE : fetch products by category
router.get("/category", function (req, res, next) {
  const { category = [], priceRange = [0, 100000], rating = [] } = req.query;

  // console.log("Received filters:");
  // console.log("category:", category);
  // console.log("priceRange:", priceRange);
  // console.log("rating:", rating);

  let categoryFilter = "";
  let priceFilter = "";
  let ratingFilter = "";

  // Handle category filter
  if (category && category.length > 0) {
    const categoryList = category.map((cat) => `'${cat}'`).join(",");
    categoryFilter = `pc.ProductCategoryName IN (${categoryList})`;
    // console.log("categoryFilter ",categoryFilter);
  }

  // Handle price range filter
  if (priceRange && priceRange.length === 2) {
    const minPrice = parseFloat(priceRange[0]);
    const maxPrice = parseFloat(priceRange[1]);
    priceFilter = `p.Price BETWEEN ${minPrice} AND ${maxPrice}`;
    // console.log("priceFilter ",priceFilter);
  }

  // Handle rating filter
  if (rating && rating.length > 0) {
    const ratingList = rating.map((rate) => parseFloat(rate)).join(",");
    ratingFilter = `p.RatingAvg <= (${ratingList})`;
    // console.log("ratingFilter ",ratingFilter);
  }

  // Combine all filters
  let whereClause = "";
  if (categoryFilter) {
    whereClause += categoryFilter;
  }
  if (priceFilter) {
    if (whereClause) whereClause += " AND ";
    whereClause += priceFilter;
  }
  if (ratingFilter) {
    if (whereClause) whereClause += " AND ";
    whereClause += ratingFilter;
  }
  // console.log("whereClause :",whereClause);
  const query = `
    SELECT p.*, pc.ProductCategoryName
    FROM product p
    LEFT JOIN productcategory pc ON p.ProductCategoryID = pc.ProductCategoryID
    ${whereClause ? `WHERE ${whereClause}` : ""}
  `;

  connection.execute(query, function (err, results, fields) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    res.json({ status: "ok", data: results });
  });
});

// NOTE: fetch product detail
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  connection.execute(
    `
  SELECT 
    p.ProductID,
    p.ProductName,
    p.RatingAvg,
    p.ProductDescription,
    p.Price,
    p.QuantityAvailable,
    pi.Productimagecode,
    pi.ProductimageID,
    pi.ProductimageName,
    s.ShopName,
    s.ShopDescription,
    s.RatingAvg AS ShopRatingAvg,
    pr.Comment AS ReviewComment,
    pr.Rating AS ReviewRating,
    c.FirstName,
    c.LastName,
    c.Image AS ClientImage
  FROM product p
  LEFT JOIN 
    productimage pi ON p.ProductID = pi.ProductID
  LEFT JOIN
    shop s ON p.ShopID = s.ShopID
  LEFT JOIN
    productreviews pr ON p.ProductID = pr.ProductID
  LEFT JOIN
    client c ON pr.ClientID = c.ClientID
  WHERE 
    p.ProductID = ?`,
    [id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      const productDetail = results.reduce((acc, row) => {
        const productId = row.ProductID;
        if (!acc[productId]) {
          acc[productId] = {
            ProductID: productId,
            ProductName: row.ProductName,
            RatingAvg: row.RatingAvg,
            ProductDescription: row.ProductDescription,
            Price: row.Price,
            QuantityAvailable: row.QuantityAvailable,
            Shop:[],
            ProductImages: [],
            Reviews: [],
          };
        }
        // shop
        if (row.ShopName) {
          const shopExists = acc[productId].Shop.some(
            (shop) => shop.ShopName === row.ShopName
          );
          if (!shopExists) {
            acc[productId].Shop.push({
              ShopName: row.ShopName,
              ShopDescription: row.ShopDescription,
              RatingAvg: row.ShopRatingAvg,
            });
          }
        }

        // images
        if (row.Productimagecode) {
          const productImage = acc[productId].ProductImages.find(
            (pi) => pi.ProductimageID === row.ProductimageID
          );
          if (!productImage) {
            acc[productId].ProductImages.push({
              ProductimageID: row.ProductimageID,
              ProductimageName: row.ProductimageName,
              Productimagecode: row.Productimagecode,
            });
          }
        }

        // reviews
        if (row.ReviewComment) {
          const reviewExists = acc[productId].Reviews.some(
            (review) =>
              review.Comment === row.ReviewComment &&
              review.Rating === row.ReviewRating &&
              review.Client.FirstName === row.FirstName &&
              review.Client.LastName === row.LastName
          );
          if (!reviewExists) {
            acc[productId].Reviews.push({
              Comment: row.ReviewComment,
              Rating: row.ReviewRating,
              Client: {
                FirstName: row.FirstName,
                LastName: row.LastName,
                Image: row.ClientImage,
              },
            });
          }
        }

        return acc;
      }, {});

      const products = Object.values(productDetail);
      console.log(products.ProductImages);
      res.json({ status: "ok", data: products });
    }
  );
});


router.get("/category/:category", function (req, res, next) {
  const { category } = req.params;
  connection.execute(
    "SELECT * FROM `product` WHERE Category = ?",
    [category],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", data: results });
    }
  );
});

router.get("/search/:name", function (req, res, next) {
  const { name } = req.params;
  connection.execute(
    "SELECT * FROM `product` WHERE Name LIKE ?",
    [`%${name}%`],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", data: results });
    }
  );
});

module.exports = router;
