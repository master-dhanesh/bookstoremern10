const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        poster: String,
        name: {
            type: String,
            required: [true, "Book name is required"],
            minLength: [4, "Book Name must have atleast 4 characters"],
            trim: true,
            // uppercase: true ,
            // lowercase: true,
            // maxLength: [15,message],
            // unique:true,
            // default: "hello",
            // select: true,
            // match: [/regex/, "invalid message"]
        },
        author: {
            type: String,
            required: [true, "Author name is required"],
            minLength: [4, "Author Name must have atleast 4 characters"],
            trim: true,
        },
        isbn: {
            type: String,
            unique: true,
            required: [true, "Book ISBN is required"],
            minLength: [13, "Book ISBN must have atleast 13 characters"],
            maxLength: [13, "Book ISBN must not exceed 13 characters"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            trim: true,
            default: 0,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            minLength: [10, "Description must have atleast 10 characters"],
            trim: true,
        },
    },
    { timestamps: true }
);

const bookCollection = mongoose.model("book", bookSchema);

module.exports = bookCollection;
