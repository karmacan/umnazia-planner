import {SubjectType} from 'store/AppStore';

export const getSubjectType = (subject: string): SubjectType => {
  switch (subject) {
    case 'Математика':
      return 'math';
    case 'Русский язык':
      return 'russian';
    case 'Литература':
      return 'literature';
    case 'Физика':
      return 'physics';
    case 'Химия':
      return 'chemistry';
    default:
      throw new Error('No such subject!');
  }
};
