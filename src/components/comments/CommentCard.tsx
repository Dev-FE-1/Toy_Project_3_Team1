import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Trash2 } from 'lucide-react'
import { auth } from '@/firebase/firebaseConfig'
import { deleteComment } from '@/api/comment/deleteComment'
import formatDate from '@/utils/formatDate'
import { CommentType } from '@/types/commentType'
import { colors } from '@/constants/color'

interface CommentCardProps {
  comment: CommentType
  playlistId: string
  onCommentDeleted: () => void
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, playlistId, onCommentDeleted }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const isCurrentUserComment = auth.currentUser?.uid === comment.userRef.split('/')[1]

  const handleDeleteComment = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      await deleteComment(playlistId, comment.id)
      onCommentDeleted()
    }
  }

  const toggleCommentExpansion = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <CardContainer>
      <img className="profile-img" src={comment.userImg} alt="User Image" />
      <div className="comment-content">
        <div className="comment-header">
          <span className="user-name">{comment.userName}</span>
          <span className="comment-date">{formatDate(comment.createdAt)}</span>
          {isCurrentUserComment && (
            <button className="delete-button" onClick={handleDeleteComment}>
              <Trash2 size={14} />
            </button>
          )}
        </div>
        <p className="comment-text">
          {comment.comment.length > 250 && !isExpanded ? (
            <>
              {comment.comment.slice(0, 250)} ···
              <span className="expand-button" onClick={toggleCommentExpansion}>
                댓글 더보기
              </span>
            </>
          ) : (
            comment.comment
          )}
          {isExpanded && (
            <span className="expand-button" onClick={toggleCommentExpansion}>
              접기
            </span>
          )}
        </p>
      </div>
    </CardContainer>
  )
}

export default CommentCard

const CardContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 5px;
  padding-bottom: 15px;

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
