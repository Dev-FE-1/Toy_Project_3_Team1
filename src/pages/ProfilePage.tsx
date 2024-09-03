import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PATH } from '@/constants/path'
import { fontSize, fontWeight } from '@/constants/font'
import Button from '@/components/common/Button/Button'
import ButtonLink from '@/components/common/Button/ButtonLink'
import { colors } from '@/constants/color'
import Profile from '@/assets/profile_logo.jpg'
import { useUserData } from '@/hooks/useUserData'
import { usePlaylistData } from '@/hooks/usePlaylistData'
import { filterPlaylist, showplaylistProps } from '@/types/playlistType'
import useUserId from '@/hooks/useUserId'
import { getUserIdFromUID } from '@/api/profile/profileInfo'
import PlaylistThumbnails from '@/components/search/PlaylistThumbnails'

const ProfilePage = () => {
  const { userId } = useParams<{ userId?: string }>()
  const currentUser = useUserId()
  const userData = useUserData(userId)
  const playlistData = usePlaylistData(userId)
  const [isMyProfile, setIsMyProfile] = useState<boolean>(false)
  const [filter, setFilter] = useState<filterPlaylist>('all')

  const handleFilterChange = (newFilter: filterPlaylist) => {
    setFilter(newFilter)
  }

  const filteredMap = {
    all: () => true,
    public: (playlistData: showplaylistProps) => !playlistData.isPrivate,
    private: (playlistData: showplaylistProps) => playlistData.isPrivate,
  }

  const filteredLists = playlistData.filter((playlistData) => {
    return !isMyProfile && playlistData.isPrivate ? false : filteredMap[filter](playlistData)
  })

  const filterBtns = [
    {
      label: '전체',
      value: 'all' as filterPlaylist,
    },
    {
      label: '공개',
      value: 'public' as filterPlaylist,
    },
    {
      label: '비공개',
      value: 'private' as filterPlaylist,
    },
  ]

  const infoItems = [
    {
      label: '플리',
      value: userData.playlistLength,
    },
    {
      label: '팔로워',
      value: userData.playlistLength,
    },
    {
      label: '팔로잉',
      value: userData.playlistLength,
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser && userData.userId) {
        try {
          const currentUserId = await getUserIdFromUID(currentUser)
          if (currentUserId === userData.userId) {
            setIsMyProfile(true)
          }
        } catch (error) {
          console.error('Failed to fetch user ID:', error)
        }
      }
    }
    fetchData()
  }, [currentUser, userData.userId])

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
            {infoItems.map((item, index) => (
              <div key={index} className="info-item">
                <div className="info-value">{item.value}</div>
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className="user-bio">{userData.userBio}</div>
        {!isMyProfile && <Button size="small">팔로우</Button>}
      </div>
      <div className="divider" />
      <div className="section-playlist">
        <div className="text-playlist">플레이리스트</div>
        {isMyProfile && (
          <div className="section-btn">
            {filterBtns.map((btn) => (
              <Button
                key={btn.value}
                size="small"
                onClick={() => handleFilterChange(btn.value)}
                variant={btn.value === filter ? 'outline' : 'primary'}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        )}
      </div>
      {filteredLists.map((playlist, idx) => (
        <div className="title-playlist" key={idx}>
          <Link to={`/playlist/${playlist.playlistId}`}>
            <div className="title-thumbnail">
              <PlaylistThumbnails playlistId={playlist.playlistId || ''} />
            </div>
            <div className="title-video">
              {playlist.title}
              {playlist.isPrivate && <div className="tag-private">비공개</div>}
            </div>
          </Link>
        </div>
      ))}
      {userData.playlistLength > 5 && (
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

  .user-bio {
    font-size: ${fontSize.md};
    font-weight: ${fontWeight.semiBold};
  }

  .section-info,
  .section-head,
  .title-playlist,
  .section-playlist,
  .section-btn {
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
    width: 52px;
    height: 52px;

    .img-profile {
      border-radius: 50px;
    }
  }

  .section-info {
    gap: 50px;
    display: flex;
    padding: 0 10px;
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
    width: 230px;
    margin: 20px 0;
  }

  .section-playlist {
    padding: 20px 20px 0;
  }

  .title-playlist {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    height: 77px;
    padding: 20px;

    a {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }

    .tag-private {
      background-color: ${colors.lightPurPle};
      width: 54px;
      border-radius: 15px;
      text-align: center;
    }
  }

  .title-playlist:hover {
    background-color: ${colors.lightestGray};
  }

  .title-thumbnail {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title-video {
    width: 310px;
  }

  .text-playlist {
    font-size: ${fontSize.lg};
    margin-bottom: 20px;
  }
`
