const express = require('express');
const router = express.Router();
const itemControllers = require('./../controllers/items.controller');

router.get('/getitems', (req, res) => {
    itemControllers.getItems(req, res);
});

router.post('/createitem', (req, res) => {
    itemControllers.createItems(req, res);
});

router.post('/updateitem', (req, res) => {
    itemControllers.updateItem(req, res);
});

router.post('/deleteitem', (req, res) => {
    itemControllers.deleteItem(req, res);
});

router.post('/getsingleitem', (req, res) => {
    itemControllers.getOne(req, res);
});

module.exports = router;

// 9743275664 kumar malagimani