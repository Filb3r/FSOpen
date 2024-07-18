import { useState } from 'react'

const getMostVoted = (pointsArr) => {
  let mostVoted = 0

  for(let i = 0; i < pointsArr.length; i++){
    if(pointsArr[mostVoted] < pointsArr[i]){
      mostVoted = i
    }
  }
  return mostVoted
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [pointsArr, setPointsArr] = useState(new Array(8).fill(0))

  const updatePoint = (index) => {
    const newPointsArr = [...pointsArr]
    newPointsArr[index] += 1
    setPointsArr(newPointsArr)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {pointsArr[selected]} votes</p>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button> 
      <button onClick={() => updatePoint(selected)}>vote</button>
      
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[getMostVoted(pointsArr)]}</p>
    </div>
  )
}

export default App