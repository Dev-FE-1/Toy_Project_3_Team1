import styled from '@emotion/styled'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PATH } from '@/constants/path'
import { fontSize, fontWeight } from '@/constants/font'
import Button from '@/components/common/Button/Button'
import ButtonLink from '@/components/common/Button/ButtonLink'
import { colors } from '@/constants/color'
import Profile from '@/assets/profile_logo.jpg'
import { useUserData } from '@/hooks/useUserData'
import { usePlaylistData } from '@/hooks/usePlaylistData'
import { filterPlaylist } from '@/types/playlistType'

const ProfilePage = () => {
  const { userId } = useParams<{ userId?: string }>()
  const userData = useUserData(userId)
  const playlistData = usePlaylistData(userId)
  const isMyProfile = !userId || userId === userData.userId
  const [filter, setFilter] = useState<filterPlaylist>('all')

  const handleFilterChange = (newFilter: filterPlaylist) => {
    setFilter(newFilter)
  }

  const filteredLists = playlistData.filter((playlistData) => {
    if (!isMyProfile && playlistData.isPrivate) return false
    if (filter == 'all') return true
    if (filter === 'public') return !playlistData.isPrivate
    if (filter === 'private') return playlistData.isPrivate
  })

  return (
    <Container>
      <div className="section-head">
        {userData.userId}
        {isMyProfile && (
          <ButtonLink to={PATH.EDITPROFILE} size="small" buttonWidth="15%" variant="secondary">
            설정
          </ButtonLink>
        )}
      </div>
      <div className="section-userinfo">
        <div className="profile">
          <div className="section-img">
            <img className="img-profile" src={userData.userImg || Profile} alt="이미지" />
          </div>
          <div className="section-info">
            <div className="playlist">
              <div className="playlist-length">{userData.playlistLength}</div>
              플리
            </div>
            <div className="follower">
              <div className="follower-length">{userData.followerLength}</div>
              팔로워
            </div>
            <div className="following">
              <div className="following-length">{userData.followingLength}</div>팔로잉
            </div>
          </div>
        </div>
        <div className="user-bio">[{userData.userBio}]</div>
        {!isMyProfile && <Button size="small">팔로우</Button>}
      </div>
      <div className="divider" />
      <div className="section-playlist">
        <div className="text-playlist">플레이리스트</div>
        {isMyProfile && (
          <div className="section-btn">
            <Button size="small" onClick={() => handleFilterChange('all')}>
              전체
            </Button>
            <Button size="small" onClick={() => handleFilterChange('public')}>
              공개
            </Button>
            <Button size="small" onClick={() => handleFilterChange('private')}>
              비공개
            </Button>
          </div>
        )}
        {filteredLists.map((playlist, idx) => (
          <div className="title-playlist" key={idx}>
            <div className="title-thumbnail">
              <Link to={`/playlist/${playlist.playlistId}`}>
                <img src={playlist.thumbnail} alt={playlist.title} />
              </Link>
            </div>
            <div className="title-video">
              {playlist.title}
              {playlist.isPrivate && <div className="tag-private">비공개</div>}
            </div>
          </div>
        ))}
      </div>
      {!isMyProfile && (
        <ButtonLink to={PATH.HOME} variant="secondary">
          플레이리스트 모두 보기
        </ButtonLink>
      )}
    </Container>
  )
}

export default ProfilePage

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .section-head {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
  }

  .section-userinfo {
    padding: 10px 20px 20px 20px;
  }

  .playlist,
  .follower,
  .following,
  .user-bio {
    font-size: ${fontSize.md};
    font-weight: ${fontWeight.bold};
  }

  .profile {
    display: flex;
    justify-content: space-between;
    text-align: center;
    height: 52px;
  }

  .section-img {
    display: flex;
    width: 50px;
    height: 50px;

    .img-profile {
      border-radius: 50px;
    }
  }

  .section-info {
    gap: 55px;
    display: flex;
  }

  .user-bio {
    margin: 12px 0;
  }

  .divider {
    background-color: ${colors.lightestGray};
    width: 100%;
    height: 6px;
  }

  .section-btn {
    display: flex;
    gap: 5px;
    width: 200px;
    margin: 20px 0;
  }

  .section-playlist {
    padding: 20px;
    font-size: ${fontSize.md};
    font-weight: ${fontWeight.bold};
  }

  .title-playlist {
    display: flex;
    align-items: center;
    gap: 10px;

    .tag-private {
      background-color: ${colors.lightPurPle};
      width: 54px;
      border-radius: 15px;
      text-align: center;
    }
  }

  .title-thumbnail {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title-thumbnail img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  .title-video {
    width: 320px;
  }

  .text-playlist {
    font-size: ${fontSize.lg};
  }
`
