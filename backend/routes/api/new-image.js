const express = require('express')
const asyncHandler = require('express-async-handler');

const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3')
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Image, Comment } = require('../../db/models');
const router = express.Router();

// const validateImage = [
//     check('imageUrl')
//         .exists({ checkFalsy: true })
//         .withMessage('Please provide a valid url.'),
//     handleValidationErrors
// ];

const validateComment = [
    check('comment')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid comment.'),
    handleValidationErrors
];


// new image
router.post("/", singleMulterUpload("imageUrl"),/* validateImage, */ asyncHandler(async (req, res) => {

    const { userId, description } = req.body;
    const imageUrl = await singlePublicFileUpload(req.file);
    console.log('IMAGEIMAGEIMAGE',imageUrl)
    const image = await Image.build({ userId, imageUrl, description });

    const validationErrors = validationResult(req);

    await image.save();
    return res.json(image);
    // if (validationErrors.isEmpty()) {
    // } else {
    //     const errors = validationErrors.array().map((error) => error.msg);
    //     return res.json(errors)
    // }
}));

// edit image content
router.patch('/:id(\\d+)/edit', asyncHandler(async (req, res) => {
    const { description } = req.body;
    const imageId = parseInt(req.params.id, 10);
    const image = await Image.findByPk(imageId);
    await image.update({ description });
    return res.json(image);
}));

// delete image
router.delete('/:id(\\d+)/delete', asyncHandler(async (req, res) => {
    const imageId = parseInt(req.params.id, 10);
    const image = await Image.findByPk(imageId);
    // const { imageId } = image;
    await image.destroy();
    return res.json({ deleted: 'deleted!' })
}));


// =================================================================================


// new comment
router.post("/:id(\\d+)/comment", validateComment, asyncHandler(async (req, res) => {

    const { userId, imageId, comment } = req.body;
    const newComment = await Comment.build({ userId, imageId, comment });
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
        await newComment.save();
        return res.json(newComment);
    } else {
        const errors = validationErrors.array().map((error) => error.msg);
        return res.json(errors)
    }
}));

// get all comments
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const imageId = parseInt(req.params.id, 10);

    const comments = await Comment.findAll({
        where: { imageId }
    })
    return res.json({ comments })
}));

// edit comment content
router.patch('/:id(\\d+)/comment/:id(\\d+)/edit', asyncHandler(async (req, res) => {
    const { comment } = req.body;
    const commentId = parseInt(req.params.id, 10);
    const oldComment = await Comment.findByPk(commentId);
    await oldComment.update({ comment });
    return res.json(comment);
}));

// delete comment
router.delete('/:id(\\d+)/comment/:id(\\d+)/delete', asyncHandler(async (req, res) => {
    const commentId = parseInt(req.params.id, 10);
    const comment = await Comment.findByPk(commentId);
    await comment.destroy();
    return res.json({ deleted: 'deleted!' });
}));

module.exports = router;
