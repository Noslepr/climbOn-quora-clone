import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './Question.css'


export const Question = () => {
    const { id : questionId } = useParams()
    const question = useSelector(({questions}) => questions[questionId])

    return (
        <div id='question-page'>
            <div id='question-left-container'>
                <h1 id="question-header">{question.question}</h1>
                <div id='num-answers'>
                    <div className="circle">
                        <i className="fa-solid fa-list-ul" id="answer-icon"></i>
                    </div>
                    <span className="answers-text">{question.answers.length}</span>
                    <span className="answers-text">Answers</span>
                </div>
                <ul>
                    {question.answers.map(answer => (
                        <div key={Math.random()} className="answer-container">
                            <div className="answer-user">{answer.user.full_name}</div>
                            <li className="list-answer">{answer.answer}</li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}
