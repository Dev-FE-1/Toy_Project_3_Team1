import React from 'react'
import styled from '@emotion/styled'
import { colors } from '@/constants/color'

const CreatePlaylistPage = () => {
  const handleUploadMusic = () => {}
  return (
    <Container>
      <div className="section-input">
        <input
          className="input-title"
          type="text"
          placeholder="플레이리스트의 제목을 입력하세요."
        />
        <input className="input-tag" type="text" placeholder="태그를 입력하세요." />
      </div>
      <div className="section-upload">
        <input className="input-link" type="text" placeholder="유튜브 링크를 입력하세요." />
        <button className="btn-upload" type="submit" onClick={() => handleUploadMusic}>
          곡 추가하기
        </button>
      </div>
    </Container>
  )
}

export default CreatePlaylistPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;

  .section-input {
    /* Optionally add some margin or padding */
  }

  .section-upload {
    display: flex;
    align-items: center;
  }

  .input-title,
  .input-tag,
  .input-link {
    width: 100%;
    padding: 16px 18px;
    margin-bottom: 10px;
    border: 1px solid ${colors.lightGray};
    border-radius: 5px;
  }

  .input-link {
    position: relative;
  }

  .btn-upload {
    position: absolute;
    right: 30px;
    bottom: 43px;
    margin-left: 10px;
    border: 1px solid ${colors.lightGray};
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
  }
`
