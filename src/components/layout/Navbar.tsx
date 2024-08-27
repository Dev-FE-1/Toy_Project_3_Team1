import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import { PATH } from '@/constants/path'
import { CircleUserRound, House, MessageCircleMore, Search, SquarePlus } from 'lucide-react'
import { colors } from '@/constants/color'

interface IconLinks {
  path: string
  icon: JSX.Element
}

const Navbar = () => {
  const menu: Array<IconLinks> = [
    { path: PATH.HOME, icon: <House /> },
    { path: PATH.SEARCH, icon: <Search /> },
    { path: PATH.CREATEPLAYLIST, icon: <SquarePlus /> },
    { path: PATH.CHAT, icon: <MessageCircleMore /> },
    { path: PATH.PROFILE, icon: <CircleUserRound /> },
  ]

  return (
    <nav>
      <StyledMenuContainer>
        {menu.map(({ path, icon }) => (
          <StyledMenuItem key={path}>
            <NavLink
              to={path}
              className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
            >
              {icon}
            </NavLink>
          </StyledMenuItem>
        ))}
      </StyledMenuContainer>
    </nav>
  )
}

export default Navbar

const StyledMenuContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  height: 52px;
  border-top: 1px solid ${colors.gray};
`

const StyledMenuItem = styled.div`
  padding: 10px 20px;
  .nav-link {
    color: ${colors.gray};
  }
`
