import ReactGA from 'react-ga'

const options = {}

const trackPage = (page) => {
  ReactGA.set({
    page,
    ...options
  })
  ReactGA.pageview(page)
}

let currentPage = ''

const googleAnalytics = store => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const nextPage = `${action.payload.pathname}${action.payload.search}`

    if (currentPage !== nextPage) {
      currentPage = nextPage
      trackPage(nextPage)
    }
  }

  return next(action)
}

export default googleAnalytics;
