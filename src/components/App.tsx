import React, { useCallback } from 'react';
import {observer} from 'mobx-react-lite';
import {useAppStore} from 'store/AppStore';
import './App.scss';
import Button from '@mui/material/Button';
import {SubmitModal} from './SubmitModal/SubmitModal';
import TextField from '@mui/material/TextField';

export default observer(function App() {
  const appStore = useAppStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentLesson, setCurrentLesson] = React.useState(null);

  const handleOnAdd = () => {
    setCurrentLesson(null);
    setIsOpen(true);
  }

  const handleOnEdit = (lesson) => {
    setCurrentLesson(lesson);
    setIsOpen(true);
  }

  return (
    <>
      <div className='App'>
        <div className='content'>
          <Button variant='contained' onClick={handleOnAdd}>
            Запланировать
          </Button>
          {!appStore.lessons.length ? (
            <h2 className='no-lessons'>Нет запланированных занятий</h2>
          ) : (
            <div className='lessons-grid'>
              {appStore.lessons.map((lesson, i) => (
                <div key={i} className='card' onClick={() => handleOnEdit(lesson)}>
                  <div className='fields'>
                    <TextField
                      className='text-field'
                      variant='standard'
                      label='ФИО'
                      value={lesson.name}
                    />
                    <TextField
                      className='text-field'
                      variant='standard'
                      label='Телефон'
                      value={lesson.phone}
                    />
                    <TextField
                      className='text-field'
                      variant='standard'
                      label='Email'
                      value={lesson.email}
                    />
                    <div className='datetime'>
                      <TextField
                        type='date'
                        error={appStore.error.date}
                        defaultValue={lesson.date}
                      />
                      <TextField
                        type='time'
                        error={appStore.error.time}
                        defaultValue={lesson.time}
                      />
                    </div>
                    <TextField
                      className='text-field'
                      variant='standard'
                      label='Предмет'
                      value={lesson.subject}
                    />
                    <TextField
                      className='text-field'
                      variant='standard'
                      label='Учитель'
                      value={lesson.teacher}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <SubmitModal useIsOpen={[isOpen, setIsOpen]} lesson={currentLesson} />
    </>
  );
});
