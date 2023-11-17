import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const posts = [];
let id = 0;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs', { postList: posts });
})

app.get('/create-post', (req, res) => {
    res.render('form.ejs');
});

app.post('/publish', (req, res) => {
    let post;
    const postId = req.body['postId'];
    if (postId) {
        post = posts[postId];
        post.subject = req.body['subject'];
        post.post = req.body['post'];
        post.url = req.body['url'];
    } else {
        post = {
            id: id++,
            subject: req.body['subject'],
            post: req.body['post'],
            url: req.body['url']
        };
        posts.push(post);
    }
    res.render('index.ejs', { postList: posts });
});

app.get('/edit/:id', (req, res) => {
    res.render('form.ejs', { post: posts[req.params.id] });
})

app.get('/delete/:id', (req, res) => {
    posts.splice(req.params.id,1);
    id = 0;
    posts.forEach((post) => {
        post.id = id++;
    });
    res.render('index.ejs', { postList: posts });
});

app.listen(port, () => {
    console.log(`The server is up and running on port ${port}`)
})