import React from "react";
import InsertTextQuestion from "../components/InsertTextQuestion";

const TestingPage:React.FC = () => {
    return (
        <InsertTextQuestion questionText="test question" passageText="test [a] passage [b] and one [c] more sentece [d]" onAnswerSelect={() => {}}/>
    )
}

export default TestingPage;