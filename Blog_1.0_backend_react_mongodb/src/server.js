import express from 'express';
// const express = require('express'); No need as bable is there
import { MongoClient } from 'mongodb';
const app = express();
// line:5,15 the below line helps to site to read json post file
app.use(express.json());
const start = async () =>{
    const client =await MongoClient.connect('mongodb://localhost:27017',{
        useNewUrlParser: true, useUnifiedTopology: true,
    });
    const db = client.db('react-fstack-blog');
    app.get('/api/articles',async (req,res) => {
        const allArticles= await db.collection('articles').find({}).toArray();
        res.json(allArticles);
    });
    app.get('/api/articles/:articleName',async (req,res)=> {
        const { articleName } = req.params;
            const article =await db.collection('articles').findOne({ name: articleName });
            if (article) {
                res.json(article);
            }else {
                res.sendStatus(404);
            }
        //////////////////////////////////////////
        // try{
        //     const { articleName } = req.params;
        //     const article =await db.collection('articles').findOne({ name: articleName });
        //     if (article) {
        //         res.json(article);
        //     }else {
        //         res.sendStatus(404);
        //     }
        // } catch (e) {
        //     res.sendStatus(500);
        // }
        /////////////////////////////////////////////
        // const article = articleInfo.find(article => 
        //     article.name === req.params.articleName);
        // if (article) {
        //     res.json(article);
        // } else {
        //     res.sendStatus(404);
        // }
    });
    app.post('/api/articles/:articleName/upvotes', async(req,res)=>{
        ////////////////////////////////////////////////////////////////////////////////////
        //**********find update return in one step
        // const { articleName } = req.params;
        // const result = (await db.collection('articles').findOneAndupdate({ name:articleName },{ $inc:{upvote:1}},{returnOriginal: false})).value;
        // if (!result.lastErrorObject.n ===0 ){
        //     res.sendStatus(404);
        // } else{
        //     const updateArticle = result.Value;
        //     res.json(updateArticle);
        // }
        ////////////////////////////////////////////////////////////////////////////////////
        //find return update in one step
        // const { articleName } = req.params;
        // const updateArticle = (await db.collection('articles').findOneAndupdate({ name:articleName },{ $inc:{upvote:1},})).value;
        // res.json(updateArticle);
        ////////////////////////////////////////////////////////////////////////////////////
        //find update return in two step
        const { articleName } = req.params;
        await db.collection('articles').updateOne({ name:articleName },{ $inc:{upvote:1},});
        const updateArticle = await db.collection('articles').findOne({ name:articleName });
        res.json(updateArticle);
        ////////////////////////////////////////////////////////////////////////////////////
        // const article = articleInfo.find(article => 
        //     article.name === req.params.articleName);
        // if (article) {
        //     article.upvote +=1;
        //     res.json(article);
        // } else {
        //     res.sendStatus(404);
        // }
    });
    app.post('/api/articles/:articleName/comments', async (req, res) => {
        const { articleName } = req.params;
        const { postedBy, text } = req.body;

        const result = await db.collection('articles').findOneAndUpdate({ name: articleName }, {
            $push: { comments: { postedBy, text } },
        }, { returnDocument: 'after' });

        if (result.lastErrorObject.n === 0) {
            res.sendStatus(404);
        } else {
            const updatedArticle = result.value;
            res.json(updatedArticle);
        }
    });
    // app.post('/api/articles/:articleName/comments',async(req,res)=> {
    //     const { articleName } = req.params;
    //     const { postedBy,text } = req.body;
    //     await db.collection('articles').updateOne({ name:articleName },{ $push:{comments:{postedBy,text}}},{returOriginal:false}).value;
    //     const result =await db.collection('articles').findOne({ name:articleName }) 
    //     if (!result){
    //         res.sendStatus(404);
    //     } else{
    //         const updatedArticle = result.value;
    //         res.json(updatedArticle);
    //     }
        // const article = articleInfo.find(article => 
        //     article.name === req.params.articleName);
        // if (article) {
        //     const { postedBy,text } = req.body;
        //     // Object destructuring
        //     // const postedBy = req.params.postedBy;
        //     // const text = req.params.text;
        //     const newComment = {
        //         postedBy,
        //         text,
        //     };
        //     article.comments.push(newComment);
        //     res.json(article);
        // } else {
        //     res.sendStatus(404);
        // }
    // });
    app.listen(8080,() => {
        console.log('Server is listening');
    });
}

start();
// app.get('/hello',(req,res) => 
//     res.send('Hello Express'));
// app.get('/hello/:name',(req,res) => {
//     const name=req.params.name;
//     res.send("Hello"+ name);
// })
// app.post('/hello',(req,res) => {
//     // we can use json for post json body
//     const name=req.body.name;
//     res.send("Hello"+ name);
// })