import fetchBrand from '../../../lib/fetchBrand'
import generateCSS from '../../../lib/generateCSS'

export default (req, res) => {
  return fetchBrand(req.query.brand)
    .then(brand => brand.data)
    .then(brand => generateCSS(brand))
    .then(css => {
      res.statusCode = 200
      res.send(css)
    })
}
