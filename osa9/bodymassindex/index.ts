import express from 'express';
const app = express();
import calculateBmi from './bmiCalculator';

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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})