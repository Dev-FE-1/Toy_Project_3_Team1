import React, { useState, KeyboardEvent } from 'react'
import styled from '@emotion/styled'
import { X } from 'lucide-react'
import { colors } from '@/constants/color'
import { fontSize } from '@/constants/font'
import { createPlayList } from '@/api/playlist/createPlayList'
import { videoListProps } from '@/types/playlistType'

const CreatePlaylistPage = () => {
  const [title, setTitle] = useState('')
  const [currentTag, setCurrentTag] = useState('')
  const [tag, setTag] = useState<string[]>([])
  const [url, setUrl] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [videoList, setVideoList] = useState<videoListProps[]>([])

  const handleUploadMusic = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createPlayList(title, tag, videoList)
      setTitle('')
      setTag([])
      setUrl('')
      setVideoList([])
      setCurrentTag('')
    } catch (error) {
      console.error('Error adding playlist: ', error)
    }
  }

  const handleAddList = async () => {
    const isValidYoutubeUrl = (url: string) => {
      const regex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/
      return regex.test(url)
    }

    if (!isValidYoutubeUrl(url)) {
      setIsValid(false)
      return
    }

    setIsValid(true)

    const youtubeKey = import.meta.env.VITE_YOUTUBE_API_KEY
    const videoId = url.split('v=')[1]?.split('&')[0]
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${youtubeKey}`

    try {
      const res = await fetch(videoUrl)
      const data = await res.json()

      if (data.items && data.items.length > 0) {
        const videoData = {
          title: data.items[0].snippet.title,
          channelTitle: data.items[0].snippet.channelTitle,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          thumbnail: data.items[0].snippet.thumbnails.medium.url,
        }
        setVideoList((prev: videoListProps[]) => [...prev, videoData])
        setUrl('')
      }
    } catch (error) {
      console.error('add list error :', error)
    }
  }

  const handleTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim() !== '' && e.nativeEvent.isComposing === false) {
      e.preventDefault()
      const saveTag = currentTag.trim().startsWith('#')
        ? currentTag.trim()
        : `#${currentTag.trim()}`
      setTag((prev: string[]) => [...prev, saveTag])
      setCurrentTag('')
    }
  }

  const handleDelete = (id: number) => {
    setVideoList((prev: videoListProps[]) => prev.filter((_, index) => index !== id))
  }

  const handleTagDelete = (id: number) => {
    setTag((prev) => prev.filter((_, index) => index !== id))
  }

  const isUploadDisabled = title.trim() === '' || tag.length === 0 || videoList.length === 0

  return (
    <Container>
      <form onSubmit={handleUploadMusic}>
        <div className="section-input">
          <input
            className="input-title"
            type="text"
            placeholder="플레이리스트의 제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="input-tag"
            type="text"
            placeholder="태그를 입력하세요."
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyDown={handleTag}
          />
          <div className="container-tag">
            {tag.map((t, idx) => (
              <span key={idx} className="tag">
                {t}
                <button
                  className="btn-tagdelete"
                  type="button"
                  onClick={() => handleTagDelete(idx)}
                >
                  <X size={18} />
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="list-music">
          {videoList.map((item: videoListProps, idx) => (
            <div key={idx} className="item-video">
              <img src={item.thumbnail} alt={`${item.title}`} />
              <div>
                <p>{item.title}</p>
                <span>{item.channelTitle}</span>
              </div>
              <button className="btn-delete" type="button" onClick={() => handleDelete(idx)}>
                삭제
              </button>
            </div>
          ))}
        </div>
        <div className="section-upload">
          <div className="input-youtube">
            <input
              className="input-link"
              type="text"
              placeholder="유튜브 링크를 입력하세요."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className="btn-add" type="button" onClick={handleAddList}>
              곡 추가
            </button>
          </div>
          {!isValid && <span className="text-warning">유튜브 링크를 입력해주세요.</span>}
          <button className="btn-upload" type="submit" disabled={isUploadDisabled}>
            등록하기
          </button>
        </div>
      </form>
    </Container>
  )
}

export default CreatePlaylistPage

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .section-upload {
    align-items: center;
  }

  .input-link {
    width: 100%;
    margin-bottom: 5px;
    padding: 16px 18px;
    border: 1px solid ${colors.lightGray};
    border-radius: 5px;
  }

  .input-title,
  .input-tag,
  .btn-upload,
  .btn_add {
    width: 100%;
    padding: 16px 18px;
    margin-bottom: 10px;
    border: 1px solid ${colors.lightGray};
    border-radius: 5px;
  }

  .list-music {
    padding: 20px 0;
    display: flex;
    height: 350px;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
  }

  .item-video {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid ${colors.lightGray};
    border-radius: 5px;
    background-color: ${colors.white};
  }

  .item-video img {
    width: 120px;
    height: 90px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 16px;
  }

  .item-video div {
    display: flex;
    flex-direction: column;
  }

  .item-video p {
    font-size: ${fontSize.md};
    font-weight: bold;
    margin: 0;
    color: ${colors.black};
  }

  .item-video span {
    font-size: ${fontSize.sm};
    color: ${colors.gray};
    margin-top: 4px;
  }

  .input-youtube {
    display: flex;
    gap: 10px;
  }

  .btn-add {
    right: 10px;
    width: 100px;
    top: 10px;
    border: 1px solid ${colors.lightGray};
    color: ${colors.white};
    background-color: ${colors.primaryPurple};
    border-radius: 15px;
    margin-bottom: 5px;
    cursor: pointer;
  }

  .btn-delete {
    width: 100px;
    border: 1px solid ${colors.lightGray};
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
  }

  .btn-upload {
    border: 1px solid ${colors.lightGray};
    border-radius: 5px;
    background-color: ${colors.primaryPurple};
    color: ${colors.white};
    cursor: pointer;
  }

  .btn-upload:disabled {
    pointer-events: none;
    opacity: 0.4;
  }

  .text-warning {
    color: red;
    margin-left: 10px;
    font-size: ${fontSize.sm};
  }

  .container-tag {
    display: flex;
    flex-wrap: nowrap;
    gap: 8px;
    max-width: 100%;
    overflow-x: auto;
    white-space: nowrap;
  }

  .tag {
    background-color: ${colors.primaryPurple};
    border-radius: 20px;
    padding: 5px 10px;
    font-size: ${fontSize.sm};
    color: ${colors.white};
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .btn-tagdelete {
    background-color: ${colors.primaryPurple};
    border: none;
    color: ${colors.white};
    cursor: pointer;
    margin-top: 3px;
    margin-left: 2px;
  }
`
