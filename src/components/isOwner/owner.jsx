import Button from '@mui/material/Button';

export const IsOwner = ({ ownerId, onClickDelete, onClickEdit }) => {
  const userId = window.localStorage.getItem('_id');

  return (
    <>
      {ownerId === userId && (
        <div style={{ marginRight: '10px' }}>
          <Button
            sx={{ marginTop: '10px', marginRight: '5px', color: '#68572d' }}
            variant="outlined"
            color="success"
            onClick={onClickEdit}
          >
            Редактировать
          </Button>
          <Button
            sx={{ marginTop: '10px', marginRight: '5px' }}
            variant="outlined"
            color="error"
            onClick={onClickDelete}
          >
            Удалить
          </Button>
        </div>
      )}
    </>
  );
};
