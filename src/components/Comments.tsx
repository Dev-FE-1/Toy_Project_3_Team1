import React, { useState } from 'react'
import { getComment } from '@/api/comment/getComment'
import { addComment } from '@/api/comment/addComment'
import { deleteComment } from '@/api/comment/deleteComment'
import styled from '@emotion/styled'
import { colors } from '@/constants/color'
import formatDate from '@/utils/formatDate'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { CommentType } from '@/types/commentType'
import { auth } from '@/firebase/firebaseConfig'
import { Trash2 } from 'lucide-react'

interface CommentsProps {
  playlistId: string
}

const COMMENTS_QUERY_KEY = 'comments'

const Comments: React.FC<CommentsProps> = ({ playlistId }) => {
  const [comment, setComment] = useState('')
  const [expandedComments, setExpandedComments] = useState<{ [key: string]: boolean }>({})
  const [warning, setWarning] = useState('')
  const queryClient = useQueryClient()

  const { data: comments, isLoading } = useQuery<CommentType[]>({
    queryKey: [COMMENTS_QUERY_KEY, playlistId],
    queryFn: () => getComment(playlistId),
  })

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (comment.trim()) {
      await addComment(playlistId, comment)
      setComment('')
      queryClient.invalidateQueries({ queryKey: [COMMENTS_QUERY_KEY, playlistId] })
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

  const handleDeleteComment = async (commentId: string) => {
    if (window.confirm('삭제하시겠습니까?')) {
      await deleteComment(playlistId, commentId)
      queryClient.invalidateQueries({ queryKey: [COMMENTS_QUERY_KEY, playlistId] })
    }
  }

  const isCurrentUserComment = (comment: CommentType) => {
    return auth.currentUser?.uid === comment.userRef.split('/')[1]
  }

  return (
    <Container>
      <div className="comments-container">
        <form className="comment-form" onSubmit={handleComment}>
          <textarea
            maxLength={400}
            onChange={handleCommentChange}
            value={comment}
            placeholder="댓글을 입력하세요..."
          />
          <button type="submit">댓글</button>
        </form>
        {warning && <p className="warning-text">{warning}</p>}

        <div className="comment-area">
          {isLoading ? (
            <p>댓글을 불러오는 중입니다.</p>
          ) : (
            <>
              {comments?.map((comment: CommentType) => (
                <div key={comment.id} className="comment-card">
                  <img className="profile-img" src={comment.userImg} alt="User Image" />
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="user-name">{comment.userName}</span>
                      <span className="comment-date">{formatDate(comment.createdAt)}</span>
                      {isCurrentUserComment(comment) && (
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <p className="comment-text">
                      {comment.comment.length > 250 && !expandedComments[comment.id] ? (
                        <>
                          {comment.comment.slice(0, 250)} ···
                          <span
                            className="expand-button"
                            onClick={() => toggleCommentExpansion(comment.id)}
                          >
                            댓글 더보기
                          </span>
                        </>
                      ) : (
                        comment.comment
                      )}
                      {expandedComments[comment.id] && (
                        <span
                          className="expand-button"
                          onClick={() => toggleCommentExpansion(comment.id)}
                        >
                          접기
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </Container>
  )
}

export default Comments

const Container = styled.div`
  .comments-container {
    /* Container 스타일 */
  }

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
    padding: 0 20px;
    background-color: ${colors.primaryPurple};
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

  .comment-area {
    /* Comment area 스타일 */
  }

  .comment-card {
    display: flex;
    gap: 15px;
    padding: 5px;
    padding-bottom: 15px;
  }

  .profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .comment-content {
    flex-grow: 1;
  }

  .comment-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
  }

  .user-name {
    font-weight: bold;
  }

  .comment-date {
    font-size: 0.8em;
    color: ${colors.darkGray};
  }

  .delete-button {
    background: none;
    border: none;
    height: 14px;
    cursor: pointer;
    color: ${colors.lightGray};
  }

  .comment-text {
    margin: 0;
    word-break: break-word;
  }

  .expand-button {
    color: ${colors.lightGray};
    cursor: pointer;
    margin-left: 5px;
  }
`
