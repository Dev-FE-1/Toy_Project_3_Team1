import React, { useState } from 'react'
import { getComment } from '@/api/comment/getComment'
import { addComment } from '@/api/comment/addComment'
import styled from '@emotion/styled'
import { colors } from '@/constants/color'
import formatDate from '@/utils/formatDate'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { CommentType } from '@/types/commentType'

const COMMENTS_QUERY_KEY = 'comments'

const Comments = () => {
  const [comment, setComment] = useState('')
  const [expandedComments, setExpandedComments] = useState<{ [key: string]: boolean }>({})
  const [warning, setWarning] = useState('')
  const queryClient = useQueryClient()

  const { data: comments, isLoading } = useQuery<CommentType[]>({
    queryKey: [COMMENTS_QUERY_KEY],
    queryFn: () => getComment(),
  })

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (comment.trim()) {
      await addComment(comment)
      setComment('')
      queryClient.invalidateQueries({ queryKey: [COMMENTS_QUERY_KEY] })
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

  const toggleCommentExpansion = (commentId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  return (
    <Container>
      <div>
        <form className="form" onSubmit={handleComment}>
          <textarea
            className="textarea"
            maxLength={400}
            onChange={handleCommentChange}
            value={comment}
          />
          <button className="submit-button" type="submit">
            댓글
          </button>
        </form>
        {warning && <p className="warning">{warning}</p>}
      </div>

      <div className="comment-area">
        {isLoading ? (
          <p>댓글을 불러오는 중입니다...</p>
        ) : (
          <>
            {comments?.map((comment: CommentType) => (
              <div key={comment.id} className="comment-card">
                <img className="user-img" src={comment.userImg} alt="User Image" />
                <p className="user-name">{comment.userName} </p>
                <p className="comment-date">{formatDate(comment.createdAt)}</p>
                <div className="comment">
                  {comment.comment.length > 250 && !expandedComments[comment.id] ? (
                    <>
                      {comment.comment.slice(0, 250)} ···
                      <div
                        className="over250-letters"
                        onClick={() => toggleCommentExpansion(comment.id)}
                      >
                        자세히 보기
                      </div>
                    </>
                  ) : (
                    comment.comment
                  )}
                  {expandedComments[comment.id] && (
                    <div
                      className="over250-letters"
                      onClick={() => toggleCommentExpansion(comment.id)}
                    >
                      접기
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </Container>
  )
}

export default Comments

const Container = styled.div`
  .form {
    display: flex;
    justify-content: center;
  }

  .submit-button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 10px;
  }

  .textarea {
    width: 80%;
    border: none;
    max-width: 80%;
    max-height: 100px;
    border-bottom: 1px solid;
    &:focus {
      outline: none;
    }
  }

  .warning {
    text-align: center;
    color: red;
    font-size: 0.8em;
  }

  .comment-area {
    margin-top: 20px;
  }

  .comment-card {
    margin-bottom: 20px;
  }

  .user-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .user-name {
    font-weight: bold;
  }

  .comment-date {
    font-size: 0.8em;
    color: ${colors.darkGray};
  }

  .comment {
    word-break: break-all;
  }

  .over250-letters {
    color: ${colors.darkGray};
    cursor: pointer;
  }
  .more-comments {
    display: block;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
`
