import { PATH } from './layout/path'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CreatePlaylist from './pages/CreatePlaylist'
import EditProfile from './pages/EditProfile'
import Follow from './pages/Follow'
import Login from './pages/Login'
import Page404 from './pages/Page404'
import Playlist from './pages/Playlist'
import Profile from './pages/Profile'
import Search from './pages/Search'
import RootLayout from './layout/Root'
import Chat from './pages/Chat'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <RootLayout />,
    errorElement: <Page404 />,
    children: [
      { index: true, element: <Home /> },
      { path: PATH.LOGIN, element: <Login /> },
      { path: PATH.SEARCH, element: <Search /> },
      { path: PATH.PLAYLIST, element: <Playlist /> },
      { path: PATH.CREATEPLAYLIST, element: <CreatePlaylist /> },
      {
        path: PATH.PROFILE,
        element: <Profile />,
        children: [
          { path: PATH.EDITPROFILE, element: <EditProfile /> },
          { path: PATH.FOLLOW, element: <Follow /> },
        ],
      },
      { path: PATH.CHAT, element: <Chat /> },
    ],
  },
])

const App = () => <RouterProvider router={router} />

export default App
