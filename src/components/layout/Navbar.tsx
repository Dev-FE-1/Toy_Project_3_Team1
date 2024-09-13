import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import { PATH } from '@/constants/path'
import { CircleUserRound, House, MessageCircleMore, Search, SquarePlus } from 'lucide-react'
import { colors } from '@/styles/colors'
import { useState, useEffect } from 'react'
import { getLoggedInUserUID, getUserIdFromUID } from '@/utils/userDataUtils'

interface IconLinks {
  path: string
  icon: JSX.Element
}

const Navbar = () => {
  const uid = getLoggedInUserUID()
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserId = async () => {
      if (uid) {
        try {
          const id = await getUserIdFromUID(uid)
          setUserId(id)
        } catch (error) {
          console.error('Failed to fetch user ID:', error)
        }
      }
    }
    fetchUserId()
  }, [uid, userId])

  const menu: Array<IconLinks> = [
    { path: PATH.HOME, icon: <House /> },
    { path: PATH.SEARCH, icon: <Search /> },
    { path: PATH.CREATEPLAYLIST, icon: <SquarePlus /> },
    { path: PATH.CHAT, icon: <MessageCircleMore /> },
    { path: `profile/${userId}`, icon: <CircleUserRound /> },
  ]

  return (
    <StyledMenuContainer>
      {menu.map(({ path, icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
        >
          {icon}
        </NavLink>
      ))}
    </StyledMenuContainer>
  )
}

export default Navbar

const StyledMenuContainer = styled.nav`
  z-index: 99;
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
  background-color: ${colors.white};

  .nav-link-active,
  .nav-link {
    padding-bottom: 5px;
    width: calc(100% / 5);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid ${colors.red}; */
  }

  .nav-link {
    color: ${colors.gray};
  }
`

// const StyledMenuItem = styled.div`
//   width: calc(100% / 5);
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: lime;

//   .nav-link-active,
//   .nav-link {
//     width: calc(100% / 5);
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     background-color: ${colors.red};
//   }

//   .nav-link {
//     color: ${colors.gray};
//   }
// `
