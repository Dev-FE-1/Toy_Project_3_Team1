import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PATH } from '@/constants/path'
import profile from '@/assets/profile_logo.png'
import { userInfo } from '@/api/profile/profileInfo'
import { getPlayList } from '@/api/playlist/getPlayList'
import { fontSize } from '@/constants/font'
import { auth } from '@/firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { showplaylistProps } from '@/types/playlistType'

const ProfilePage = () => {
  const { userId } = useParams()
  const [isMyProfile, setIsMyProfile] = useState(false)
  const [userData, setUserData] = useState({
    userName: '',
    userId: '',
    userEmail: '',
    userBio: '',
    followerLength: 0,
    followingLength: 0,
    playlistLength: 0,
  })
  const [playlistData, setPlayListData] = useState<showplaylistProps[]>([])

  const handleAllLists = () => {}

  //const handlePublicLists = () => {}

  //const handlePrivateLists = () => {}

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await userInfo()
      if (data) {
        setUserData({
          userName: data?.userName || '사용자',
          userId: data?.userId || 'Unknown',
          userEmail: data?.userEmail || 'Unknown',
          userBio: data?.userBio || '안녕하세요.',
          followerLength: data?.followerLength || 0,
          followingLength: data?.followingLength || 0,
          playlistLength: data?.playlistLength || 0,
        })
        setIsMyProfile(!userId || userId === data?.userId)
      }
    }

    const fetchPlayListData = async () => {
      const data = await getPlayList()
      if (data) {
        setPlayListData(data)
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData()
        fetchPlayListData()
      }
    })
    return () => unsubscribe()
  }, [userId])

  return (
    <Container>
      <Link to={PATH.EDITPROFILE}>
        {userData.userId}
        {isMyProfile && <button className="btn-editprofile">설정</button>}
      </Link>
      <div className="profile">
        <div className="section-img">
          <img className="img-profile" src={profile} alt="이미지" />
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
      {!isMyProfile && <button className="btn-follow">팔로우</button>}
      <hr />
      <div className="section-playlist">
        <div className="text-playlist">플레이리스트</div>
        {isMyProfile && (
          <div className="section-btn">
            <button className="btn-all" onClick={handleAllLists}>
              전체
            </button>
            <button className="btn-public">공개</button>
            <button className="btn-private">비공개</button>
          </div>
        )}
        {playlistData.map((playlist, idx) => (
          <div className="title-playlist" key={idx}>
            <div className="title-thumbnail">
              <Link to={`/playlist/${playlist.playlistId}`}>
                <img src={playlist.thumbnail} alt={playlist.title} />
              </Link>
            </div>
            <div className="title-video">{playlist.title}</div>
          </div>
        ))}
      </div>
      {!isMyProfile && (
        <Link to={PATH.HOME}>
          <button className="btn-editprofile">플레이리스트 모두 보기</button>
        </Link>
      )}
    </Container>
  )
}

export default ProfilePage

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .btn-editprofile {
    margin-left: 355px;
  }
  .profile {
    display: flex;
    justify-content: space-between;
    text-align: center;
    height: 52px;
    margin-bottom: 10px;
  }

  .section-img {
    display: flex;
    width: 52px;
    height: 52px;
  }

  .section-info {
    gap: 60px;
    display: flex;
  }

  .section-btn {
    display: flex;
    gap: 10px;
    margin: 10px 0;
  }

  .title-playlist {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
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
    margin: 10px 0px;
    font-size: ${fontSize.lg};
  }
`
