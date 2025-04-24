import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courses }: { courses: CoursePart[] }) => {

    return (
        courses.map((course) => {
            return (
                <div>
                    <Part part={course}/>
                </div>
            )
        })
    );
};

export default Content;