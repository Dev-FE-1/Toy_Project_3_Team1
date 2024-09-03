import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import styled from '@emotion/styled'
import { getComment } from '@/api/comment/getComment'
import { CommentType } from '@/types/commentType'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

const COMMENTS_QUERY_KEY = 'comments'

interface CommentsProps {
  playlistId: string
}

const Comments: React.FC<CommentsProps> = ({ playlistId }) => {
  const queryClient = useQueryClient()

  const { data: comments } = useQuery<CommentType[]>({
    queryKey: [COMMENTS_QUERY_KEY, playlistId],
    queryFn: () => getComment(playlistId),
  })

  const invalidateComments = () => {
    queryClient.invalidateQueries({ queryKey: [COMMENTS_QUERY_KEY, playlistId] })
  }

  return (
    <Container>
      <div className="comments-container">
        <CommentForm playlistId={playlistId} onCommentAdded={invalidateComments} />
        <CommentList
          comments={comments}
          playlistId={playlistId}
          onCommentDeleted={invalidateComments}
        />
      </div>
    </Container>
  )
}

export default Comments

const Container = styled.div``
