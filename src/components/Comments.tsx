import React, { useEffect, useState } from 'react'
import { db, auth } from '@/firebase/firebaseConfig'
import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

const formatDate = (timestamp) => {
  if (!timestamp) return ''

  const date = timestamp.toDate()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${month}.${day} ${hours}:${minutes}`
}

const Comments = () => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [expandedComments, setExpandedComments] = useState({})

  const { currentUser } = auth
  const userId = currentUser?.uid

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(collection(db, `PLAYLISTS/playlistId/COMMENTS`), orderBy('createdAt', 'desc'))
      onSnapshot(q, async (snapshot) => {
        const commentsData = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const commentData = doc.data()
            const userDoc = await getDoc(commentData.userRef)
            const userName = userDoc.data().name
            const userImg = userDoc.data().img
            return { ...commentData, userName, userImg }
          })
        )
        setComments(commentsData)
      })
    }

    fetchComments()
  }, [])

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (comment.trim()) {
      if (comment.length > 400) {
        alert('C400 자 이상은 입력 할 수 없습니다.')
        return
      }
      try {
        const commentId = uuidv4()
        const commentRef = doc(db, `PLAYLISTS/playlistId/COMMENTS`, commentId)
        const userRef = doc(db, `USERS/${userId}`)
        await setDoc(commentRef, {
          comment,
          createdAt: serverTimestamp(),
          userRef,
        })
        setComment('')
      } catch (error) {
        console.error('Error adding comment: ', error)
      }
    }
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const toggleCommentExpansion = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  return (
    <div style={{ margin: '15px' }}>
      <div style={{ marginBottom: '20px' }}>
        <form onSubmit={handleComment}>
          <input type="text" onChange={handleCommentChange} value={comment} />
          <button type="submit">게시</button>
        </form>
        <div>{400 - comment.length} characters remaining</div>
      </div>
      <div style={{ height: '400px', overflowY: 'auto' }}>
        {comments.map((comment, index) => (
          <div key={index} style={{ marginBottom: '20px', display: 'flex', maxWidth: '100%' }}>
            <div style={{ marginRight: '10px', flexShrink: 0 }}>
              <img
                src={comment.userImg}
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                alt={`${comment.userName}'s profile`}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <strong style={{ marginRight: '10px' }}>{comment.userName}</strong>
                <span style={{ fontSize: '0.8em', color: 'gray' }}>
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <div
                style={{
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  hyphens: 'auto',
                  maxWidth: '400px',
                }}
              >
                {comment.comment.length > 250 && !expandedComments[comment.id] ? (
                  <>
                    {comment.comment.slice(0, 250)}...
                    <button onClick={() => toggleCommentExpansion(comment.id)}>자세히보기</button>
                  </>
                ) : (
                  comment.comment
                )}
                {expandedComments[comment.id] && (
                  <button onClick={() => toggleCommentExpansion(comment.id)}>접기</button>
                )}{' '}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments
