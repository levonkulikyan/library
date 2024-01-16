const express = require('express');
const router = express.Router();
const { validate, ValidationError, Joi } = require('express-validation')
const UserService = require('../services/UserService')
const checkAuth = require('../middlewares/checkAuth')

const loginValidation = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{4,20}/)
            .required(),
    }),
}

const registrationValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        surename: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{4,20}/).required(),
        role: Joi.string().valid("student", "teacher", "admin").default('student'),
        mobile: Joi.number(),
        wave: Joi.string().required(),
    }),
};

router.post('/login', async function (req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await UserService.findByEmail(email);
        if (!user) {
            next("User not found");
            return;
        }
        
        const isPasswordCorrect = await UserService.checkPassword(user, password);
        if (!isPasswordCorrect) {
            next("Incorrect password");
            return;
        }

        const token = await UserService.generateToken(user);
        const expirationTime = 24 * 60 * 60 * 1000; // 1 day

        res.cookie("auth", token, {
            httpOnly: true,
            maxAge: expirationTime
        });
        res.send(UserService.toJSON(user));
    } catch (error) {
        console.error('Error during login:', error.message);
        next(error);
    }
});

router.get('/me', checkAuth, async function (req, res, next) {
    // console.log(req.user);
    res.send(UserService.toJSON(req.user))
})

// router.post('/register', validate(registrationValidation, {}, {}), async function (req, res, next) {
router.post('/register', async function (req, res, next) {
    try {

        const { name, surename, mobile, wave, email, password } = req.body;

        const existingUser = await UserService.findByEmail(email);
        if (existingUser) {
            throw new Error('Email is already registered');
        }

        const newUser = await UserService.addUser({ name, surename, mobile, wave, email, password });
        
        // const token = await UserService.generateToken(newUser)
        // const expirationTime = 24 * 60 * 60 * 1000; // 1 day
    
        // res.cookie("auth", token, {
        //     httpOnly: true,
        //     maxAge: expirationTime
            
        // })
    
        //  res.json({
        //     message: 'Registration successful',
        //     // user: UserService.toJSON(newUser),
        // });

        // res.send(UserService.toJSON(user))
    } catch (error) {
        
        console.error('Error during registration:', error.message);
        res.status(400).json({ error: error.message });
    }
});




// router.get('/me', checkAuth, async function (req, res, next) {
//     res.send(UserService.toJSON(req.user))
// })

router.post('/logout', async function (req, res, next) {
    res.cookie('auth', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.send("")
})

module.exports = router;