export interface showplaylistProps {
  playlistId: string
  title: string
  thumbnail: string
  isPrivate: boolean
  createdAt: string
}

export interface videoListProps extends showplaylistProps {
  channelTitle: string
  id?: Key | null | undefined
  url: string
  uploadDate?: string
  author?: string
  authorImg?: string
  tags?: string[]
  playlistTitle?: string
  likes?: number
}

export type filterPlaylist = 'all' | 'public' | 'private'
