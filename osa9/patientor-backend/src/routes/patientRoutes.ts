import patientData from '../data/patients.ts';

import { Patient } from '../types/types.ts';

const patients: Patient[] = patientData;

const getPatients = () => {
    return patients;
};

export default {
    getPatients
};