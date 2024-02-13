import { useEffect } from "react"
import { createContext, useState } from "react"
import { fetchAllPosts } from "../tools/server"

export const DataContext = createContext()

const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('')
console.log('alphabets',alphabets)

export const ContextProvider =({children})=>{

    const [categories, setCategories] = useState('Surveys and Forms')
    const [allPosts, setAllPosts] = useState(null)
    const [categoriesPosts, setCategoriesPosts] = useState(null)
    const [query, setQuery] = useState(alphabets)

    useEffect(()=>{
        fetchAllPosts().then((data)=>{
        
            //sets all post results
            setAllPosts(data.posts)
                // filter username by query in search box
                const usernameFiltered = data.posts.filter(data=>{
                    const username = data.author.name.toLowerCase()
                    console.log('username,',username)
                    return username.includes(query)
                })
                //only alter the data if search query is typed
                if(usernameFiltered.length >= 1){
                    setAllPosts(usernameFiltered)
                    //needed to sanitse data because idk what is id for in categories.
                    const sanitise = usernameFiltered.map((objs)=>{
                        const cats = objs.categories.map(cat=>cat.name)
                        return {...objs, categories:cats}
                    })
                    const category = sanitise.filter(some=>some.categories.includes(categories))
                    console.log("filtered: ", category)
                    //sets posts by categories results
                    setCategoriesPosts(category)

                    // if no filtered username then use the initial data.posts
                } else if(usernameFiltered.length === 0) {
                    const sanitise = data.posts.map((objs)=>{
                        const cats = objs.categories.map(cat=>cat.name)
                        return {...objs, categories:cats}
                    })
                    const category = sanitise.filter(some=>some.categories.includes(categories))
                    console.log("filtered: ", category)
                    //sets posts by categories results
                    setCategoriesPosts(category)
                }
                console.log("usernameFiltered: ",usernameFiltered)
                  
            
          })
    },[categories, query])
    
    const sharedValues = {
        categories,
        setCategories,
        allPosts,
        setAllPosts,
        categoriesPosts,
        setCategoriesPosts,
        query,
        setQuery
    }
    
    return <DataContext.Provider 
        value ={sharedValues}>
        {children}
    </DataContext.Provider>
    
}
