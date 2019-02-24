import express from 'express';
import exphbs from 'express-handlebars';
import routes from './src/routes';

const port = process.env.PORT || 3000;
const app = express();

app.engine('html', exphbs({
    defaultLayout: 'default',
    extname: '.html',
    helpers: require('./src/helpers')
}));
app.set('view engine', 'html');

app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use('/', routes);


app.listen(port, () => {
    console.log(`Server is up on ${port}`)
});