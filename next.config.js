module.exports = {
  async headers() {
    return [
      {
        source: '/api/:brand/brand.css',
        headers: [
          {
            key: 'content-type',
            value: 'text/css'
          }
        ]
      },
      {
        source: '/api/:brand/brand.js',
        headers: [
          {
            key: 'content-type',
            value: 'application/javascript'
          }
        ]
      }
    ]
  }
}
