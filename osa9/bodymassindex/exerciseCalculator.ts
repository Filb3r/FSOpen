interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number,
    average: number;
}

interface ExerciseValues {
    targetHourValue: number;
    trainingHoursValue: number[];
}

const parseTrainingArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    let trainingHourArray: number[] = [];

    for (let i : number = 3; i < args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            trainingHourArray.push(Number(args[i]))
        }
    }

    return { targetHourValue: Number(args[2]), trainingHoursValue: trainingHourArray};
}


const calculateExercises = (targetHours : number, trainingHours : number[]) => {
    const tulokset: Result = {
        periodLength: trainingHours.length,
        trainingDays: trainingHours.filter((trainingDay) => trainingDay > 0).length,
        success: false,
        rating: 0,
        ratingDescription: "",
        target: targetHours,
        average: trainingHours.reduce((sum, currentValue) => sum + currentValue, 0) / trainingHours.length,
   };

   if(tulokset.average > tulokset.target) {
    tulokset.success = true;
    tulokset.rating = 3;
    tulokset.ratingDescription = "Great!";
   } else if (tulokset.average === tulokset.target) {
    tulokset.success = false;
    tulokset.rating = 2;
    tulokset.ratingDescription = "OK!";
   } else {
    tulokset.success = false;
    tulokset.rating = 1;
    tulokset.ratingDescription = "Bad!";
   }

   console.log(tulokset)
};

try {
    const { targetHourValue, trainingHoursValue} = parseTrainingArguments(process.argv);
    calculateExercises(targetHourValue, trainingHoursValue);
} catch (error : unknown) {
    let errorMessage = 'Something bad happend!'
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
    }
}