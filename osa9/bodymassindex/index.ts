import express from 'express';
const app = express();
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req,res) => {
    res.send('Hello full stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;

    if(isNaN(Number(height)) || isNaN(Number(weight))){
        res.send('error: "malformatted parameters"');
    }

    const result : string = calculateBmi(Number(height), Number(weight));

    res.send(result);
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;

    if(!daily_exercises || !target) {
        res.send({ error: 'parameters missing!' });
    } else if (isNaN(Number(target))){
        res.send({ error: 'malformatted parameters'});
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const results = calculateExercises(target, daily_exercises);

    res.send({results});
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});