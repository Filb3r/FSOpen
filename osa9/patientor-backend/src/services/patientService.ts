import patientData from '../data/patients.ts';

import { Patient, nonSensitivePatientData } from '../types/types.ts';

const patients: Patient[] = patientData;

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

 export default {
    getPatients,
    getNonSensitivePatients
};