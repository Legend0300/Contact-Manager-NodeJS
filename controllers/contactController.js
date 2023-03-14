const express = require('express');
const asyncHandler = require('express-async-handler');
const Contact  = require('../models/contactModel.js');
const mongoose = require('mongoose');
const validateToken = require('../middleware/validateToken.js');




const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.json({contacts});

}
);

const getContact = asyncHandler(async (req, res) => {
    const {name , email, phone} = req.body;
    const contact = await Contact.findById(req.params.id);
    res.json({contact})
}
);

const createContact = asyncHandler(async (req, res) => {
    const {name , email, phone} = req.body;
    const contact = await Contact.create({name, email, phone});
    res.json({contact})
}
);

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(contact) {
        updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
    }


    res.json({updatedContact})
}
);

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(contact) {
        deletedContact = await Contact.findByIdAndDelete(req.params.id);
    res.json({deletedContact})
}
}
);

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact };