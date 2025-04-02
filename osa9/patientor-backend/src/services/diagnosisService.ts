import diagnosesData from '../data/diagnoses.ts';

import { Diagnosis } from '../types/DiagnosisType.ts';

const diagnoses: Diagnosis[] = diagnosesData;

const getDiagnoses = () => {
    return diagnoses;
};

export default {
    getDiagnoses
};