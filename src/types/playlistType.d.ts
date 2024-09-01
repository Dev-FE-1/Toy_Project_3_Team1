export interface showplaylistProps {
  playlistId?: string
  isPrivate?: boolean
  title: string
  thumbnail: string
}

export interface videoListProps extends showplaylistProps {
  url: string
  channelTitle: string
  uploadDate?: string
  author?: string
  authorImg?: string
  tags?: string[]
  playlistTitle?: string
  likes?: number
}

export type filterPlaylist = 'all' | 'public' | 'private'
