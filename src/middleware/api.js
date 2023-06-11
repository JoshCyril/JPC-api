const express = require('express');
const router = express.Router();

//! Collections || Models
const Project = require("../models/project");
const Activite = require("../models/activite");


// ! fn to get DB name from query string
function getDBName(chkDB, res) {
    if (chkDB !== undefined) {
        switch (chkDB) {
            case "activite":
                CtrDB = Activite
                isDBExits = true
                break;
            case "project":
                CtrDB = Project
                isDBExits = true
                break;
            default:
                isDBExits = false
        }
    } else {
        res.send(`query _db not found`);
    }
}

// ------------- CREATE -------------
// ? Insert a data into the database
router.post('/create', async (req, res, next) => {
    getDBName(req.query._db, res)
    if (isDBExits) {
        const insertResult = await CtrDB.create(req.body)
        insertResult.save().then(() => {
            res.status(201).send(insertResult);
        }).catch((e) => {
            res.status(400).send(e);
        })

    } else {
        res.send(`DB ${req.query._db} not found`);
    }
});

// ------------- READ -------------
// ? get a list of data from the database
router.get('/all', (req, res, next) => {
    getDBName(req.query._db, res)
    if (isDBExits) {
        CtrDB.find({}).then((data) => {
            res.send(data);
        }).catch(next);
    } else {
        res.send(`DB ${req.query._db} not found`);
    }
});

// ? find by ID
router.get('/:id', (req, res, next) => {
    getDBName(req.query._db, res)
    if (isDBExits) {
        CtrDB.findOne({
            "_id": req.params.id
        }).then((data) => {
            res.send(data);
        }).catch(next);
    } else {
        res.send(`DB ${req.query._db} not found`);
    }
});

// ? get a list of top 3 or 4 data from the database
router.get('/top', (req, res, next) => {
    getDBName(req.query._db, res)
    if (isDBExits) {
        CtrDB.find({}).sort({
            "createdAt": -1
        }).limit(req.query.numb).then((data) => {
            res.send(data);
        }).catch(next);
    } else {
        res.send(`DB ${req.query._db} not found`);
    }
});

// ------------- UPDATE -------------
// ? update a data in the database
router.put('/u/:id', (req, res) => {

    getDBName(req.query._db, res)
    if (isDBExits) {
        CtrDB.findOneAndUpdate({
            _id: req.params.id
        }, req.body).then((data) => {
            CtrDB.findOne({
                _id: req.params.id
            }).then((data) => {
                res.send(data);
            });
        });
    } else {
        res.send(`DB ${req.query._db} not found`);
    }

});

// ------------- DELETE -------------
// ? delete a user in the database
router.delete('/d/:id', (req, res, next) => {

    getDBName(req.query._db, res)
    if (isDBExits) {
        CtrDB.findOneAndDelete({
            _id: req.params.id
        }).then(() => {
            res.send(`Deleted '${req.params.id}' from '${req.query._db}' DB`);
        }).catch(next);
    } else {
        res.send(`DB ${req.query._db} not found`);
    }
});


module.exports = router;