export interface videoListProps {
  title: string
  thumbnail: string
  url: string
  channelTitle: string
  uploadDate?: string
  author?: string
  authorImg?: string
  tags?: string[]
  playlistTitle?: string
}

export interface showplaylistProps {
  playlistId: string
  title: string
  thumbnail: string
}
