import './App.css';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';

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

  // preview
  const changeHandler = (e: any) => {
    setSelected(e.target.files[0])

  }





  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // handle form submit

    if (process.env.NODE_ENV === 'production') {

    } else {
      // dev mode
      console.log('dev mode')
      const formData = new FormData()
      formData.append('file', selected)
      const result = await axios.post('http://localhost:3002/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log(result)
    }

    setPreview('')
    setSelected('')
  }



  return (
    <div className="App">
      <style dangerouslySetInnerHTML={{
        __html: [
          '.App:before{',
          'content: "";',
          'position:absolute',
          'width:100%',
          'height:100%',
          '}'
        ].join('\n')
      }}></style>
      <div className="_layer"></div>
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input type="file" name="file" required onChange={changeHandler} />
          {
            selected ? (
              <div className="preView">
                <a href={preview}> <img src={preview} /></a>
                {selected.name}
                {selected.type}
              </div>
            ) : false
          }
          <button type="submit">Upload</button>
          <button onClick={() => window.location.reload()}>Reset</button>
        </form>
      </header>
    </div>
  );
}

export default App;
