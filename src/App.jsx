import { useState } from 'react';
import defaultDataset from "./dataset"
import {AnswersList, Chats, FormDialog} from './components/index'
import { useEffect } from 'react';

function App() {
  const [answers, setAnswers] = useState([])
  const [chats, setChats] = useState([])
  const [currentId, setCurrentId] = useState("init")
  const [dataset, setDataset] = useState(defaultDataset)
  const [open, setOpen] = useState(false)

  const handleFormDialogOpen = () => {
    setOpen(true);
  };

  const handleFormDialogClose = () => {
    setOpen(false);
  };

  const addChat = (newChat) => {
    setChats(prevState => [...prevState, newChat])
  }

  const displayNextQuestion = (nextQuestionId) => {
    addChat({
      text: dataset[nextQuestionId].question,
      type: 'question'
    })
    setCurrentId(nextQuestionId)
    setAnswers(dataset[nextQuestionId].answers)
  }

  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch(true) {
      case nextQuestionId === 'init':
        displayNextQuestion(nextQuestionId)
        break

      case nextQuestionId === 'contact':
        handleFormDialogOpen()
        break

      case (/^http[s]:*/.test(nextQuestionId)):
        const anchorElement = document.createElement('a')
        anchorElement.href = nextQuestionId
        anchorElement.target = '_blank'
        anchorElement.click()
        break

      default:
        const chat = {
          text: selectedAnswer,
          type: 'answer'
        }
        addChat(chat)
        setTimeout(() => displayNextQuestion(nextQuestionId), 850)
        break
    }
  }

  // componentDidMount
  useEffect(() => {
    const answer = ''
    selectAnswer(answer, currentId)
  }, [])

  // componentDidUpdate
  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area")
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  })

  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats}/>
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog open={open} handleClose={handleFormDialogClose} />
      </div>
    </section>
  );
}

export default App;
