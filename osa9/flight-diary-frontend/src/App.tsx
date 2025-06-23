import { useEffect, useState } from "react"
import axios from 'axios';
import { type Diary } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries').then(response => {
      console.log(response.data)
      setDiaries(response.data)
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(date, visibility, weather);

    const newDiary: Omit<Diary, 'id'> = {
      date,
      visibility,
      weather,
      comment
    }

    axios.post<Diary>('http://localhost:3000/api/diaries/addDiary', newDiary )
      .then(response => {
        setDiaries(diaries.concat(response.data))
      })
  }

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
          <label>
            Date: 
            <input type="text" name="name" onChange={(e) => setDate(e.target.value)}/>
          </label><br/>
          <label>
            Visibility: 
            <input type="text" name="name" onChange={(e) => setVisibility(e.target.value)}/>
          </label><br/>
          <label>
            Weather: 
            <input type="text" name="name" onChange={(e) => setWeather(e.target.value)}/>
          </label><br/>
          <label>
            Comment: 
            <input type="text" name="name" onChange={(e) => setComment(e.target.value)}/>
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
