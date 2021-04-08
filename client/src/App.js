import "./styles/components/App.scss";
import axios from "axios";

function App() {
  const onsubmit = (e) => {
    e.preventDefault();
    console.log("form submited");
    const text = e.target.elements.text.value;
    const data = {
      test: text,
    };

    axios.post("/send/test", data).then((res) => {
      console.log(res);
    });
    //   fetch("/read/test/")
    //     .then((data) => {
    //       console.log(data.json());
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
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
