import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CreatePlaylist from './pages/CreatePlaylist'
import EditProfile from './pages/EditProfile'
import Fallow from './pages/Fallow'
import Login from './pages/Login'
import Main from './pages/Main'
import Page404 from './pages/Page404'
import Playlist from './pages/Playlist'
import Profile from './pages/Profile'
import Search from './pages/Search'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Page404 />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/main', element: <Main /> },
      { path: '/search', element: <Search /> },
      {
        path: '/playlist',
        element: <Playlist />,
        children: [
          {
            path: '/createplaylist',
            element: <CreatePlaylist />,
          },
        ],
      },
      { path: '/profile', element: <Profile /> },
      { path: '/fallow', element: <Fallow /> },
      { path: '/edit-profile', element: <EditProfile /> },
    ],
  },
])

const App = () => <RouterProvider router={router} />

export default App
