export type filterPlaylist = 'all' | 'public' | 'private'
export interface BasicVideoProps {
  title: string
  channelTitle: string
  url: string
  thumbnail: string
}

export interface ExtendedVideoProps extends BasicVideoProps {
  author: string
  authorImg?: string
  uploadDate: string
  tags: string[]
  playlistTitle?: string
  likes?: number
}

export interface PlaylistBaseProps {
  playlistId: string
  title: string
  thumbnail: string[]
  isPrivate: boolean
  createdAt: string
}

export interface videoListProps extends PlaylistBaseProps, ExtendedVideoProps {}

export interface FollowedPlaylist extends PlaylistBaseProps {
  thumbnails: string[]
  authorName: string
  authorImg?: string
  authorId?: string
}

export interface FollowedUserPlaylists {
  playlists: Playlist[]
}
