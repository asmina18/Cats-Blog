
export const getPostPage=`
query MyQuery {
    blogPosts {
      title
      date
      image {
        url
        fileName
      }
      blogText {
        html
      }
    }
  }
  `