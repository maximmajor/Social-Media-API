"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
//UPDATE USER
router.put('/:id', async (req, res, next) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt_1.default.genSalt(10);
                req.body.password = await bcrypt_1.default.hash(req.body.password, salt);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await user_1.default.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("you can update only your account");
    }
});
router.delete('/:id', async (req, res, next) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await user_1.default.findByIdAndDelete(req.params.id);
            return res.status(200).json("Account has been deleted");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("you can delete only your account");
    }
});
//GET USER
router.get('/:id', async (req, res, next) => {
    try {
        const user = await user_1.default.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map