import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PATH } from '@/constants/path'
import profile from '@/assets/profile_logo.png'
import { userInfo } from '@/api/profile/profileInfo'
import { getPlayList, showplaylistProps } from '@/api/playlist/getPlayList'

const ProfilePage = () => {
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
      setUserData({
        userName: data?.userName,
        userId: data?.userId,
        userEmail: data?.userEmail,
        userBio: data?.userBio,
        followerLength: data?.followerLength || 0,
        followingLength: data?.followingLength || 0,
        playlistLength: data?.playlistLength || 0,
      })
    }
    fetchUserData()
  }, [])

  useEffect(() => {
    const fetchPlayListData = async () => {
      const data = await getPlayList()
      if (data) {
        setPlayListData(data)
      }
    }
    fetchPlayListData()
  }, [])

  return (
    <Container>
      <Link to={PATH.EDITPROFILE}>
        <button className="btn-editprofile">설정</button>
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
      <hr />
      <div className="section-playlist">
        <div className="section-btn">
          <button className="btn-all" onClick={handleAllLists}>
            전체
          </button>
          <button className="btn-public">공개</button>
          <button className="btn-private">비공개</button>
        </div>
        {playlistData.map((playlist, idx) => (
          <div className="title-playlist" key={idx}>
            <div className="title-thumbnail">
              <img src={playlist.thumbnail} alt={playlist.title} />
            </div>
            <div className="title-video">{playlist.title}</div>
          </div>
        ))}
      </div>
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
`
