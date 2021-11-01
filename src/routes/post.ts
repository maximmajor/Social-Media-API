import express from 'express';
import { Request, Response, NextFunction } from 'express';
const router = express.Router();
import bcrypt from "bcrypt"
import Post from "../models/post"


// Create Post
router.post('/', async (req: any, res: Response, next: NextFunction) => {
    
  const newPost = new Post(req.body)
  try {
      const savedPost = await newPost.save()
      res.status(200).json(savedPost)
  } catch (err) {
      res.status(500).json(err)
  }
  });

//Update a Post
router.put('/:id', async (req: any, res: Response, next: NextFunction) => {
    
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.updateOne({$set:req.body})
            res.status(200).json("the post has been updated")
        } else {
            res.status(403).json("you can update only your post")
        }
        } catch (err) {
            res.status(500).json(err)
        }
    });


    // Delete Post
    router.delete('/:id', async (req: any, res: Response, next: NextFunction) => {
    
        try {
            const post = await Post.findById(req.params.id)
            if (post.userId === req.body.userId) {
                await post.deleteOne()
                res.status(200).json("the post has been deleted")
            } else {
                res.status(403).json("you can delete only your post")
            }
            } catch (err) {
                res.status(500).json(err)
            }
        });

        

export default router;