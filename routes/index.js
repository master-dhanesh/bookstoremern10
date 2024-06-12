var express = require("express");
var router = express.Router();

const BookCollection = require("../models/bookSchema");
const { checkPrice } = require("../utils/middlewares");
const upload = require("../utils/multer").single("poster");

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

// router.post(
//     "/create-book",
//     upload.single("poster"),
//     checkPrice,
//     async function (req, res, next) {
//         try {
//             const newBook = await new BookCollection({
//                 ...req.body,
//                 poster: req.file.filename,
//             });

//             await newBook.save();
//             res.redirect("/library");
//         } catch (error) {
//             console.log(error);
//             res.send(error);
//         }
//     }
// );

router.post("/create-book", checkPrice, async function (req, res, next) {
    upload(req, res, async function (err) {
        if (err) {
            console.log(err);
            res.json(err);
        } else {
            // ------------------------
            try {
                const newBook = await new BookCollection({
                    ...req.body,
                    poster: req.file.filename,
                });

                await newBook.save();
                res.redirect("/library");
            } catch (error) {
                console.log(error);
                res.send(error);
            }

            // --------------------
        }
    });
});

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
