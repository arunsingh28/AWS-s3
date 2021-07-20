import './App.css';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';


function App() {

  // interface Preview {
  //   src: string;
  //   undefindex: any;
  // }

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
    file.current.style.display = 'none'
  }





  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // handle form submit

    if (process.env.NODE_ENV === 'production') {

    } else {
      // dev mode
      console.log('dev mode')
      const formData = new FormData()
      formData.append('image', selected)
      const result = await axios.post('http://localhost:3002/image', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log(result)
    }
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
                <button onClick={() => window.location.reload()}>Reset</button>
              </>
            ) : false
          }
        </form>
      </header>
    </div>
  );
}

export default App;
