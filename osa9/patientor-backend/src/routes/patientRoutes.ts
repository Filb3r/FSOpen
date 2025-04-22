import express, { NextFunction, Request, Response } from 'express';
import patientService from '../services/patientService';
import { newEntrySchema } from '../utils';
import { NewPatientEntry, PatientEntry } from '../types/types';
import { z } from 'zod';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      next(error);
    }
  };

router.get('/patients', (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.post('/patients', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>)  => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;