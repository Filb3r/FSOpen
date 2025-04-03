import express from 'express';
import cors from 'cors';
import diagnosisRoutes from './routes/diagnosisRoutes';
import patientRoutes from './routes/patientRoutes';
const app = express();
app.use(express.json());

app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/', diagnosisRoutes);
app.use('/api/', patientRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});