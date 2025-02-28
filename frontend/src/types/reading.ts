export interface Option {
    id: string;
    text: string;
}

export interface MultipleChoiceQuestion {
    id: string;
    text: string;
    options: Option[];
    type: 'multiple_choice';
    correctAnswer: string | string[];
}

export interface ProseSummaryQuestion {
    id: string;
    text: string;
    options: Option[];
    type: 'prose_summary';
    correctAnswer: string[];
}

export interface InsertTextQuestion {
    id: string;
    text: string;
    passageText: string;
    insertionPoints: number[];
    type: 'insert_text';
    correctAnswer: string;
}

export type Question = MultipleChoiceQuestion | ProseSummaryQuestion | InsertTextQuestion;

export interface PassageConfig {
    id: string;
    title: string;
    text: string;
    questions: Question[];
}

export function isMultipleChoice(question: Question): question is MultipleChoiceQuestion {
    return question.type === 'multiple_choice';
}

export function isProseSummary(question: Question): question is ProseSummaryQuestion {
    return question.type === 'prose_summary';
}

export function isInsertText(question: Question): question is InsertTextQuestion {
    return question.type === 'insert_text';
}