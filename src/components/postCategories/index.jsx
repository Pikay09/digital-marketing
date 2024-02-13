import { useState, useEffect, useContext } from "react"
import { slicer } from "../../tools"
import Paginate from "../pagination"
import { DataContext } from "../../context/dataContext"
import Loading from "../loading"
import { Link } from "react-router-dom"


export default function CategoriesPosts() {

    const [posts, setPosts] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [numOfPages, setNumOfPages] = useState(1)

    const {categoriesPosts, categories, query } = useContext(DataContext)
    console.log("from contxt:", categories)

    useEffect(()=>{
            const postsPerPage = slicer(categoriesPosts?categoriesPosts:[], currentPage)
            // sets the posts to display
            setPosts(postsPerPage.slicedPosts)
            // sets the calculated num of pages
            setNumOfPages(postsPerPage.numberOfPages)

    },[currentPage, categories, numOfPages, query, categoriesPosts])

    const SubComp = () =>{
        return (
            <div className="bg-white">
              <div className="mx-auto max-w-7xl p-6 lg:p-8">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl animate">{categories}</h2>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  {posts.map((post) => {
                      const date = new Date(post.publishDate)
                    return <article key={post.id} className="entrymate flex max-w-xl flex-col items-start justify-between">
                      <div className="flex items-center gap-x-4 text-xs ease-in-out duration-300 ">
                        <time dateTime={post.publishDate} className="text-gray-500">
                          {date.toDateString()} at {date.toLocaleTimeString()}
                        </time>
                        
                      </div>
                      <div className="group relative ease-in-out duration-300 ">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <Link to={`/${post.id}/posts`}>
                            <span className="absolute inset-0" />
                            {post.title}
                          </Link>
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.summary}</p>
                      </div>
                      <div className="relative mt-8 flex items-center gap-x-4">
                        <img src={post.author.avatar} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                        <div className="text-sm leading-6">
                          <p className="font-semibold text-gray-900">
                            <Link to={`/${post.id}/posts`}>
                              <span className="absolute inset-0" />
                              {post.author.name}
                            </Link>
                          </p>
                          {/* <p className="text-gray-600">role: starting</p> */}
                          
                        </div>
                      </div>
                      <br/>
                      <span
                          className="relative z-10 rounded bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                        >
                          Tags
                          <hr/>
                          {post.categories.map((catagory,idx)=>{
                              return <div key={idx}>
                                   #{catagory}
                              </div>
                          })}
                        </span>
                      
                      <br/>
                      <hr/>
                      <br/>
                    </article>
                  })}
                  
                </div>
              </div>
              <Paginate setCurrentPage={setCurrentPage} numOfPages={numOfPages} currentPage={currentPage}/>
            </div>
          )
    }
 
    return posts? <SubComp/> : <Loading/>
 
  }
  