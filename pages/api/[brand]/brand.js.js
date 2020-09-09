import brandCss from './brand.css'

import fetchBrand from '../../../lib/fetchBrand'
import generateJS from '../../../lib/generateJS'

export default (req, res) => {
  return fetchBrand(req.query.brand)
    .then(brand => brand.data)
    .then(brand => generateJS(brand))
    .then(js => {
      res.statusCode = 200
      res.send(js)
    })
}
