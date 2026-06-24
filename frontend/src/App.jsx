import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:5000/api/hello')
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="container">
        <h1>🚀 Full Stack App</h1>
        
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Count: {count}
          </button>
        </div>

        <div className="card">
          <h2>Backend Data</h2>
          {loading ? (
            <p>Loading...</p>
          ) : data ? (
            <p>{data.message}</p>
          ) : (
            <p>No data</p>
          )}
          <button onClick={fetchData}>Refresh Data</button>
        </div>
      </div>
    </>
  )
}

export default App
