import { useQuery } from '@tanstack/react-query'
import { getLocation } from '../hooks/useFetch'
import Loading from './UI/Loading'
import Error from './UI/Error'
import { useParams } from 'react-router-dom'

function Location() {
  let { id } = useParams()
  const { isLoading, data, isError, error, isFetched } = useQuery(
    ['location', id], () => getLocation(id))
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
        <div className="locations">
          <div className="location">
            <div className="location__name">
              {data.name} - {data.type}
            </div>
            <div className="location__dimension">
              {data.dimension}
            </div>
          </div>
        </div>
      }
    </>
  )
} 

export default Location