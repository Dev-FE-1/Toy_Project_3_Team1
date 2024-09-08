import styled from '@emotion/styled'
import NPProfile from '@/assets/np_logo.svg'

type AvatarSize = 'small' | 'large'

interface AvatarProps {
  src?: string
  size?: AvatarSize
}

const Avatar = ({ src, size = 'small' }: AvatarProps) => {
  return (
    <AvatarComponent size={size}>
      <img src={src || NPProfile} alt="프로필 이미지" />
    </AvatarComponent>
  )
}

export default Avatar

const sizeStyles = {
  small: '34px',
  large: '52px',
}

const AvatarComponent = styled.div<{ size: AvatarSize }>`
  width: ${({ size }) => sizeStyles[size]};
  height: ${({ size }) => sizeStyles[size]};
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
