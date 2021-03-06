import axios from 'axios';



//creates object from each array element
const extractArticle = article => ({
   title: article.title,
   date: article.published_date.substring(5, 10),
   url: article.url,
   section: article.section,
   abstract: article.abstract,
   picture: article.multimedia,
   author: article.byline
});

const extractList = list => ({
    name: list.list_name,
    published: list.newest_published_date,
    updated: list.updated
 });

 const extractList_Book = book => ({
    name: book.title,
    author: book.author,
    url: book.amazon_product_url,
    image: book.book_image
 });

export const LiveFeed = async () =>{
    const promise = await axios.get('https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=3EZ6bGrM9ZfGjkDiWMi0pxwlzpp9dBhv')
    const results = promise.data.results;
    return results.map(extractArticle);
}

export const Fetch_Books_Lists = async () =>{
    const promise = await axios.get('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=3EZ6bGrM9ZfGjkDiWMi0pxwlzpp9dBhv')
    const results = promise.data.results;
    return results.map(extractList);
}

export const Fetch_Books = async (name, date) =>{
    const promise = await axios.get('https://api.nytimes.com/svc/books/v3/lists/'+date+'/'+name+'.json?api-key=3EZ6bGrM9ZfGjkDiWMi0pxwlzpp9dBhv ')
    const results = promise.data.results.books
    return results.map(extractList_Book);
}

export const TopArticles = async(name) =>{
    const promise = await axios.get('https://api.nytimes.com/svc/topstories/v2/'+name+'.json?api-key=3EZ6bGrM9ZfGjkDiWMi0pxwlzpp9dBhv')
    const results = promise.data.results;
    return results.map(extractArticle);
}