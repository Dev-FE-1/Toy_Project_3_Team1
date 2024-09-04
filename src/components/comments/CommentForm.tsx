import React, { useState } from 'react'
import { addComment } from '@/api/comment/addComment'
import styled from '@emotion/styled'
import { colors } from '@/constants/color'

interface CommentFormProps {
  playlistId: string
  onCommentAdded: () => void
}

const CommentForm: React.FC<CommentFormProps> = ({ playlistId, onCommentAdded }) => {
  const [comment, setComment] = useState('')
  const [warning, setWarning] = useState('')

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (comment.trim()) {
      await addComment(playlistId, comment)
      setComment('')
      onCommentAdded()
    }
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value
    if (newComment.length > 400) {
      setWarning('400자까지 입력할 수 있습니다.')
    } else {
      setWarning('')
      setComment(newComment)
    }
  }

  return (
    <FormContainer>
      <form className="comment-form" onSubmit={handleComment}>
        <textarea
          maxLength={400}
          onChange={handleCommentChange}
          value={comment}
          placeholder="댓글을 입력하세요."
        />
        <button type="submit">등록</button>
      </form>
      {warning && <p className="warning-text">{warning}</p>}
    </FormContainer>
  )
}

export default CommentForm

const FormContainer = styled.div`
  .comment-form {
    display: flex;
    margin-bottom: 20px;
  }

  .comment-form textarea {
    flex-grow: 1;
    padding: 10px;
    height: 40px;
    border: none;
    resize: vertical;
  }

  .comment-form button {
    height: 40px;
    margin-left: 10px;
    padding: 0 10px;
    background-color: ${colors.mediumPurple};
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
  }

  .warning-text {
    text-align: center;
    color: red;
    margin-top: -10px;
    margin-bottom: 10px;
  }
`
