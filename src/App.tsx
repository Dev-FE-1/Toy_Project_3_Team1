import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CreatePlaylist from './pages/CreatePlaylist'
import EditProfile from './pages/EditProfile'
import Follow from './pages/Follow'
import Login from './pages/Login'
import Home from './pages/Home'
import Page404 from './pages/Page404'
import Playlist from './pages/Playlist'
import Profile from './pages/Profile'
import Search from './pages/Search'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Page404 />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/search', element: <Search /> },
      { path: '/playlist', element: <Playlist /> },
      { path: '/createplaylist', element: <CreatePlaylist /> },
      {
        path: '/profile',
        element: <Profile />,
        children: [
          { path: 'editprofile', element: <EditProfile /> },
          { path: 'follow', element: <Follow /> },
        ],
      },
    ],
  },
])

const App = () => <RouterProvider router={router} />

export default App
