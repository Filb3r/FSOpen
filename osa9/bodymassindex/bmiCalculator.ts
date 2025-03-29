interface BmiValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: string[]) : BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error ('Values are not numbers!');
    }
}

const calculateBmi = (height : number, weight : number) => {
    const heightInMeters = height / 100; 
    const bmi : number = weight / (heightInMeters * heightInMeters);

    if (bmi < 18.5) {
        console.log("Underweight!");
    } else if(bmi < 25) {
        console.log("Normal weight!");
    } else {
        console.log("Obese!")
    }
}

try {
    const { value1, value2 } = parseArguments(process.argv);
    calculateBmi(value1, value2)
} catch ( error : unknown ) {
    let errorMessage = 'Something bad happened.'
    if ( error instanceof Error ) {
        errorMessage += ' Error ' + error.message;
    }
    console.log(errorMessage)
}
