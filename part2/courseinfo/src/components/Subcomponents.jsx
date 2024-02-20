const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
    const total = 
    parts.reduce( (s, p) => s + p.exercises, 0 )

    return(
        <p><b>total of {total} exercises</b></p>
    )
}

const Part = ({ part }) =>
    <p>
    {part.name} {part.exercises}
    </p>
 

const Content = ({ parts }) => (
    <div>
    <ul>
       
        {parts.map(part => 
            <Part key={part.id} part={part} />
        )}
    </ul>  
    </div>  
)

export {Header, Total, Part, Content}