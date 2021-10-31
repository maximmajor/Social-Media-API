import express from 'express';
import { Request, Response, NextFunction } from 'express';
const  router = express.Router();
import bcrypt from "bcrypt"
import User from "../models/user"



//UPDATE USER
router.put('/:id', async (req:any, res:Response, next:NextFunction) => {
  if (req.body.userId === req.params.id || req.body.isAdmin ) {
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

router.delete('/:id', async (req:any, res:Response, next:NextFunction) => {
  if (req.body.userId === req.params.id || req.body.isAdmin ) {
        try {
          await User.findByIdAndDelete(req.params.id)
          return res.status(200).json("Account has been deleted")
        } catch (err){
          return res.status(500).json(err)
        }
      }
      else {
        return res.status(403).json("you can delete only your account")
      }
    
});

//GET USER
router.get('/:id', async (req:any, res:Response, next:NextFunction) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
    
});

export default router;
