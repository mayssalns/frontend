import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import AuthorList from "./Author/Author-list";
import Author from "./Author/Author";
import AuthorNew from "./Author/Author-new";
import AuthorRemove from "./Author/Author-remove";
import Booklist from "./Book/Book-list";
import BookNew from "./Book/Book-new";
import Book from "./Book/Book";
import BookRemove from "./Book/Book-remove";


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/author" exact={true} component={AuthorList} />
            <Route path="/author/:id" exact={true} component={Author} />
            <Route path="/author/?name=:name" exact={true} component={Author} />
            <Route path="/new/Author" exact={true} component={AuthorNew} />
            <Route path="/del/Author/:id" exact={true} component={AuthorRemove} />
            <Route path="/Book" exact={true} component={Booklist} />
            <Route path="/new/Book" exact={true} component={BookNew} />
            <Route path="/book/:id" exact={true} component={Book} />
            <Route path="/book/?name=:name" exact={true} component={Book} />
            <Route path="/del/Book/:id" exact={true} component={BookRemove} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
