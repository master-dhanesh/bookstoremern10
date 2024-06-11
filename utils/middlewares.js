exports.checkPrice = (req, res, next) => {
    if (req.body.price < 500) {
        res.send("Price Too much Low, we do not allow to sell.");
    } else {
        next();
    }
};
