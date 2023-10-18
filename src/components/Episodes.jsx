import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getEpisodes } from '../hooks/useFetch'
import Loading from './UI/Loading'
import Error from './UI/Error'

function Episodes() {
  const { isLoading, data, isError, error, isFetched } = useQuery({
    queryKey: ['eps'],
    queryFn: getEpisodes
  })
  let info 
  let results
  if (isFetched) {
    info = {...data.info}
    results = [...data.results]
  }
  return (
    <>
      {
        isLoading && <Loading />        
      }
      {
        isError && <Error error={error} />
      }
      <div className="episodes">
        {
          isFetched &&
          results.map(result => (
            <Link to={`${result.id}`} className='episode' key={result.id}>
              <div className="episode__name">
                {result.name} - <span>{result.episode}</span>
              </div>
            </Link>
          ))
        }
      </div>
    </>
  )
}

export default Episodes