import './App.css';
import { useState, useEffect, useRef } from 'react'
function App() {


  const [selected, setSelected] = useState<any | null>(null);
  const [preview, setPreview] = useState<any | null>(null);
  const file = useRef<any | null>(null);


  useEffect(() => {
    if (!selected) {
      setPreview(undefined)
      return
    }
    const objectUrl: String = URL.createObjectURL(selected)
    setPreview(objectUrl)
  }, [selected])


  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert('Submit was clicked');
    console.log(e)
  }

  const changeHandler = (e: any) => {
    setSelected(e.target.files[0])
    file.current.style.display = 'none'
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input type="file" name="image" required onChange={changeHandler} ref={file} />
          {
            selected ? (
              <div className="preView">
                <img src={preview} />
                {selected.name}<hr />
                {selected.type}
              </div>
            ) : false
          }
          {
            selected ? (
              <>
                <button type="submit">Upload</button>
                <button type="reset">Reset</button>
              </>
            ) : false
          }
        </form>
      </header>
    </div>
  );
}

export default App;
