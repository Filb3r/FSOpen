import patientData from '../data/patients.ts';
import { v1 as uuid } from 'uuid';

import { PatientEntry, nonSensitivePatientData, NewPatientEntry } from '../types/types.ts';

const patients: PatientEntry[] = patientData;

const getPatients = () => {
    return patients;
};

const getNonSensitivePatients = (): nonSensitivePatientData [] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, 
        name, 
        dateOfBirth, 
        gender, 
        occupation
    }));
};

const addPatient = ( entry: NewPatientEntry) : PatientEntry => {
    const id = uuid();

    const newPatient = {
        id: id,
        ...entry
    };

    patients.push(newPatient);
    return newPatient;
};

 export default {
    getPatients,
    getNonSensitivePatients,
    addPatient
};