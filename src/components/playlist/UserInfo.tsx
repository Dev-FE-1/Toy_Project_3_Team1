import React from 'react'
import styled from '@emotion/styled'
import Avatar from '@/components/common/Avatar'
import { fontSize, fontWeight } from '@/constants/font'
import NPProfile from '@/assets/np_logo.svg'

interface UserInfoProps {
  className?: string
  authorName?: string
  createdAt?: string
  authorImg?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const UserInfo: React.FC<UserInfoProps> = ({
  className,
  authorName,
  createdAt = 'Unknown Date',
  authorImg,
  onClick,
}) => {
  return (
    <UserInfoComponent className={className} onClick={onClick}>
      <Avatar src={authorImg} />
      <div className="user-container">
        <p className="user-name-text">{authorName || NPProfile}</p>
        <span className="user-posting-date">{createdAt}</span>
      </div>
    </UserInfoComponent>
  )
}

export default UserInfo

const UserInfoComponent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .user-container {
    line-height: 1;

    .user-name-text {
      font-size: ${fontSize.sm};
      font-weight: ${fontWeight.bold};
    }

    .user-posting-date {
      font-size: ${fontSize.xs};
    }
  }
`
