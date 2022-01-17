import * as yup from 'yup';

export const createArticleSchema = yup.object().shape({
  title: yup.string().required('Это обьязательно поле!').min(3).max(256),
  text: yup.string().required('Это обьязательно поле!').min(3).max(65536),
  photoUrl: yup.string().required('Сылка на фотографию должна быть!').min(3).max(100),
});
