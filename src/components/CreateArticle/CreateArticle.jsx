import React from 'react';
import { useForm, Controller, useController } from 'react-hook-form';
import { createArticleSchema } from './Schema';

import { instance } from '../../config/axios';

import styles from './index.module.scss';

import Box from '@mui/material/Box';
import UploadIcon from '@mui/icons-material/Upload';
import { yupResolver } from '@hookform/resolvers/yup';

import MDEditor from '@uiw/react-md-editor';
import { useHistory } from 'react-router-dom';

const CreateArticle = () => {
  const methods = useForm({
    defaultValues: {
      title: '',
      text: '',
      photoUrl: '',
    },
    resolver: yupResolver(createArticleSchema),
  });

  const { field: photo } = useController({
    control: methods.control,
    name: 'photoUrl',
  });

  const history = useHistory();

  const [edit, setEdit] = React.useState('');

  const [formData, setFormData] = React.useState({});
  const [fileName, setFileName] = React.useState('');

  const onUploadPhoto = (e) => {
    const file = e.target.files[0];
    const formFile = new FormData();

    formFile.append('file', file);
    setFileName(file.name);

    setFormData(formFile);
    const event = { target: { value: file.name, name: 'photoUrl' } };
    photo.onChange(event);
    console.log(event);
  };

  const onChangeInputUrl = (e) => {
    if (Object.entries(formData).length !== 0) {
      setFormData({});
    }

    setFileName(e.target.value);
  };

  const onSubmit = async (data) => {
    let photoUrl = data.photoUrl;
    try {
      const { data } = await instance.post('posts/upload', formData, {
        headers: { Authorization: window.localStorage.getItem('token') },
      });
      photoUrl = data.url;
    } catch (e) {
      console.log('Не удалось загрузить фотографию.');
    }

    try {
      await instance.post(
        'posts',
        {
          title: data.title,
          text: data.text,
          photoUrl: photoUrl,
        },
        { headers: { Authorization: window.localStorage.getItem('token') } },
      );
    } catch (e) {
      console.log(e);
    } finally {
      history.push('/');
    }
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
        <p>{methods.formState.errors.photoUrl?.message}</p>
        <div className={styles.upload__photo}>
          <Controller
            name="photoUrl"
            control={methods.control}
            render={({ field: { onChange } }) => (
              <input
                {...photo}
                className={styles.href__on_img}
                value={fileName}
                onChange={(e) => {
                  onChangeInputUrl(e);
                  onChange && onChange(e);
                }}
              />
            )}
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
        <Controller
          name="text"
          control={methods.control}
          render={({ field: { onChange } }) => (
            <MDEditor
              {...methods.register('text')}
              className={styles.href__on_img}
              value={edit}
              onChange={(e) => {
                setEdit(e);
                onChange && onChange(e);
              }}
            />
          )}
        />
        <p>{methods.formState.errors.text?.message}</p>
        <button onClick={methods.handleSubmit(onSubmit)} className={styles.publish}>
          Опубликовать
        </button>
      </Box>
    </div>
  );
};

export default CreateArticle;
