import React, { useState, useCallback, useContext, useEffect, useRef } from 'react'
import PageOffsetContext, { withPageOffsetContext } from './context/PageOffset'
import usePrevious from './utils/usePrevious'
import Repo from './components/Repo'

const API_ENDPOINT = 'https://api.github.com/search/repositories'

const App = () => {
  const { y, height, forceUpdateOffset } = useContext(PageOffsetContext)
  const [params, setParams] = useState({ q: '', page: 1 })
  const prevInput = usePrevious(params.q)
  const [repos, setRepos] = useState([])
  const [complete, setComplete] = useState(true)
  const [status, setStatus] = useState('IDLE')
  const abortController = useRef(new AbortController())

  const fetchData = () => {
    if(!params.q) {
      setRepos([])
      setComplete(true)
      setStatus('IDLE')
      return
    }
    setStatus('FETCH_START')
    // if user is typing, cancel previous requests
    if (prevInput !== params.q) {
      setRepos([])
      abortController.current.abort()
      abortController.current = new AbortController()
    }
    fetch(`${API_ENDPOINT}?q=${params.q}&page=${params.page}`, { signal: abortController.current.signal })
      .then(response => response.json())
      .then(json => {
        if(prevInput !== params.q){
          setRepos(json.items || [])
        } else {
          setRepos(repos.concat(json.items || []))
        }
        setComplete(!json.items.length)
        setStatus('FETCH_COMPLETE')
        forceUpdateOffset()
      })
      .catch(err => {
        if (err.name !== 'AbortError') setStatus('FETCH_ERROR')
      })
  }

  // search changed
  const onSearch = useCallback(e => setParams({ q: e.target.value, page: params.page }), [params])

  // when scrolling to page end, fetch more repos
  useEffect(() => {
    if (height - y < 300 && !complete && status !== 'FETCH_START') {
      setParams({ ...params, page: params.page + 1 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [y, height, complete])

  // whenever params changed, fetch data
  useEffect(fetchData, [params])

  return (
    <div className="container">
      <div className="p-4 row justify-content-center">
        <div className="input-group col-12 col-md-6">
          <input
            className="form-control"
            placeholder="Search Repo..."
            type="text"
            value={params.q}
            onChange={onSearch}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-primary" type="button">
              <i className="fa fa-search px-2" />
            </button>
          </div>
        </div>
      </div>
      <div className="search-result p-2 p-md-5">
        {
          repos.map(repo => <Repo key={repo.id} {...repo} />)
        }
        {
          status === 'FETCH_START' && (
            <div className="text-center">
              <i className="fas fa-spinner fa-pulse" />
            </div>
          )
        }
        {
          status === 'FETCH_ERROR' && (
            <div className="text-center">
              <h5>Oops, something went wrong!</h5>
              <span>Try again in few minutes. { '🙃' }</span>
            </div>
          )
        }
        {
          status === 'FETCH_COMPLETE' && complete && !repos.length && (
            <div className="text-center">
              <h5>Nothing found.</h5>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default withPageOffsetContext(App)
