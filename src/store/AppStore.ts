import React from 'react';
import {getSubjectType} from 'utils';
import {Context} from './AppProvider';
import db from './db.json';

export const useAppStore = () => {
  const store = React.useContext(Context);
  if (!store) throw new Error('Use appStore within AppProvider!');
  return store;
};

export type SubjectType = 'math' | 'literature' | 'russian' | 'physics' | 'chemistry';
export type FieldType = 'id' | 'name' | 'phone' | 'email' | 'date' | 'time' | 'subject' | 'teacher';
export type LessonType = {
  id: number;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  subject: string;
  teacher: string;
};

export const createAppStore = init => {
  return {
    // Subjects
    subjects: [] as string[],
    getSubjects: function () {
      this.subjects = db.subjects;
      return this.subjects;
    },
    // Teachers
    teachers: [] as string[],
    getTeachers: function (subject: string) {
      const subjectType = getSubjectType(subject);
      this.teachers = db.teachers[subjectType];
      return this.teachers;
    },
    // Lessons and current lesson
    lessons: db.lessons as LessonType[],
    lesson: {
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      subject: '',
      teacher: '',
    } as LessonType,
    setLesson: function(lesson: LessonType) {
      this.lesson = {...lesson};
    },
    setLessonField: function (field: FieldType, value: string) {
      this.lesson[field] = value;
      this.error[field] = false;
    },
    resetLesson: function () {
      this.lesson = {};
    },
    submitLesson: function () {
      // Set new lesson id with last lesson id plus 1
      const id = this.lessons.length ? this.lessons.slice(-1)[0].id + 1 : 0;
      this.lessons.push({id, ...this.lesson});
      this.resetLesson();
    },
    updateLesson: function() {
      // Get current lesson id
      const id = this.lesson.id;
      this.lessons = this.lessons.map(lesson => lesson.id === id ? this.lesson : lesson);
      this.resetLesson();
    },
    deleteLesson: function() {
      // Get current lesson actual index in array by its id
      const idx = this.lessons.map(lesson => lesson.id).indexOf(this.lesson.id);
      ~idx && this.lessons.splice(idx, 1);
      this.resetLesson();
    },
    // Error for lesson fields
    error: {
      name: false,
      phone: false,
      email: false,
      date: false,
      time: false,
      subject: false,
      teacher: false,
    },
    setErrorField: function (field: FieldType, is: boolean) {
      this.error[field] = is;
    },
    resetError: function () {
      this.error = {};
    },
    // Validate fields
    validateFields: function () {
      let isValid = true;
      if (!this.lesson.name) {
        this.setErrorField('name', true);
        isValid = false;
      }
      if (!this.lesson.phone?.replace(/\s/g, '')) {
        this.setErrorField('phone', true);
        isValid = false;
      }
      if (!this.lesson.email) {
        this.setErrorField('email', true);
        isValid = false;
      }
      if (!this.lesson.email?.match(/^(.+)@(.+).[0-9A-Za-z]+$/)) {
        this.setErrorField('email', true);
        isValid = false;
      }
      if (!this.lesson.date) {
        this.setErrorField('date', true);
        isValid = false;
      }
      if (!this.lesson.time) {
        this.setErrorField('date', true);
        isValid = false;
      }
      if (!this.lesson.subject) {
        this.setErrorField('subject', true);
        isValid = false;
      }
      if (this.lesson.subject && !this.lesson.teacher) {
        this.setErrorField('teacher', true);
        isValid = false;
      }
      return isValid;
    },
  };
};
