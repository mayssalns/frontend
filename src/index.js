import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AuthorList from './author/author-list';
import BookList from './book/book-list';
import AuthorAdd from './author/author-add';
import AuthorDelete from './author/author-delete';
import BookAdd from './book/book-add';
import BookDelete from './book/book-delete';
import BookDetails from './book/book-details';
import AuthorDetails from './author/author-details';
import AuthorUpdate from './author/author-update';
import BookUpdate from './book/book-update';



ReactDOM.render(
    <BrowserRouter>
        <Switch>


            <Route path="/" exact={true} component={App} />

            <Route path="/book" exact={true} component={BookList} />
            <Route path="/add/book" exact={true} component={BookAdd} />
            <Route path="/book/:id" exact={true} component={BookDetails} />
            <Route path="/delete/book/:id" exact={true} component={BookDelete} />
            <Route path="/book/search/:name" exact={false} component={BookDetails} />
            <Route path="/update/book/:id/" exact={true} component={BookUpdate} />

          
            <Route path="/author/search/:name" exact={false} component={AuthorDetails} />
            <Route path="/author" exact={true} component={AuthorList} />
            <Route path="/author/:id" exact={true} component={AuthorDetails} />
            <Route path="/add/author" exact={true} component={AuthorAdd} />
            <Route path="/delele/author/:id" exact={true} component={AuthorDelete} />
            <Route path="/update/author/:id/" exact={true} component={AuthorUpdate} />

        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
); 
serviceWorker.unregister();
