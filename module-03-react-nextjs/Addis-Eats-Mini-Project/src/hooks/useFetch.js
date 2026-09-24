import { useEffect, useState } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function load() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Bad response')
        }
        const result = await response.json()
        if (!ignore) setData(result)
      } catch (err) {
        if (!ignore) setError('Sorry, could not load the data.')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    load()

    return () => {
      ignore = true
    }
  }, [url])

  return { data, isLoading, error }
}

export default useFetch