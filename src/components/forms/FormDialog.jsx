import { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useEffect } from 'react';
import TextInput from './TextInput'

const slackWebhookUrl = 'https://hooks.slack.com/services/T2PBM2E8H/B02CG0B1V38/xxx'

const FormDialog = (props) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")

  const inputName = (eventListener) => {
    setName(eventListener.target.value)
  }

  const inputEmail = (eventListener) => {
    setEmail(eventListener.target.value)
  }

  const inputContent = (eventListener) => {
    setContent(eventListener.target.value)
  }

  const submitForm = async () => {
    const payload = {
      text: 'お問い合わせがありました。\n' + 
            'お名前: ' + name + '\n' +
            'メールアドレス: ' + email + '\n' + 
            '内容:\n' + content
    }

    try {
      const response = await axios.post(slackWebhookUrl, JSON.stringify(payload))
      alert('送信が完了しました。お問い合わせありがとうございました。')
    } catch (e) {
      console.log("e")
      alert("送信中にエラーが発生しました。恐れ入りますがやり直してください。")
      return props.handleClose()
    }
    setName("")
    setEmail("")
    setContent("")
    return props.handleClose()
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
      <DialogContent>
        <TextInput
          label={"お名前(必須)"} multiline={false} rows={1}
          value={name} type={"text"} onChange={inputName}
        />
        <TextInput
          label={"メールアドレス(必須)"} multiline={false} rows={1}
          value={email} type={"text"} onChange={inputEmail}
        />
        <TextInput
          label={"内容(必須)"} multiline={true} rows={5}
          value={content} type={"text"} onChange={inputContent}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={submitForm} color="primary" autoFocus>
          送信
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog
