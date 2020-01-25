
import React, { useState, useEffect, useCallback } from 'react'
import throttle from 'lodash.throttle'

const PageOffsetContext = React.createContext({})


const withPageOffsetContext = Component => (props) => {
  const [pageOffset, setPageOffset] = useState({})

  const onScrollHandler = useCallback(throttle(() =>
    setPageOffset({
      y: window.scrollY + window.innerHeight,
      height: document.body.offsetHeight
    }), 1000), [])

  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler)
    return () => window.removeEventListener('scroll', onScrollHandler)
  }, [onScrollHandler])
  return (
    <PageOffsetContext.Provider value={pageOffset}>
      <Component {...props} />
    </PageOffsetContext.Provider>
  )
}

export default PageOffsetContext
export { withPageOffsetContext }
