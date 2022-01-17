import React from 'react';
import { useForm, Controller, useController } from 'react-hook-form';
import { createArticleSchema } from './Schema';
import { createPost, editPost } from '../../redux/actions/posts';

import { instance } from '../../config/axios';

import styles from './index.module.scss';

import Box from '@mui/material/Box';
import UploadIcon from '@mui/icons-material/Upload';
import { yupResolver } from '@hookform/resolvers/yup';

import MDEditor from '@uiw/react-md-editor';
import { useHistory, useParams } from 'react-router-dom';

const CreateArticle = ({ isEdit = false }) => {
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

  const { field: titleField } = useController({
    control: methods.control,
    name: 'title',
  });

  const { field: editField } = useController({
    control: methods.control,
    name: 'text',
  });

  const history = useHistory();
  const params = useParams();

  const [photoUrl, setPhotoUrl] = React.useState('');
  const [formData, setFormData] = React.useState({});
  const [title, setTitle] = React.useState('');
  const [edit, setEdit] = React.useState('');

  const onUploadPhoto = (e) => {
    const file = e.target.files[0];
    const formFile = new FormData();

    formFile.append('file', file);
    setPhotoUrl(file.name);
    setFormData(formFile);

    // change input in react hook form
    photo.onChange(e);
  };

  const onChangeInputUrl = (e) => {
    if (Object.entries(formData).length !== 0) {
      setFormData({});
    }
    setPhotoUrl(e.target.value);
  };

  const onSubmit = async (data) => {
    if (Object.entries(formData).length !== 0) {
      try {
        const { data } = await instance.post('posts/upload', formData, {
          headers: { Authorization: window.localStorage.getItem('token') },
        });
        setPhotoUrl(data.url);
      } catch (e) {
        alert('Не удалось загрузить фотографию. Ошибка: ', e);
      }
    }

    // if regime edit isn't turn off
    try {
      if (!isEdit) {
        await createPost(title, edit, photoUrl);
      } else {
        await editPost(params.id, title, edit, photoUrl);
      }
      history.push('/');
    } catch (e) {
      alert(e);
    }
  };

  const createEvent = (value, name) => {
    return { target: { value: value, name: name } };
  };

  // if edit regime's turn on
  React.useEffect(() => {
    (async () => {
      if (isEdit) {
        try {
          const { data } = await instance.get(`posts/${params.id}`);

          // set controlled inputs
          setTitle(data.title);
          setEdit(data.text);
          setPhotoUrl(data.photoUrl);

          // call react hook states for inputs
          titleField.onChange(createEvent(data.title, 'title'));
          editField.onChange(createEvent(data.text, 'text'));
          photo.onChange(createEvent(data.photoUrl, 'photoUrl'));

          // func onChange react-hook-forms controlled input
          // event => {
          //   registerProps.onChange({
          //     target: {
          //       value: getEventValue(event),
          //       name: name
          //     },
          //     type: EVENTS.CHANGE
          //   });
          // }
        } catch (e) {
          alert(e);
        }
      } else {
        // clear inputs after edit-article
        setTitle('');
        setEdit('');
        setPhotoUrl('');
      }
    })();
  }, [isEdit, params.id]);

  return (
    <div className={styles.wrapper}>
      <Box sx={{ minWidth: '100%' }}>
        <p>{methods.formState.errors.title?.message}</p>
        <Controller
          name="title"
          control={methods.control}
          render={({ field: { onChange } }) => (
            <input
              {...titleField}
              className={styles.title}
              value={title}
              placeholder="Введите заголовок..."
              onChange={(e) => {
                setTitle(e.target.value);
                onChange && onChange(e.target.value);
              }}
            />
          )}
        />

        <p className={styles.href__on_img}>Сылка на изображение</p>
        <p>{methods.formState.errors.photoUrl?.message}</p>
        <div className={styles.upload__photo}>
          <Controller
            name="photoUrl"
            control={methods.control}
            render={({ field: { onChange } }) => (
              <input
                {...photo}
                className={styles.href__on_img}
                value={photoUrl}
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
              {...editField}
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
