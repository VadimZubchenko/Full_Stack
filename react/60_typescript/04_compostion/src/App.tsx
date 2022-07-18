import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContactCard from './components/ContactCard';
import NamedChildren from './components/NamedChildren';


function App() {
  return (
    <div className="App">
      <ContactCard>
        Simple Contact Card
      </ContactCard>
      <ContactCard>
        <h2>Big header</h2>
        <h4>Header</h4>
        <h6>Small header</h6>
      </ContactCard>
      <NamedChildren
      header={<h2>Named card</h2>}
      media={<p>Media area</p>}
      content={<p>Content area</p>} 
      />
      <NamedChildren
      header = {<h2>No Media</h2>}
      content = {<h1>Content area</h1>}
      />
    </div>
  );
}

export default App;
