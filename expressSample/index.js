const express = require('express')
const app = express();

const bodyParser = require('body-parser')


app.use((req,res,next) => {

    //logging...
    console.log('log...');

    next();

})

// parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



const categories = [
    {
        "id": 2,
        "description": "Sweet and savory sauces relishes spreads and seasonings",
        "name": "Condiments"
    },
    {
        "id": 1,
        "description": "Soft drinks coffees teas beers and ales",
        "name": "Beverages"
    },
    {
        "id": 3,
        "description": "Desserts candies and sweet breads",
        "name": "Confections"
    },
    {
        "id": 4,
        "description": "Cheeses",
        "name": "Dairy Products"
    },
    {
        "id": 5,
        "description": "Breads crackers pasta and cereal",
        "name": "Grains/Cereals"
    },
    {
        "id": 6,
        "description": "Prepared meats",
        "name": "Meat/Poultry"
    },
    {
        "id": 7,
        "description": "Dried fruit and bean curd",
        "name": "Produce"
    },
    {
        "id": 8,
        "description": "Seaweed and fish",
        "name": "Seafood"
    }
]


app.get('/', (req, res) => {
    res.send('Welcome...')
})


app.get('/categories', (req, res) => {

    // GET QUERY STRING!! ?.........
    console.log("req.query", req.query);
    res.json(categories);
})

app.get('/categories/:id', (req, res) => {

    let id = req.params.id;
    let category = categories.find(q => q.id == id);

    if (category)
        res.json(category);
    else
        res.status(404).json({ message: 'Not Found!' })

})


app.post('/categories', (req,res) => {


    //DELETE
    //UPDATE

    res.send('OK')
})


app.put('/categoires', (req,res) => {
    //

    res.send('');
})


app.delete('/categories', (req,res) => {

    res.status(404).json(categories)
})










app.listen(8080, () => {
    console.log('Express server is running...');
});