import { css } from '@emotion/react'
import './App.css'

function App() {
  const papagraphStyles = css`
    font-weight: bold;
    font-size: 64px;
    text-decoration: underline;
  `
  return (
    <>
      <p css={papagraphStyles}>Don't be late!!</p>
    </>
  )
}

export default App
