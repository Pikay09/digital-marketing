
// this function takes an array and spits out the sliced array

// const somearray = [1,2,3,4,14,675,34,12,7,5,34,64,24,543,32,53,64,67,32,645,67,85,34,75,342]
// const page = 2

export const slicer = (array, pagenum) => {
    const itemsPerPage = 9
    const numberOfPages = Math.ceil(array.length / itemsPerPage)
    const slicedPosts = array.slice((pagenum*itemsPerPage-itemsPerPage),(pagenum*itemsPerPage))
    console.log("numOfPages",numberOfPages)
    return {slicedPosts,numberOfPages}
}
