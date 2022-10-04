const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const app = express();
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


mongoose.connect("mongodb+srv://user_cagatay:qqugZTCLorQGEavT@cluster0.chvjkzt.mongodb.net/codeacademydb", { useNewUrlParser: true });


//DB TABLE
const productSchema = new Schema({
    name: String,
    date: { type: Date, default: Date.now },
    price: Number,
    status: Boolean,
    points: [],
    supplier: {},
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
})

const categorySchema = new Schema({
    name: String,
    description: String
})

const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);




app.post('/api/products',

    body('name').notEmpty().withMessage('Name is required'),
    body('price').notEmpty()

    , (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        var product = new Product({
            name: req.body.name,
            price: req.body.price,
            status: true,
            category: req.body.categoryId
        });



        product.save();

        res.send('Success!!');

    })


app.get('/api/products', (req, res) => {

    let columns = req.query.columns;
    let limit = req.query.limit;
    let skip = req.query.skip;

    let select = '';

    if (columns) {
        let columnsArray = columns.split(',');

        columnsArray.forEach(element => {
            select = element + ' ' + select;
        });
    }


    //GETALL
    // Product.find({}, (err, docs) => {

    //     if (!err) {
    //         res.json(docs)
    //     }
    //     else {
    //         res.status(500).json(err);
    //     }

    // })


    Product.find().select(select).populate('category').skip(skip).limit(limit).exec((err, docs) => {
        res.json(docs)
    })

})


app.get('/api/products/:id', (req, res) => {

    let id = req.params.id;

    Product.findById(id, (err, doc) => {
        if (!err) {
            if (doc)
                res.json(doc);
            else
                res.status(404).json({ "message": "Not found!" })
        }
        else {
            res.status(500).json(err)
        }
    })

})

app.delete('/api/products/:id', (req, res) => {

    let id = req.params.id;

    Product.findByIdAndDelete(id, (err) => {
        if (!err)
            res.json({ 'messagae': 'Success!' })
        else
            res.status(500).json(err)
    })

})


app.put('/api/products/:id', (req, res) => {

    let id = req.params.id;
    //1.yol

    // Product.findById(id, (err, doc) => {

    //     if (!err) {
    //         doc.name = req.body.name;
    //         doc.price = req.body.price;

    //         doc.save((saveErr, updatedDoc) => {
    //             if (!saveErr)
    //                 res.json(updatedDoc)
    //             else
    //                 res.status(500).json(err);

    //         });
    //     }
    //     else {
    //         res.status(500).json(err);
    //     }


    // })


    Product.findByIdAndUpdate(id, req.body, (err, doc) => {
        if (!err) {
            res.json({ 'message': 'success' });
        }
        else {
            res.status(500).json(err);
        }
    })

})




app.listen(8080, () => {
    console.log('Server is running!!');
})