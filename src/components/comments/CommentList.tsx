import React from 'react'
import { CommentType } from '@/types/commentType'
import CommentCard from './CommentCard'
import styled from '@emotion/styled'

interface CommentListProps {
  comments: CommentType[] | undefined
  playlistId: string
  onCommentDeleted: () => void
}

const CommentList: React.FC<CommentListProps> = ({ comments, playlistId, onCommentDeleted }) => {
  return (
    <ListContainer>
      <div className="comment-area">
        {comments?.map((comment: CommentType) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            playlistId={playlistId}
            onCommentDeleted={onCommentDeleted}
          />
        ))}
      </div>
    </ListContainer>
  )
}

export default CommentList

const ListContainer = styled.div`
  .comment-area {
  }
`
