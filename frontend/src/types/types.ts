export interface ReadingSection {
    id?: string; // Optional for new sections, added by backend
    title: string;
    passages: Passage[];
  }
  
  export interface Passage {
    title: string;
    text: string; // Contains placeholders like [a], [b], [c], [d] for Insert a Text
    questions: Question[];
  }
  
  export type Question =
    | MultipleToSingleQuestion
    | MultipleToMultipleQuestion
    | InsertTextQuestion
    | ProseSummaryQuestion;
  
  export interface BaseQuestion {
    id?: string; // Optional, added by backend
    type: string;
    prompt?: string; // Optional for some types like Insert a Text
  }
  
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
    insertion_sentence: string;
    correct_insertion_point: string; // e.g., 'a', 'b', 'c', 'd'
  }
  
  export interface ProseSummaryQuestion extends BaseQuestion {
    type: 'prose_summary';
    prompt: string;
    options: string[];
    correct_answers: string[];
  }

  // Listening section
  export interface TableQuestion {
    type: 'table';
    prompt: string;
    rows: string[];
    columns: string[];
    correct_selections: { row: string; column: string }[];
  }
  
  export interface AudioQuestion {
    type: 'audio';
    prompt: string;
    snippetFile: File | null;
    options: string[];
    correct_answers: string[]; // Supports multiple correct answers
  }

  // Speaking section
  // Define state types for each task
  export interface Task1 {
    prompt: string;
  }

  export interface Task2 {
    passage: string;
    audioFile: File | null;
    prompt: string;
  }

  export interface Task3 extends Task2 {} // Same structure as Task 2

  export interface Task4 {
    audioFile: File | null;
    prompt: string;
  }

  export interface SpeakingSectionState {
    title: string;
    task1: Task1;
    task2: Task2;
    task3: Task3;
    task4: Task4;
  }