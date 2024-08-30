export interface CommentType {
  id: string
  comment: string
  createdAt: number
  userRef: string
  userName: string
  userImg: string
  nextCursor?: undefined
}
