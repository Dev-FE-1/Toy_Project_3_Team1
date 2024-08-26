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

const Comments = () => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

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

  const handleComment = async () => {
    if (comment.trim()) {
      const commentId = uuidv4()
      const commentRef = doc(db, `PLAYLISTS/playlistId/COMMENTS`, commentId)
      const userRef = doc(db, `USERS/${userId}`)
      await setDoc(commentRef, {
        comment,
        createdAt: serverTimestamp(),
        userRef,
      })
      setComment('')
    }
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  return (
    <div style={{ margin: '15px' }}>
      <div>comments</div>
      <div>
        <input type="text" onChange={handleCommentChange} value={comment} />
        <button onClick={handleComment}>게시</button>
      </div>
      <div>
        {comments.map((comment, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <div>
              <img
                src={comment.userImg}
                style={{ width: '30px', height: '30px', borderRadius: '50%' }}
              />
              <strong>{comment.userName}</strong>
              <div style={{ fontSize: '0.8em', color: 'gray' }}>
                {new Date(comment.createdAt.seconds * 1000).toLocaleString()}
              </div>
            </div>
            {comment.comment}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments
