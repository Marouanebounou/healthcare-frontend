import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Email invalide').required('L\'email est obligatoire'),
  password: yup.string().required('Le mot de passe est obligatoire'),
});

export const registerSchema = yup.object().shape({
  username: yup.string().required('Le username est obligatoire'),
  email: yup.string().email('Email invalide').required('L\'email est obligatoire'),
  password: yup.string().min(6, 'Minimum 6 caractères').required('Le mot de passe est obligatoire')
});

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

export const rendezvousSchema = yup.object().shape({
    dateRendezvous: yup.date().required('La date du rendez-vous est obligatoire'),
    status: yup.string().required('Le statut est obligatoire'),
    patientId: yup.string().required('L\'ID du patient est obligatoire'),
    medecinId: yup.string().required('L\'ID du médecin est obligatoire'),
    dossierMedical: yup.string().required('Le dossier médical est obligatoire'),
});

export const dossierMedicalSchema = yup.object().shape({
    diagnostic: yup.string().required('Le diagnostic est obligatoire'),
    observation : yup.string().required('L\'observation est obligatoire'),
    dateCreation: yup.date().required('La date de création est obligatoire'),
    patientId: yup.string().required('L\'ID du patient est obligatoire'),
    medecinId: yup.string().required('L\'ID du médecin est obligatoire'),
});

