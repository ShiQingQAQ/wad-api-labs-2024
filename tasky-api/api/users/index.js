import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';  // 引入 express-async-handler

const router = express.Router(); // eslint-disable-line

// 获取所有用户
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// 注册/认证用户
router.post('/', asyncHandler(async (req, res) => {
    if (req.query.action === 'register') {
        try {
            const user = await User(req.body).save();
            res.status(201).json({
                code: 201,
                msg: 'Successfully created new user.',
                user
            });
        } catch (error) {
            res.status(400).json({
                code: 400,
                msg: 'Failed to register user.',
                error: error.message  // 返回详细错误信息
            });
        }
    } else {
        const user = await User.findOne(req.body);
        if (!user) {
            return res.status(401).json({ code: 401, msg: 'Authentication failed' });
        } else {
            return res.status(200).json({ code: 200, msg: "Authentication Successful", token: 'TEMPORARY_TOKEN' });
        }
    }
}));

// 更新用户
router.put('/:id', asyncHandler(async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({ _id: req.params.id }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code: 200, msg: 'User Updated Successfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
}));

export default router;