import { useState } from 'react'

//const Display = props => <div>{props.text} {props.value}</div>

const StatisticLine = props => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const Statistics = ({good, neutral, bad}) => {

  if (good == 0 && neutral == 0 && bad == 0 ) {
    return(
      <div>
        <div>
          <h1>statistics</h1>
        </div>
        <div>
          <p>No feedback given</p>
        </div> 
      </div>)
  } else {
    const all = good+neutral+bad
    const average = (good*1+neutral*0+bad*(-1))/all
    const positive =`${(good/all*100)} %`

    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={all}/>
          <StatisticLine text="average" value={average}/>
          <StatisticLine text="positive" value={positive}/>
          </tbody>
        </table>
      </div>
    )
  }

}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodReview = () => {
    setGood(good + 1)
  }

  const handleNeutralReview = () => {
    setNeutral(neutral + 1)
  }

  const handleBadReview = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={handleGoodReview} text="good" />
        <Button handleClick={handleNeutralReview} text="neutral" />
        <Button handleClick={handleBadReview} text="bad" />
      </div>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App