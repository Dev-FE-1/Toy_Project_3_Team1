import { Outlet } from 'react-router-dom'

const RootLayout = () => (
  <>
    <main>
      <Outlet />
    </main>
  </>
)

export default RootLayout
