import { PATH } from '@/constants/path'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'

import CreatePlaylistPage from '@/pages/CreatePlaylistPage'
import FollowPage from '@/pages/FollowPage'
import LoginPage from '@/pages/LoginPage'
import Page404 from '@/pages/Page404'
import PlaylistPage from '@/pages/PlaylistPage'
import ProfilePage from '@/pages/ProfilePage'
import SearchPage from '@/pages/SearchPage'
import RootLayout from '@/layout/Root'
import ChatPage from '@/pages/ChatPage'
import HomePage from '@/pages/HomePage'
import EditPwPage from '@/pages/EditPwPage'
import SignUpPage from '@/pages/SignUpPage'
import checkAuth from '@/service/auth/checkAuth'

const PrivateRoute = () => {
  return checkAuth() ? <Outlet /> : <Navigate to={PATH.LOGIN} replace />
}

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <RootLayout />,
    errorElement: <Page404 />,
    children: [
      {
        path: PATH.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PATH.SIGNUP,
        element: <SignUpPage />,
      },

      { path: PATH.EDITPW, element: <EditPwPage /> },
      {
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          { path: PATH.PLAYLIST, element: <PlaylistPage /> },
          { path: PATH.USER_PROFILE, element: <ProfilePage /> },
          { path: PATH.CREATEPLAYLIST, element: <CreatePlaylistPage /> },
          { path: PATH.FOLLOW, element: <FollowPage /> },
          { path: PATH.CHAT, element: <ChatPage /> },
          {
            path: PATH.SEARCH,
            element: <SearchPage />,
          },
        ],
      },
    ],
  },
])

const App = () => <RouterProvider router={router} />

export default App
