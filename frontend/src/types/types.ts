// src/types.ts

// Base Question Interface
export interface BaseQuestion {
  id?: string; // Optional, added by backend
  type: string;
}

// Question Type Interfaces
export interface MultipleToSingleQuestion extends BaseQuestion {
  type: 'multiple_to_single';
  prompt: string;
  options: string[];
  correct_answer: string;
}

export interface MultipleToMultipleQuestion extends BaseQuestion {
  type: 'multiple_to_multiple';
  prompt: string;
  options: string[];
  correct_answers: string[];
}

export interface InsertTextQuestion extends BaseQuestion {
  type: 'insert_text';
  prompt: string;
  correct_answer: string; // e.g., 'a', 'b', 'c', 'd'
}

export interface ProseSummaryQuestion extends BaseQuestion {
  type: 'prose_summary';
  prompt: string;
  options: string[];
  correct_answers: string[];
}

export interface TableQuestion extends BaseQuestion {
  type: 'table';
  prompt: string;
  rows: string[];
  columns: string[];
  correct_selections: { row: string; column: string }[];
}

export interface AudioQuestion extends BaseQuestion {
  type: 'audio';
  prompt: string;
  snippetFile: File | null;
  options: string[];
  correct_answer: string;
}

// Union Type for Questions
export type Question =
  | MultipleToSingleQuestion
  | MultipleToMultipleQuestion
  | InsertTextQuestion
  | ProseSummaryQuestion
  | TableQuestion
  | AudioQuestion;

// Listening Section Interfaces
export interface Audio {
  id?: string; // Optional, added by backend
  title: string;
  audioFile: File | null;
  photoFile: File | null;
  questions: Question[];
}

export interface ListeningSection {
  id?: string; // Optional, added by backend
  title: string;
  audios: Audio[];
}

// API Request and Response Interfaces
export interface ListeningSectionRequest {
  title: string;
  audios: {
    title: string;
    questions: Question[];
  }[];
}

export interface ListeningSectionResponse {
  id: string;
  title: string;
  audios: {
    id: string;
    title: string;
    audioUrl: string;
    photoUrl: string | null;
    questions: Question[];
  }[];
}

// Speaking Section Interfaces
export interface Task1 {
  prompt: string;
}

export interface Task2 {
  passage: string;
  audioFile: File | null;
  prompt: string;
}

export interface Task3 extends Task2 {}

export interface Task4 {
  audioFile: File | null;
  prompt: string;
}

export interface SpeakingSection {
  id?: string;
  title: string;
  task1: Task1;
  task2: Task2;
  task3: Task3;
  task4: Task4;
}

export interface SpeakingSectionRequest {
  title: string;
  task1: Task1;
  task2: { passage: string; prompt: string };
  task3: { passage: string; prompt: string };
  task4: { prompt: string };
}

export interface SpeakingSectionResponse {
  id: string;
  title: string;
  task1: Task1;
  task2: { passage: string; audioUrl: string; prompt: string };
  task3: { passage: string; audioUrl: string; prompt: string };
  task4: { audioUrl: string; prompt: string };
}

// Writing Section Interfaces
export interface WritingTask1 extends Task2 {}

export interface WritingTask2 {
  passage: string;
  prompt: string;
}

export interface WritingSection {
  id?: string;
  title: string;
  task1: WritingTask1;
  task2: WritingTask2;
}

export interface WritingSectionRequest {
  title: string;
  task1: { passage: string; prompt: string };
  task2: { passage: string; prompt: string };
}

export interface WritingSectionResponse {
  id: string;
  title: string;
  task1: { passage: string; audioUrl: string; prompt: string };
  task2: { passage: string; prompt: string };
}

// Reading Section Interfaces
export interface Passage {
  id?: string;
  title: string;
  text: string;
  questions: Question[];
}

export interface ReadingSection {
  id?: string;
  title: string;
  passages: Passage[];
}

export interface ReadingSectionRequest {
  title: string;
  passages: {
    title: string;
    text: string;
    questions: Question[];
  }[];
}

export interface ReadingSectionResponse {
  id: number;
  title: string;
  passages: Passage[];
}