import styled from '@emotion/styled'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { fontSize, fontWeight } from '@/constants/font'
import Button from '@/components/common/Button/Button'
import { colors } from '@/constants/color'
import Profile from '@/assets/profile_logo.jpg'
import { useUserData } from '@/hooks/useUserData'
import { usePlaylistData } from '@/hooks/usePlaylistData'
import { filterPlaylist, showplaylistProps } from '@/types/playlistType'
import MusicItem from '@/components/playlist/MusicItem'
import { getLoggedInUserUID } from '@/utils/userDataUtils'
import { useFollowButton } from '@/hooks/useFollowStatus'
import useIsMyProfile from '@/hooks/useIsMyProfile'

const ProfilePage = () => {
  const { userId } = useParams<{ userId?: string }>()
  const currentUser = getLoggedInUserUID()
  const userData = useUserData(userId)
  const playlistData = usePlaylistData(userId)
  const isMyProfile = useIsMyProfile(userId)
  const [filter, setFilter] = useState<filterPlaylist>('all')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { isFollowing, toggleFollow, followerCount } = useFollowButton(
    userData.userId,
    currentUser || ''
  )

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
      value: followerCount,
    },
    {
      label: '팔로잉',
      value: userData.followingLength,
    },
  ]

  const displayedLists = isOpen ? filteredLists : filteredLists.slice(0, 4)

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <Container>
      <div className="section-head">{!isMyProfile && userData.userId}</div>
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
        {!isMyProfile && (
          <Button size="small" onClick={toggleFollow} variant={isFollowing ? 'outline' : 'primary'}>
            {isFollowing ? '팔로잉' : '팔로우'}
          </Button>
        )}
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
      <MusicItem videoList={displayedLists} variant="profilePL" />
      {filteredLists.length > 4 && !isOpen && (
        <Button variant="text" onClick={handleToggleOpen}>
          플레이리스트 모두 보기
        </Button>
      )}
      {isOpen && (
        <Button variant="text" onClick={handleToggleOpen}>
          플레이리스트 모두 접기
        </Button>
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
    font-size: ${fontSize.lg};
    font-weight: ${fontWeight.bold};
  }

  .section-userinfo {
    padding: 10px 20px 20px 20px;
  }

  .user-bio,
  .title-playlist {
    font-size: ${fontSize.md};
    font-weight: ${fontWeight.semiBold};
  }
  .section-info,
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
    width: 100%;
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
`
