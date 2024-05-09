import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Header from "./components/Header";
import ArticlesList from "./components/ArticlesList";
import SingleArticle from "./components/SingleArticle";
const App = () => {
  return (
    <div>
      <Header />
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/articles" element={<ArticlesList />}/>
    <Route path="/articles/:article_id" element={<SingleArticle />} />
    </Routes>
    </div>
  )
}

export default App;