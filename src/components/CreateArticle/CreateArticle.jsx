import React from 'react';
import { useForm } from 'react-hook-form';
import { createArticleSchema } from './Schema';

import styles from './index.module.scss';

import Box from '@mui/material/Box';
import UploadIcon from '@mui/icons-material/Upload';
import { yupResolver } from '@hookform/resolvers/yup';

import MDEditor from '@uiw/react-md-editor';

const CreateArticle = () => {
  const methods = useForm({
    defaultValues: {
      title: '',
      text: '',
      photoUrl: '',
    },
    resolver: yupResolver(createArticleSchema),
  });

  const [edit, setEdit] = React.useState('**hello**');

  const [isUrl, setIsUrl] = React.useState(true);
  const [formData, setFormData] = React.useState({});
  const [fileName, setFileName] = React.useState('');

  const onSubmit = () => {
    console.log('test');
  };

  const onUploadPhoto = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('file', file);
    setFileName(file.name);

    // that's mean what user upload himself photo, not a url
    setIsUrl(false);
    setFormData(formData);
  };

  const onChangeInputUrl = (value) => {
    if (!isUrl) {
      setIsUrl(true);
    }
    if (Object.entries(formData).length !== 0) {
      setFormData({});
    }

    setFileName(value);
  };

  return (
    <div className={styles.wrapper}>
      <Box sx={{ minWidth: '100%' }}>
        <p>{methods.formState.errors.title?.message}</p>
        <input
          {...methods.register('title')}
          className={styles.title}
          placeholder="Введите заголовок..."
        />

        <p className={styles.href__on_img}>Сылка на изображение (не обьязательно)</p>
        <div className={styles.upload__photo}>
          <p>{methods.formState.errors.photoUrl?.message}</p>
          <input
            {...methods.register('photoUrl')}
            className={styles.href__on_img}
            value={fileName}
            onChange={(e) => onChangeInputUrl(e.target.value)}
          />

          <div className={styles.wrapper}>
            <input
              className={styles.input__file}
              onChange={(e) => onUploadPhoto(e)}
              name="file"
              type="file"
              id="input__file"
              multiple
            />
            <label className={styles.upload__img_btn} htmlFor="input__file">
              <span>
                <UploadIcon />
                загрузить
              </span>
            </label>
          </div>
        </div>
        <MDEditor value={edit} onChange={(value) => setEdit(value)} />
        <button onClick={methods.handleSubmit(onSubmit)} className={styles.publish}>
          Опубликовать
        </button>
      </Box>
    </div>
  );
};

export default CreateArticle;
