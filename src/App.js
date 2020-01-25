import React, { useState, useCallback, useContext, useEffect } from 'react'
import PageOffsetContext, { withPageOffsetContext } from './context/PageOffset'
import usePrevious from './utils/usePrevious'
import Repo from './components/Repo'

const API_ENDPOINT = 'https://api.github.com/search/repositories'

const App = () => {
  const { y, height } = useContext(PageOffsetContext)
  const [params, setParams] = useState({ q: '', page: 1 })
  const prevInput = usePrevious(params.q)
  const [repos, setRepos] = useState([])
  const [complete, setComplete] = useState(false)

  const fetchData = () => {
    if(!params.q) {
      setRepos([])
      setComplete(false)
      return
    }
    fetch(`${API_ENDPOINT}?q=${params.q}&page=${params.page}`)
      .then(response => response.json())
      .then(json => {
        if(prevInput !== params.q){
          setRepos(json.items)
        } else {
          setRepos(repos.concat(json.items))
        }
        setComplete(json.complete)
      })
  }

  // search changed
  const onSearch = useCallback(e => setParams({ q: e.target.value, page: params.page }), [params])

  // when scrolling to page end, fetch more repos
  useEffect(() => {
    if (height - y < 100 && !complete) {
      setParams({ ...params, page: params.page + 1 })
    }
  }, [y, height, params, complete])

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
      </div>
    </div>
  )
}

export default withPageOffsetContext(App)
