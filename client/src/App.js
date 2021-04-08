import "./styles/components/App.scss";

function App() {
  const onsubmit = (e) => {
    e.preventDefault();
    console.log("form submited");
    const text = e.target.elements.text.value;
    console.log(text);
  };

  return (
    <div className="App">
      <h1>APP BOILERPLATE</h1>
      <form onSubmit={onsubmit}>
        <input type="text" name="text" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
