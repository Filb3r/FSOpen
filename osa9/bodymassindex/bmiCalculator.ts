const calculateBmi = (height : number, weight : number) => {
    const heightInMeters = height / 100; 
    const bmi : number = weight / (heightInMeters * heightInMeters)

    if (bmi < 18.5) {
        console.log("Underweight!");
    } else if(bmi < 25) {
        console.log("Normal weight!");
    } else {
        console.log("Obese!")
    }

}

calculateBmi(180, 74)