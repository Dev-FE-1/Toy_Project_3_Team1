import { PATH } from '@/constants/path'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CreatePlaylistPage from '@/pages/CreatePlaylistPage'
import EditProfilePage from '@/pages/EditProfilePage'
import FollowPage from '@/pages/FollowPage'
import LoginPage from '@/pages/LoginPage'
import Page404 from '@/pages/Page404'
import PlaylistPage from '@/pages/PlaylistPage'
import ProfilePage from '@/pages/ProfilePage'
import SearchPage from '@/pages/SearchPage'
import RootLayout from '@/layout/Root'
import ChatPage from '@/pages/ChatPage'
import HomePage from '@/pages/HomePage'

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <RootLayout />,
    errorElement: <Page404 />,
    children: [
      { index: true, element: <HomePage /> },
      { path: PATH.LOGIN, element: <LoginPage /> },
      { path: PATH.SEARCH, element: <SearchPage /> },
      { path: PATH.PLAYLIST, element: <PlaylistPage /> },
      { path: PATH.CREATEPLAYLIST, element: <CreatePlaylistPage /> },
      {
        path: PATH.PROFILE,
        element: <ProfilePage />,
        children: [
          { path: PATH.EDITPROFILE, element: <EditProfilePage /> },
          { path: PATH.FOLLOW, element: <FollowPage /> },
        ],
      },
      { path: PATH.CHAT, element: <ChatPage /> },
    ],
  },
])

const App = () => <RouterProvider router={router} />

export default App
