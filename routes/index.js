var express = require("express");
var router = express.Router();

const BookCollection = require("../models/bookSchema");

router.get("/", function (req, res, next) {
    res.render("home");
});

router.get("/library", async function (req, res, next) {
    try {
        const books = await BookCollection.find();
        res.render("library", { books: books });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get("/about", function (req, res, next) {
    res.render("about");
});

router.get("/create-book", function (req, res, next) {
    res.render("createbook");
});

router.post("/create-book", checkPrice, async function (req, res, next) {
    try {
        // BookCollection.create(req.body).then().catch();
        const newBook = await new BookCollection(req.body);
        await newBook.save();
        res.redirect("/library");
    } catch (error) {
        res.send(error);
    }
});

function checkPrice(req, res, next) {
    if (req.body.price < 500) {
        res.send("Price Too much Low, we do not allow to sell.");
    } else {
        next();
    }
}

router.get("/details/:id", async function (req, res, next) {
    try {
        const book = await BookCollection.findById(req.params.id);
        res.render("detailsbook", { book: book });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get("/update-book/:id", async function (req, res, next) {
    try {
        const book = await BookCollection.findById(req.params.id);
        res.render("updatebook", { book: book });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.post("/update-book/:id", async function (req, res, next) {
    try {
        await BookCollection.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get("/delete-book/:id", async function (req, res, next) {
    try {
        await BookCollection.findByIdAndDelete(req.params.id);
        res.redirect("/library");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;
