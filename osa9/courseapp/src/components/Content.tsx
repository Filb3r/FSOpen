interface CourseProps {
    name: string;
    exerciseCount: number;
}

interface CourseList {
    courses: CourseProps[]
}

const Content = (props: CourseList) => {
    return (
        <>
        {props.courses.map((course) => (
            <p key={course.name}> {course.name}  {course.exerciseCount}</p>
        ))}
        </>
    );
};

export default Content;