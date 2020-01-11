import { useEffect } from 'react'
import { useRouter } from 'next/router'


const Index = ({ user }) => {
  const router = useRouter()

  useEffect(() => {
      router.push('/form')
  }, [])

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
    </div>
  )
}



export default Index
