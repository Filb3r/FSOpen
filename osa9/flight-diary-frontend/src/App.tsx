import { useEffect, useState } from "react"
import axios from 'axios';
import { type Diary } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries').then(response => {
      console.log(response.data)
      setDiaries(response.data)
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
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
      .catch(error => {
        setErrorMessage(error.response.data);
        setTimeout(() => {
          setErrorMessage('');
        }, 4000);
      })
  }

  return (
    <>
      <h2>Add new entry</h2>
      <h2 style={{ color: 'red'}}>{errorMessage}</h2>
      <form onSubmit={diaryCreation}>
          <label>
            Date: 
            <input
            type="date"
            id="pvm"
            name="pvm"
            value={date}
            min="2025-06-01"
            onChange={(e) => setDate(e.target.value)}
            />
          </label><br/>
          <label>
            Visibility:
            great <input type="radio" name="visibility"
            onChange={() => setVisibility('great')} />
            good <input type="radio" name="visibility"
            onChange={() => setVisibility('good')} />
            ok <input type="radio" name="visibility"
            onChange={() => setVisibility('ok')} />
            poor <input type="radio" name="visibility"
            onChange={() => setVisibility('poor')} />
          </label><br/>
          <label>
            Weather: 
            sunny <input type="radio" name="weather"
            onChange={() => setWeather('sunny')} />
            rainy <input type="radio" name="weather"
            onChange={() => setWeather('rainy')} />
            cloudy <input type="radio" name="weather"
            onChange={() => setWeather('cloudy')} />
            stormy <input type="radio" name="weather"
            onChange={() => setWeather('stormy')} />
            windy <input type="radio" name="weather"
            onChange={() => setWeather('windy')} />
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
