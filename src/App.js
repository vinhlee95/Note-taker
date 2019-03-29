import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react'
import NoteCreate from './components/note-create';

class App extends Component {
  render() {
    return (
      <div className="App">
				<h1>Create your notes</h1>
				<NoteCreate />
			</div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
