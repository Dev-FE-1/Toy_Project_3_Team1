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
import styled from '@emotion/styled'
import { colors } from '@/constants/color'
import formatDate from '@/firebase/formatDate'
import { NpLogo } from '@/constants/logourl'

interface Comment {
  id: string
  comment: string
  createdAt: number
  userRef: string
  userName: string
  userImg: string
}

const Comments = () => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([])

  const [expandedComments, setExpandedComments] = useState<{ [key: string]: boolean }>({})

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
            const userName = userDoc.data()?.name || 'My Idoru'
            const userImg = userDoc.data()?.img || NpLogo
            return { ...commentData, userName, userImg }
          })
        )
        setComments(commentsData)
      })
    }

    fetchComments()
  }, []) // ${playlistId} 변경 시, [] 추가 필요

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (comment.trim()) {
      if (comment.length > 400) {
        alert('400 자 이상은 입력 할 수 없습니다.')
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

  const toggleCommentExpansion = (commentId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  return (
    <Container>
      <form className="form" onSubmit={handleComment}>
        <input
          className="textarea"
          type="textarea"
          onChange={handleCommentChange}
          value={comment}
        />
        <button className="button" type="submit">
          댓글
        </button>
      </form>

      <div className="comment-area">
        {comments.map((comment, index) => (
          <div key={index} className="comment-card">
            <div>
              <img className="user-img" src={comment.userImg} alt="User Image" />
              <p className="user-name">{comment.userName} </p>
              <p className="comment-data">{formatDate(comment.createdAt)}</p>
            </div>

            <div className="comment">
              {comment.comment.length > 250 && !expandedComments[comment.id] ? (
                <>
                  {comment.comment.slice(0, 250)} ···
                  <div className="show-more" onClick={() => toggleCommentExpansion(comment.id)}>
                    자세히 보기
                  </div>
                </>
              ) : (
                comment.comment
              )}
              {expandedComments[comment.id]}{' '}
            </div>
          </div>
        ))}
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

  .textarea {
    width: 80%;
    border: none;
    border-bottom: 1px solid;
    &:focus {
      outline: none;
    }
  }
  .button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 10px;
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

  .comment-data {
    font-size: 0.8em;
    color: ${colors.darkGray};
  }

  .comment {
  }

  .show-more {
    color: ${colors.darkGray};
    cursor: pointer;
  }
`
