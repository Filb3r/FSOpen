import { useEffect, useState } from "react"
import axios from 'axios';
import { type Diary } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  /* Single state object for all form fields
  const [formData, setFormData] = useState<Omit<Diary, 'id'>>({
    date: '',
    visibility: '',
    weather: '',
    comment: ''
  });*/
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')


  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries').then(response => {
      console.log(response.data)
      setDiaries(response.data)
    })
  }, [])

  return (
    <>
      <h2>Add new entry</h2>
      <form>
          <label>
            Date: 
            <input type="text" name="name" />
          </label><br/>
          <label>
            Visibility: 
            <input type="text" name="name" />
          </label><br/>
          <label>
            Weather: 
            <input type="text" name="name" />
          </label><br/>
          <label>
            Comment: 
            <input type="text" name="name" />
          </label><br />

          <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      <ul>
        {diaries.map(diary => 
          <li key={diary.id}><b>{diary.date}</b><br/>
           Weather: {diary.weather}<br/>
           Visibility: {diary.visibility}
           </li>
        )}
      </ul>
    </>
  )
}

export default App
