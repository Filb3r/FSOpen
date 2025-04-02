import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/diagnoses', (_req, res) => {
    res.send(diagnosisService.getDiagnoses());
});


export default router;