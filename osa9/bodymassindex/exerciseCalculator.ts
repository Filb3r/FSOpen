interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number,
    average: number;
}


const calculateExercises = (trainingHours : number[], targetHours : number) => {
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


//calculateExercises(process.argv[3], process.argv[4])