import ContactCard from "./components/ContactCard";
import NamedChildren from "./components/NamedChildren";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ContactCard>
        <h3>Simple Contact Card</h3>
      </ContactCard>
      <ContactCard>My Card</ContactCard>
      <NamedChildren
        header={<h2>Complex Contact Card</h2>}
        media={<h3>Media here</h3>}
        content={<p>Content here</p>}
      />
      <NamedChildren
        header={<h3> Notmedia card</h3>}
        content={<p>Content here</p>}
      />
    </div>
  );
}

export default App;
