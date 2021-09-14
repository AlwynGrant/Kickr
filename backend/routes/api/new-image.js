const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Image } = require('../../db/models');
const router = express.Router();

const validateImage = [
    check('imageUrl')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid url.'),
    handleValidationErrors
];

router.post("/new", validateImage, asyncHandler(async (req, res) => {
    //check if the user is logged in, if not-- redirect
    // -- have this checked in frontend!

    //parse the request body
    const { imageUrl, description } = req.body;
    //build a new image using the parsed data
    const image = await Image.build({ imageUrl, description });
    //erect validations as a constant
    const validationErrors = validationResult(req);
    //check if validations are empty
    if (validationErrors.isEmpty()) {
        //if so, save the new image
        await image.save();
        //redirect
        return res.redirect('/user');
    } else {
        //if not, create an errors array
        const errors = validationErrors.array().map((error) => error.msg);
        // send back errors
        return res.json(errors)
    }
}))


module.exports = router;
