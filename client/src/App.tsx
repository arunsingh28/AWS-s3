import './App.css';
import { useState } from 'react'
function App() {

  const [selected, setSelected] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert('Submit was clicked');
    console.log(e)
  }

  const changeHandler = (e: any) => {
    setSelected(e.target.files[0])
    setIsFilePicked(true)
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input type="file" name="image" required onChange={changeHandler} />
          {
            selected ? <button type="submit">Upload</button> : false
          }
        </form>
      </header>
    </div>
  );
}

export default App;
