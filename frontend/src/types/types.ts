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