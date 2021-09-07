import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import articles from './article-content';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import ArticlesList from '../components/ArticlesList';
const ArticlePage = () => {
    const [articlesInfo,setArticleInfo] = useState(null);
    const { articleName } = useParams();
    const [postedBy,setPostedBy] = useState('');
    const [text,setText] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    useEffect(() => {
        const loadData = async () =>{
                const response= await axios.get('/api/articles/'+articleName);
                setArticleInfo(response.data);
        }
        loadData();
    },[articleName]);
    const upvoteArticle = async () => {
        const response = await axios.post('/api/articles/'+articleName+'/upvotes');
        setArticleInfo(response.data);
    }
    const addComment = async () => {
        try {
            const response = await axios.post('/api/articles/'+articleName+'/comments',{
            postedBy,
            text,
            });
            setArticleInfo(response.data);
            setPostedBy('');
            setText('');
        } catch (e) {
            setErrorMessage('Error While adding comment'); 
         }
    }
    // const params = useParams();
    // const articleName = params.articleName;
    const selectedArticle = articles.find(
        article => article.name === articleName,
    );
    const relatedArticles = articles.filter(article => article.name !== articleName)
    if (!selectedArticle){
        return(<NotFoundPage/>);
    }
    return (
        <>
        <h1>{selectedArticle.title}</h1>
        {articlesInfo && <div id = "upvote-section">
            <button onClick={upvoteArticle}>Add Upvote</button>
            <p>This article has {articlesInfo.upvote} upvotes</p>
        </div>}
        {selectedArticle.content.map(para => (
            <p>{para}</p>
        ))}
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            {errorMessage && <p>{errorMessage}</p>}
            <label>
                name:<input type="text" value={postedBy} onChange={e => setPostedBy(e.target.value)}/>
            </label>
            <label>
                Comment:<textarea rows="4" cols="50" type="text" value={text} onChange={e => setText(e.target.value)}/>
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
        <h3>Comments:</h3>
        {articlesInfo && articlesInfo.comments.map(comment => (
            <div className="comment">
                <h4>{comment.postedBy}</h4>
                <p>{comment.text}</p>
            </div>
        ))}
        <h1>Related Articles</h1>
        <ArticlesList articles={relatedArticles}/>
        </>
    );
}
export default ArticlePage;