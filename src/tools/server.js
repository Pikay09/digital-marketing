import axios from 'axios'

const posts = axios.create({
    baseURL: "/api/posts"
})

export const fetchAllPosts = async() => {
   const data = await posts.get("/")
   return data.data
}


// find one object by id
export const fetchOne = async(id) => {
    const data = await posts.get(`/${id}`)
   return data.data
}

// find one object by id
// export const fetchById = (posts, id) => {
//     const post = posts.filter(obj => obj.id === id)
//     return post
// }