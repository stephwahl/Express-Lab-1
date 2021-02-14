const express = require("express");
const cart = express.Router();

const itemsList = [
    {id: 1, product: "Lip Balm", price: 4.95, quantity: 5},
    {id: 2, product: "Fancy Hand Lotion", price: 14.95, quantity: 15},
    {id: 3, product: "Stress Away EO", price: 44.95, quantity: 25},
    {id: 4, product: "Lens Cleaner", price: 2.95, quantity: 12},
    {id: 5, product: "Fancy Hand Sanitizer", price: 10.95, quantity: 10},
];

// GET /cart-items
    cart.get("/cart-items", (req, res) => {
    let filteredItems = itemsList;
// maxPrice
    if (req.query.maxPrice) {
        filteredItems = itemsList.filter( 
            (item) => item.price < parseFloat(req.query.maxPrice)
            );
    }
// prefix
    if (req.query.prefix) {
        filteredItems = itemsList.filter(
            (item) => item.product.toLowerCase().startsWith(req.query.prefix.toLowerCase())
        );
    }
// pagesize
    if (req.query.pageSize) {
        filteredItems = itemsList.slice(0, parseInt(req.query.pageSize)
        );
    }
    
    res.status(200).json(filteredItems);
});

// GET /cart-items/:id
cart.get("/cart-items/:id", (req, res) => {
    const itemById = itemsList.find(item => item.id === parseInt(req.params.id));
        if (itemById) {
            res.status(200);
            res.json(itemById);
        } else {
            res.status(404).send(`There is no product with the id: ${req.params.id}`);
        }
});

// POST /cart-items
cart.post("/cart-items", (req, res) => {
    // Get item from body
    const newItem = req.body;
    // Add to array with unique id
    newItem.id = itemsList.length + 1;
    itemsList.push(newItem);

    res.status(201).json(newItem)
});

// PUT /cart-items/:id
cart.put("/cart-items/:id", (req, res) => {
    const index = itemsList.findIndex(item => item.id === parseInt(req.params.id));
    const item = itemsList[index];
    itemsList.splice(index, 1, req.body);

    res.status(200).json(itemsList[index]);
});

// DELETE /cart-items/:id
cart.delete("/cart-items/:id", (req, res) => {
    const index = itemsList.findIndex(item => item.id === parseInt(req.params.id));
    const item = itemsList[index];
    itemsList.splice(index, 1);

    res.status(204).json(itemsList);
})

module.exports = cart;