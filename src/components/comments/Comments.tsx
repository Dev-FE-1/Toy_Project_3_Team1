import React, { useState, useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import CommentForm from './CommentForm'
import getPaginatedCommentsByPlaylistId from '@/service/comment/getPaginatedCommentsByPlaylistId'
import CommentCard from '@/components/comments/CommentCard'
import { CommentType } from '@/types/commentType'
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'

const COMMENTS_QUERY_KEY = 'comments'

interface CommentsProps {
  playlistId: string
}

const Comments: React.FC<CommentsProps> = ({ playlistId }) => {
  const queryClient = useQueryClient()
  const [comments, setComments] = useState<CommentType[]>([])
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<HTMLDivElement>(null)

  const loadMoreComments = async () => {
    if (!hasMore) return

    setIsFetching(true)

    const { comments: newComments, lastDoc: newLastDoc } = await getPaginatedCommentsByPlaylistId(
      playlistId,
      lastDoc
    )

    setComments((prevComments) => {
      const mergedComments = [...prevComments, ...newComments]

      const uniqueComments = mergedComments.filter(
        (comment, index, self) => index === self.findIndex((c) => c.id === comment.id)
      )
      return uniqueComments
    })

    if (newLastDoc) {
      setLastDoc(newLastDoc)
    } else {
      setHasMore(false)
    }

    setIsFetching(false)
  }

  const invalidateComments = () => {
    queryClient.invalidateQueries({ queryKey: [COMMENTS_QUERY_KEY, playlistId] })
    setComments([])
    setLastDoc(null)
    setHasMore(true)
    loadMoreComments()
  }

  useEffect(() => {
    loadMoreComments()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && hasMore) {
          loadMoreComments()
        }
      },
      { threshold: 1 }
    )
    if (observerRef.current) {
      observer.observe(observerRef.current)
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [isFetching, lastDoc, hasMore])

  return (
    <div>
      <div className="comments-container">
        <CommentForm playlistId={playlistId} onCommentAdded={invalidateComments} />
        <div className="comment-area">
          {comments.map((comment: CommentType) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              playlistId={playlistId}
              onCommentDeleted={invalidateComments}
            />
          ))}
        </div>
        <div ref={observerRef} style={{ height: '50px', backgroundColor: 'transparent' }}></div>
        {isFetching && <p>Loading more comments...</p>}
        {!hasMore && <p>No more comments</p>}
      </div>
    </div>
  )
}

export default Comments
