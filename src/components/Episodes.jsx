import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getEpisodes } from '../hooks/useFetch'
import Loading from './UI/Loading'
import Error from './UI/Error'
import { useLayoutEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { gsap } from 'gsap'

function Episodes() {
  const [currentPage, setCurrentPage] = useState(1)
  const { status, data, error, isFetched } = useQuery({
    queryKey: ['eps'],
    queryFn: getEpisodes
  })
  let info 
  let results
  if (isFetched) {
    info = {...data.info}
    results = [...data.results]
    console.log(info)
  }

  const episodesRef = useRef(null)
  const ctx = useRef(null)

  useLayoutEffect(() => {
    if (status === 'success') {
      ctx.current = gsap.context(() => {
        const episodes = gsap.utils.toArray('.episode')
        episodes.map((episode, i) => {
          gsap.fromTo(
            episode,
            {
              opacity: 0,
              y: 7
            },
            {
              opacity: 1,
              y: 0,
              delay: .01 + (i / 10)
            }
          )
        })
      }, episodesRef)
      return () => ctx.current.revert()
    }
  }, [status])

  const prevPage = (e) => {
    e.preventDefault()
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const nextPage = (e) => {
    e.preventDefault()
    setCurrentPage(currentPage + 1)
  }
  return (
    <>
      {
        status === 'loading' && <Loading />
      }
      {
        status === 'error' && <Error error={error} />
      }
      <div className="episodes" ref={episodesRef}>
        {
          status === 'success' &&
          results.map(result => (
            <Link to={`${result.id}`} className='episode' key={result.id}>
              <div className="episode__name">
                {result.name} - <span>{result.episode}</span>
              </div>
            </Link>
          ))
        }
      </div>
      {
        status === 'success' &&
        <div className="pagination">
          <ul>
            <li>
              <button 
                type="button"
                disabled={currentPage == 1 ? 'disabled' : ''}
                onClick={prevPage}
              >
                <FaAngleLeft />
              </button>
            </li>
            <li>
              <button 
                type="button"
                disabled={currentPage == info.count ? 'disabled' : ''}
                onClick={nextPage}
              >
                <FaAngleRight />
              </button>
            </li>
          </ul>
        </div>
      }
    </>
  )
}

export default Episodes