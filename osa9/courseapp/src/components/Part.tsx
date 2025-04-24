import { CoursePartProps } from '../types';

const Part = (props: CoursePartProps) => {
    const { part } = props;
    switch (part.kind) {
        case "basic":
            return (
            <div>
                <b>{part.name} {part.exerciseCount}</b>
                <p>{part.description}</p>
            </div>);
        case "group":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <p>project exercises {part.groupProjectCount}</p>
                </div>
            );
        case "background":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <p>{part.description}</p>
                    <p>submit to {part.backgroundMaterial}</p>
                </div>  
            );
        case "special":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <p>{part.description}</p>
                    <p>required skills: {part.requirements.join(", ")}</p>
                </div>
            )
        default:
            return null;
    }
}

//THIS NEEDS MORE CASES!!!!!!!!!!!!!!!!!!!!!!!!!!

export default Part;