import { useEffect } from "react"
import { fetchOne } from "../../tools/server"
import { useParams } from 'react-router-dom'
import { useState } from "react"
import Loading from "../loading"

const SinglePost = () => {

    const [post, setPost] = useState(null)

    const params = useParams()
    const id = params.id
    console.log(params.id)

    useEffect(()=>{
        fetchOne(id).then((obj)=>{
            console.log(obj)
            setPost(obj)
        })
    },[id])

    const SubComp = () => {
        const date = new Date(post.publishDate)

        return <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <figure className="mt-10 entrymate">
          <figcaption className="mt-10 pb-8 sm:pb-10">
              <img className="mx-auto h-10 w-10 rounded-full" src={post.author.avatar} alt=""/>
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">{post.author.name}</div>
                <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" className="fill-gray-900">
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <div className="text-gray-600">{date.toDateString()} at {date.toLocaleTimeString()}</div>
              </div>
            </figcaption>
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>{post.title}</p>
            </blockquote>
            <h1 className="text-2xl font-light tracking-tight text-center text-gray-900 sm:text-2xl">{post.summary}</h1>
          </figure>
          <br/>
          <br/>
          <hr/>
          <span className="relative z-10 rounded bg-gray-50 text-center font-medium text-gray-600 hover:bg-gray-100">
                <h4 className="text-center">
                Tags
                </h4>
                <hr/>
                {post.categories.map((catagory)=>{
                    return <div key={catagory.id}>
                        #{catagory.name}
                    </div>
                })}
            </span>
        </div>
      </section>
    }
 
    return post? <SubComp/> : <Loading/>
  
}

export default SinglePost