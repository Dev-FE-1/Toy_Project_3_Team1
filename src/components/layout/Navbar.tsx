import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../layout/path'

const Navbar = () => {
  const menu = [
    { path: PATH.HOME, title: 'HOME' },
    { path: PATH.SEARCH, title: 'SEARCH' },
    { path: PATH.CREATEPLAYLIST, title: 'CREATE PLAYLIST' },
    { path: PATH.CHAT, title: 'CHAT' },
    { path: PATH.PROFILE, title: 'PROFILE' },
  ]

  return (
    <nav>
      <StyledMenuContainer>
        {menu.map(({ path, title }) => (
          <StyledMenuItem key={title}>
            <NavLink to={path}>{title}</NavLink>
          </StyledMenuItem>
        ))}
      </StyledMenuContainer>
    </nav>
  )
}

export default Navbar

const StyledMenuContainer = styled.div`
  display: flex;
  margin-top: 20px;
  border: 1px solid black;
`

const StyledMenuItem = styled.div`
  margin: 15px;
`
