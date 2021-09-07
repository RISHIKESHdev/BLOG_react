import React,{ useState,useEffect } from 'react';
import articles from './article-content';
import axios from 'axios';
import ArticlesList from '../components/ArticlesList';
const ArticleListPage = () => {
    const [articlesInfo,setArticleInfo] = useState([]);
    useEffect(() => {
        const loadData = async () =>{
            const response= await axios.get('/api/articles');
            setArticleInfo(response.data);
        }
        loadData();
    },[]);
    return (
        <>
            <h1>ArticleList</h1>
            <ArticlesList articles={articles} articleInfo={articlesInfo}/>
        </>
    );
}
export default ArticleListPage;