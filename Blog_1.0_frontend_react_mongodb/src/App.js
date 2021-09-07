import { BrowserRouter,Route,Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import NavBar from './NavBar';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <NavBar/>
      <div id="page-body">
        <Switch>
          <Route path="/" exact><HomePage/></Route>
          <Route path="/about"><AboutPage/></Route>
          <Route path="/articles" exact><ArticleListPage/></Route>
          <Route path="/articles/:articleName"><ArticlePage/></Route>
          <Route><NotFoundPage/></Route>
        </Switch>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
