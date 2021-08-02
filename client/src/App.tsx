import './App.css';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';

function App() {
  const [selected, setSelected] = useState<any | null>(null);
  const [preview, setPreview] = useState<any | null>(null);
  const [format, setFormat] = useState<any | null>(null);
  const file = useRef<any | null>(null);


  useEffect(() => {
    if (!selected) {
      setPreview(undefined)
      return
    }
    const objectUrl: String = URL.createObjectURL(selected)
    if (selected.type === 'video/mp4') {
      setFormat(false)
    }
    setPreview(objectUrl)
  }, [selected])

  // preview
  const changeHandler = (e: any) => {
    setSelected(e.target.files[0])
    file.current.style.display = 'none';

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
      <h1>File Uploder</h1>
      <style dangerouslySetInnerHTML={{
        __html: [
          '._layer::before{',
          `background: url(${preview}) no-repeat center top`,
          '}'
        ].join('\n')
      }}></style>
      <div className="_layer"></div>
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input type="file" id="file" name="file" ref={file} required onChange={changeHandler} />
          {
            selected ? (
              <div className="preView">
                <table>
                  <tr>

                    {format ? <a href={preview}> <img src={preview} /></a>
                      : <video controls src={preview}></video>
                    }
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{selected.name}</td>
                  </tr>
                  <tr>
                    <td>Type</td>
                    <td>{selected.type}</td>
                  </tr>

                  <tr>
                    <td>Size</td>
                    <td>{(selected.size / 1000000).toPrecision(5)} MB</td>
                  </tr>
                </table>
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
