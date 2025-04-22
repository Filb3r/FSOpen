import { z } from 'zod';
import { newEntrySchema } from '../utils';

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;   
}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type nonSensitivePatientData = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = z.infer<typeof newEntrySchema>;

export enum Gender {
    Male = 'male',
    Female = 'female'
};