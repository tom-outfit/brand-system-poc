import { getApi } from 'prismic-javascript'

export default slug =>
  getApi('https://brand-system.cdn.prismic.io/api/v2')
    .then(api => api.query(''))
    .then(response => response.results.filter(doc => doc.uid === slug)[0])
    .catch(err => Promise.reject(err))
