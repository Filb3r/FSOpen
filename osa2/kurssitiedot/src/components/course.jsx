const Header = ({course}) => {
    return (
        <h2>{course.name}</h2>
    )
}

const Content = ({course}) => {
    return (
        <div>
        <p>{course.name} {course.exercises}</p>
        </div>
    )
}

const TotalExercises = ({course}) => {
    const totalAmount = course.parts.reduce((sum, part) => sum + part.exercises, 0)

    return(
        <b>total of {totalAmount} exercises</b>
    )
}


const Course = ({course}) => {
    return(
        <div>
            <Header course={course}/>
           {course.parts.map(course => 
            <Content key={course.id} course={course}/>
           )}
           <TotalExercises course={course}/>
        </div>
    )
}

export default Course