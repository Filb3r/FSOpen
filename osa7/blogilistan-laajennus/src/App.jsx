import { useState } from 'react';
import Notification from './components/Notification';
import Anecdotes from './components/Anecdotes';
import CreateNewAnecdote from './components/CreateNewAnecdote';

const Menu = () => {
  const padding = {
    paddingRight: 5
  };
  return (
    <div>
      <a href="#" style={padding}>
        anecdotes
      </a>
      <a href="#" style={padding}>
        create new
      </a>
      <a href="#" style={padding}>
        about
      </a>
    </div>
  );
};


const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an incident. Occasionally
      humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke
      laughter but to reveal a truth more general than the brief tale itself, such as to
      characterize a person by delineating a specific quirk or trait, to communicate an abstract
      idea about a person, place, or thing through the concrete details of a short narrative. An
      anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can find the best and add
      more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>. See{' '}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
);


const App = () => {
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification/>
      <Menu />
      <Anecdotes/>
      <CreateNewAnecdote/>
      <About />
      <Footer />
    </div>
  );
};

export default App;
