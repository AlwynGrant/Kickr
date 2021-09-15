const express = require('express')
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Image } = require('../../db/models');
const router = express.Router();

const validateImage = [
    check('imageUrl')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid url.'),
    handleValidationErrors
];


// new image
router.post("/", validateImage , asyncHandler(async (req, res) => {

    const { userId, imageUrl, description } = req.body;
    const image = await Image.build({ userId, imageUrl, description });
    const validationErrors = validationResult(req);

        if (validationErrors.isEmpty()) {
            await image.save();
            return res.json(image);
        } else {
            const errors = validationErrors.array().map((error) => error.msg);
            return res.json(errors)
        }
}))


module.exports = router;
