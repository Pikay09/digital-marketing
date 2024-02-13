import { useState } from "react"
import { slicer } from "../../tools"
import { useEffect } from "react"
import Paginate from "../pagination"
import Loading from "../loading"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { DataContext } from "../../context/dataContext"

  
export default function AllPosts() {
    const [posts, setPosts] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [numOfPages, setNumOfPages] = useState(1)

    const {allPosts, query} = useContext(DataContext)
    
    useEffect(()=>{
            // calls the slicer function and gets 9 posts per page          
            const postsPerPage = slicer(allPosts?allPosts:[], currentPage)
            console.log("new arr",postsPerPage)
            // sets the posts to display
            setPosts(postsPerPage.slicedPosts)
            // sets the calculated num of pages
            setNumOfPages(postsPerPage.numberOfPages)

    },[currentPage, numOfPages, query, allPosts])
    
    console.log(allPosts)

    const SubComp = () =>{
        return (
            <div className="bg-white ">
              <div className="mx-auto max-w-7xl pt-6 lg:pt-8">
              <h2 className="text-3xl font-bold tracking-tight px-6 text-gray-900 sm:text-4xl animate">All Posts</h2>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  {posts.map((post) => {
                      const date = new Date(post.publishDate)
                    return <article key={post.id} className="entrymate flex max-w-xl flex-col items-start justify-between">
                      <div className="flex items-center gap-x-4 text-xs">
                        <time dateTime={post.publishDate} className="text-gray-500">
                          {date.toDateString()} at {date.toLocaleTimeString()}
                        </time>
                        
                      </div>
                      <div className="group relative">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <Link to={`${post.id}/posts`}>
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
                            <Link to={`${post.id}/posts`}>
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
                          {post.categories.map((catagory)=>{
                              return <div key={catagory.id}>
                                   #{catagory.name}
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
  