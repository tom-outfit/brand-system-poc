import kebabCase from 'lodash.kebabcase'

export default ({
  colors,
  palettes
}) => `/* ------------------------ Colours ------------------------- */

:root {
${generateColorVariables(colors)}
}

${generateColorClassNames(colors)}

/* Palettes */

${generatePalettes(palettes)}

${generateDefaults(palettes)}
`

const generateColorVariables = colors =>
  `${colors
    .map(color => `  --color-${kebabCase(color.name)}: ${color.hex};`)
    .join('\n')}`

const generatePalettes = palettes =>
  palettes
    .map(
      palette => `/* ${palette.name} */
:root {
${palette.color_names
  .split(', ')
  .map(
    (name, i) =>
      `  --color-${kebabCase(palette.name)}-${kebabCase(
        name
      )}: var(--color-${kebabCase(palette.color_variables.split(', ')[i])});`
  )
  .join('\n')}
}
${palette.color_names
  .split(', ')
  .map((name, i) => {
    const selector = `${kebabCase(palette.name)}-${kebabCase(name)}`
    return `.color-${selector} { color: var(--color-${selector}); }
.bg-${selector} { background-color: var(--color-${selector}); }`
  })
  .join('\n')}`
    )
    .join('\n\n')

const generateDefaults = palettes =>
  palettes
    .map(
      palette => `/* ${palette.name} */
[data-palette="${kebabCase(palette.name)}"] body {
${palette.color_names
  .split(', ')
  .map(
    (name, i) =>
      `  --color-${kebabCase(name)}: var(--color-${kebabCase(
        palette.name
      )}-${kebabCase(name)});`
  )
  .join('\n')}
}
${palette.color_names
  .split(', ')
  .map(
    (name, i) =>
      `[data-palette="${kebabCase(palette.name)}"] .color-${kebabCase(
        name
      )} { color: var(--color-${kebabCase(name)}); }
[data-palette="${kebabCase(palette.name)}"] .bg-${kebabCase(
        name
      )} { background-color: var(--color-${kebabCase(name)}); }`
  )
  .join('\n')}`
    )
    .join('\n\n')

const generateColorClassNames = colors => `/* Atomic colour classes */

${colors
  .map(
    color => `.color-${kebabCase(color.name)} { color: var(--color-${kebabCase(
      color.name
    )}); }
.bg-${kebabCase(color.name)} { background-color: var(--color-${kebabCase(
      color.name
    )}); }`
  )
  .join('\n')}`
