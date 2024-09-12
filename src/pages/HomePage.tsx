import { useState, useEffect, useCallback } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import styled from '@emotion/styled'
import getPaginatedFollowingUsersPlaylists from '@/service/playlist/getPaginatedFollowingUsersPlaylists'
import UserInfo from '@/components/playlist/UserInfo'
import PlaylistThumbnailFeed from '@/components/playlist/PlaylistThumbnailFeed'
import LikeButton from '@/components/common/Button/LikeButton'
import { UserRoundPlus } from 'lucide-react'
import { colors } from '@/styles/colors'
import { fontSize, fontWeight } from '@/styles/font'
import { useNavigate } from 'react-router-dom'
import { FollowedPlaylist, FollowedUserPlaylists } from '@/types/playlistType'

const HomePage = () => {
  const navigate = useNavigate()
  const [allPlaylists, setAllPlaylists] = useState<FollowedPlaylist[]>([])
  const limit = 3

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['followingPlaylists', limit],
    queryFn: ({ pageParam = 0 }) =>
      getPaginatedFollowingUsersPlaylists({ startIndex: pageParam, limit }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === limit) {
        return allPages.length * limit
      } else {
        return undefined
      }
    },
    initialPageParam: 0,
  })

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const truncateText = (text: string | undefined, maxLength: number) => {
    if (!text) return ''
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    if (data?.pages) {
      const mergedPlaylists = data.pages
        .flatMap((page) =>
          page.flatMap((user: FollowedUserPlaylists) =>
            user.playlists.map((playlist: FollowedPlaylist) => ({
              ...playlist,
            }))
          )
        )
        .sort(
          (a: FollowedPlaylist, b: FollowedPlaylist) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

      setAllPlaylists(mergedPlaylists)
    }
  }, [data])

  return (
    <Container>
      {isLoading ? (
        <div>Loading...</div>
      ) : allPlaylists.length > 0 ? (
        <ul>
          {allPlaylists.map(
            ({ playlistId, authorId, authorName, authorImg, title, createdAt, thumbnails }) => (
              <li key={`${playlistId}-${authorId}`} className="playlist-container">
                <UserInfo
                  authorName={authorName}
                  authorImg={authorImg}
                  createdAt={createdAt}
                  className="user-info-container"
                  onClick={() => navigate(`/profile/${authorId}`)}
                />
                <div
                  onClick={() => navigate(`/playlist/${playlistId}`)}
                  className="playlist-detail-container"
                >
                  <h3 className="playlist-title">{truncateText(title, 60)}</h3>
                  <PlaylistThumbnailFeed thumbnails={thumbnails} />
                </div>
                <LikeButton playlistId={playlistId || ''} />
              </li>
            )
          )}
        </ul>
      ) : (
        <div className="no-following-container">
          <UserRoundPlus size={90} strokeWidth={1} />
          <p className="no-following-title">아직 팔로우한 사용자가 없습니다.</p>
          <div className="no-following-text">
            마음에 드는 사용자를 팔로우하고 <br /> 플레이리스트를 확인해보세요!
          </div>
        </div>
      )}
      {isFetchingNextPage && <div>Loading more...</div>}
    </Container>
  )
}

export default HomePage

const Container = styled.div`
  .playlist-container {
    padding: 20px;
    border-bottom: 6px solid ${colors.lightestGray};
    cursor: pointer;
  }

  .user-info-container {
    margin-bottom: 12px;
  }

  .playlist-title {
    margin-bottom: 4px;
  }

  .playlist-detail-container {
    margin-bottom: 8px;
  }

  .no-following-container {
    margin-top: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    color: ${colors.gray};

    .no-following-title {
      margin-top: 20px;
      font-size: ${fontSize.lg};
      font-weight: ${fontWeight.bold};
    }

    .no-following-text {
      margin-top: 10px;
    }
  }
`
