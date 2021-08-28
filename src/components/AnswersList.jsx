import {Answer, Chats} from './index'

function AnswersList(props) {
  return (
    <div className="c-grid__answer">
      {props.answers.map((answer, index) => {
        return <Answer content={answer.content} nextId={answer.nextId} select={props.select} key={index.toString()} />
      })}
    </div>
  )
}

export default AnswersList;
