import { useQuery } from '@tanstack/react-query'
import { getEpisode } from '../hooks/useFetch'
import Loading from './UI/Loading'
import Error from './UI/Error'
import { useParams } from 'react-router-dom'

function Episode() {
  let { id } = useParams()
  const { isLoading, data, isError, error, isFetched } = useQuery(
    ['episode', id], () => getEpisode(id))
  return (
    <>
      {
        isLoading && <Loading />        
      }
      {
        isError && <Error error={error} />
      }
      {
        isFetched &&
        <div className="episodes">
          <div className="episode">
            <div className="episode__name">
              {data.name} - {data.episode}
            </div>
            <div className="episode__airdate">
              {data.air_date}
            </div>
          </div>
        </div>
      }
    </>
  )
} 

export default Episode