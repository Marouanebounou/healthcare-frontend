import * as yup from 'yup';

export const patientSchema = yup.object().shape({
  nom: yup.string().required('Le nom est obligatoire'),
  prenom: yup.string().required('Le prénom est obligatoire'),
  email: yup.string().email('Email invalide').required('L\'email est obligatoire'),
  telephone: yup.string().required('Le téléphone est obligatoire'),
  dateNaissance: yup.date().required('La date de naissance est obligatoire'),
});

export const medecinSchema = yup.object().shape({
  nom: yup.string().required('Le nom est obligatoire'),
  specialite: yup.string().required('La spécialité est obligatoire'),
  email: yup.string().email('Email invalide').required('L\'email est obligatoire'),
  telephone: yup.string().required('Le téléphone est obligatoire'),
});
