import express from 'express';
import { Request, Response, NextFunction } from 'express';
const  router = express.Router();
import bcrypt from "bcrypt"
import User from "../models/user"



//UPDATE USER
router.put('/:id', async (req:any, res:Response, next:NextFunction) => {
  if (req.body.userId === req.params.id || req.user.isAdmin ) {
      if (req.body.password){
        try {
          const salt = await bcrypt.genSalt(10)
          req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        catch(err){
          return res.status(500).json(err)
        }
      }
        try {
          const user = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body,
          })
         
          res.status(200).json("Account has been updated")
        }catch(err){
          return res.status(500).json(err)
        }
      }
      else {
        return res.status(403).json("you can update only your account")
      }
  
});

export default router;
