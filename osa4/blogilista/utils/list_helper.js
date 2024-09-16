const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likeAmount = blogs.reduce((sumOfLikes, blog) => {
        return (sumOfLikes + blog.likes)
    }, 0)

    return likeAmount
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((favoriteBlogPost, blog) => {
        return favoriteBlogPost.likes > blog.likes ? favoriteBlogPost : blog
    }, 0)

    const result = {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
      }

    return result
}

module.exports = {
    dummy, 
    totalLikes,
    favoriteBlog
}