import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/auth/login');
  })

  return (
    <></>
  )
}

export default Home