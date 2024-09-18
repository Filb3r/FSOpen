const _ = require('lodash');

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

const mostBlogs = (blogs) => {
    const countByAuthor = _.countBy(blogs, 'author')
    const maxBlogs = _.maxBy(Object.keys(countByAuthor), (author) => countByAuthor[author])
    
    return({
        'author' : maxBlogs,
        'blogs': countByAuthor[maxBlogs]
    })
}

const mostLikes = (blogs) => {
    const authorsAndLikes = []
    
    _.forEach(blogs, function(eachBlog) {
        const firstAuthor = authorsAndLikes.find((entry) => entry.author === eachBlog.author)

        if(firstAuthor) {
            firstAuthor.likes += eachBlog.likes
        } else {
            authorsAndLikes.push({
                author: eachBlog.author,
                likes: eachBlog.likes
            })
        }
    })

    return _.maxBy(authorsAndLikes, 'likes')
}

module.exports = {
    dummy, 
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}