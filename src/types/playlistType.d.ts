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

export interface showplaylistProps {
  playlistId: string
  title: string
  thumbnail: string
  isPrivate: boolean
  createdAt: string
}

export interface videoListProps extends showplaylistProps, ExtendedVideoProps {}

export type filterPlaylist = 'all' | 'public' | 'private'
