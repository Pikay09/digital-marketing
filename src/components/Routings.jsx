import AllPosts from "./allPosts";
import MainLayout from "./layout"
import CategoriesPosts from "./postCategories";
import {Routes, Route} from "react-router-dom"
import Navigator from './navigation'
import SinglePost from "./singlePost";

function Routings() {
  return <MainLayout>
    <div>
      <Navigator/>
      <Routes>
        <Route path="/" element={<AllPosts/>}/>
        <Route path="/categories" element={<CategoriesPosts/>}/>
        <Route path="/:id/posts" element={<SinglePost/>} />
      </Routes>
    </div>
  </MainLayout>
}

export default Routings;
