import React from 'react';
import './SubmitModal.scss';
import {observer} from 'mobx-react-lite';
import {useAppStore} from 'store/AppStore';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {SelectField} from './SelectField/SelectField';
import Button from '@mui/material/Button';
import InputMask from 'react-input-mask';

export const SubmitModal = observer(({useIsOpen, lesson}) => {
  const appStore = useAppStore();
  const [isOpen, setIsOpen] = useIsOpen;
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

  // On mount
  React.useEffect(() => {
    appStore.getSubjects();
  }, []);

  // On open / close
  React.useEffect(() => {
    if (lesson) appStore.setLesson(lesson);
    if (!isOpen) appStore.resetLesson();
  }, [isOpen]);

  // On subject change
  React.useEffect(() => {
    appStore.lesson.subject && appStore.getTeachers(appStore.lesson.subject);
  }, [appStore.lesson.subject]);

  const handleOnClose = () => {
    appStore.resetError();
    setIsOpen(false);
  };

  const handleOnSubmit = () => {
    if (!appStore.validateFields()) return;
    appStore.submitLesson();
    setIsOpen(false);
  };

  const handleOnEdit = () => {
    if (!appStore.validateFields()) return;
    appStore.updateLesson();
    setIsOpen(false);
  };

  const handleOnDelete = () => {
    appStore.deleteLesson();
    setIsDeleteOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      <Modal open={isOpen} onClose={handleOnClose}>
        <div className='modal submit'>
          <TextField
            className='text-field'
            variant='standard'
            label='ФИО'
            value={appStore.lesson.name}
            onChange={ev => appStore.setLessonField('name', ev.target.value)}
            error={appStore.error.name}
          />
          <InputMask
            mask='9 999 999 99 99'
            maskChar=' '
            value={appStore.lesson.phone}
            onChange={ev => appStore.setLessonField('phone', ev.target.value)}
          >
            {() => (
              <TextField
                className='text-field'
                variant='standard'
                label='Телефон'
                error={appStore.error.phone}
              />
            )}
          </InputMask>
          <TextField
            className='text-field'
            variant='standard'
            label='Email'
            placeholder='email@example.com'
            value={appStore.lesson.email}
            onChange={ev => appStore.setLessonField('email', ev.target.value)}
            error={appStore.error.email}
          />
          <div className='datetime'>
            <TextField
              type='date'
              value={appStore.lesson.date}
              onChange={ev => appStore.setLessonField('date', ev.target.value)}
              error={appStore.error.date}
            />
            <TextField
              type='time'
              value={appStore.lesson.time}
              onChange={ev => appStore.setLessonField('time', ev.target.value)}
              error={appStore.error.time}
            />
          </div>
          <SelectField
            label={'Предмет'}
            options={appStore.subjects}
            value={appStore.lesson.subject}
            onChange={value => appStore.setLessonField('subject', value)}
            error={appStore.error.subject}
          />
          <SelectField
            options={appStore.teachers}
            label={'Учитель'}
            disabled={!appStore.lesson.subject}
            value={appStore.lesson.teacher}
            onChange={value => appStore.setLessonField('teacher', value)}
            error={appStore.error.teacher}
          />
          <div className='btn'>
            {!lesson ? (
              <Button variant='contained' onClick={handleOnSubmit}>
                Добавить
              </Button>
            ) : (
              <>
                <Button variant='contained' onClick={handleOnEdit}>
                  Изменить
                </Button>
                <Button variant='contained' color='error' onClick={() => setIsDeleteOpen(true)}>
                  Удалить
                </Button>
              </>
            )}
          </div>
        </div>
      </Modal>
      <Modal open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <div className='modal delete'>
          <h2 className='delete-title'>Вы уверены что хотите удалить урок?</h2>
          <div className='btn'>
            <Button variant='contained' color='error' onClick={handleOnDelete}>
              Удалить
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
});
