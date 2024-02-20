import {Header, Total, Content} from './Subcomponents'

const Course = ({ course }) => (

    <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

export default Course