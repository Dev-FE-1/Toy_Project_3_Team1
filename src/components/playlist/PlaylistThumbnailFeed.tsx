import React from 'react'
import styled from '@emotion/styled'
import defaultThumbnail from '@/assets/default-thumbnail.png'

interface PlaylistThumbnailFeedProps {
  thumbnails: string[]
}

const PlaylistThumbnailFeed: React.FC<PlaylistThumbnailFeedProps> = ({ thumbnails = [] }) => {
  const displayThumbnails = [...thumbnails]
  if (thumbnails.length === 3) {
    displayThumbnails.push(defaultThumbnail)
  }

  return (
    <Container count={displayThumbnails.length}>
      <div className="play-button">
        <div className="triangle"></div>
      </div>
      {displayThumbnails.map((thumbnail, index) => (
        <div className="image-container" key={index}>
          <img src={thumbnail} alt={`Thumbnail ${index + 1}`} />
        </div>
      ))}
    </Container>
  )
}

export default PlaylistThumbnailFeed

const Container = styled.div<{ count: number }>`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  display: grid;
  grid-template-columns: repeat(${(props) => Math.min(props.count, 2)}, 1fr);
  border-radius: 10px;
  overflow: hidden;

  .play-button {
    z-index: 2;
    position: absolute;
    bottom: 15px;
    left: 10px;
    width: 45px;
    height: 45px;
    background-color: rgba(128, 128, 128, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    .triangle {
      width: 0;
      height: 0;
      border-left: 10px solid white;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
    }
  }

  .image-container {
    position: relative;
    width: 100%;
    padding-top: 100%;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`
