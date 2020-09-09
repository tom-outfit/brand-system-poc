export default brand =>
  brand.custom_styles
    ? `/* Custom styles */

${brand.custom_styles}
`
    : ''
