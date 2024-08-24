import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <h2>
        <Outlet />
      </h2>
    </div>
  )
}

export default Home
