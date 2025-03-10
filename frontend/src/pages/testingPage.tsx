import React from "react";
import ProseSummaryArea from "../components/ProseSummaryArea";
import { ProseSummaryQuestion } from "../types/types";


const question: ProseSummaryQuestion = {
    id: 'q1',
    type: 'prose_summary',
    prompt: 'Summarize the passage by ordering these points.',
    options: ['Point A', 'Point B', 'Point C', 'Point D'],
    correct_answers: ['Point A', 'Point B'],
  };
  
const TestingPage:React.FC = () => {
    return (
        <ProseSummaryArea 
            question={question} 
            onAnswerSelect={(answer: string[]) => {console.log('something just happened, btw answer is: ', answer);}} 
        />
    )
}

export default TestingPage;