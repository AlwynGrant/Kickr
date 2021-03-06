const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Image } = require('../../db/models');

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];


// Sign up
router.post('/sign-up', asyncHandler(async (req, res) => {
        const { email, password, username } = req.body;
        const user = await User.signup({ email, username, password });

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);

// get all users
router.get("/", asyncHandler(async (req, res) => {
    const users = await User.findAll();
    return res.json(users)
}));

// get one user
router.get("/:userId(\\d+)", asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findOne({where: { userId: userId }});
    return res.json(user);
}));

module.exports = router;
