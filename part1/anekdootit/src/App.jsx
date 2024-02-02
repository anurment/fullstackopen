import { useState } from 'react'

//From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const indexOfMaxElement = (array) => { 
  let maxIdx = 0; 
  for (let i = 1; i < array.length; i++) { 
      if (array[i] > array[maxIdx]) { 
        maxIdx = i; 
      } 
  } 
  return maxIdx; 
} 

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const BestAnecdote = ({anecdotes, votes}) => {
  const maxIdx = indexOfMaxElement(votes)
  const n = votes[maxIdx]
  const anecdote = anecdotes[maxIdx]
  return(
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdote}</p>
      <p>has {n} votes</p>
    </div>

  )
}

const Anecdote = ({anecdote, n}) => (
  <div>
    <h1>Anecdote of the day</h1>
    <p>{anecdote}</p>
    <p>has {n} votes</p>
  </div>
)
  
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

  const points = Array(anecdotes.length).fill(0)

  const [votes, setVotes] = useState(points) 
  const [selected, setSelected] = useState(0)

  const handleClick = () => {
    setSelected(getRandomIntInclusive(0, anecdotes.length-1))
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  //console.log(votes)
  
  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} n={votes[selected]} />
      <Button handleClick={handleClick} text="next anecdote" />
      <Button handleClick={handleVote} text="Vote" />
      <BestAnecdote anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App