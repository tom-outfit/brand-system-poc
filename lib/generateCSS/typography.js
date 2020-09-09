import flatten from 'lodash.flatten'
import kebabCase from 'lodash.kebabcase'

export default brand => `/* ----------------------- Typography ----------------------- */

/* Font family Variables */

${generateFontFamilyVariables(brand.families)}

/* Type scales */

${generateTypeScales(brand)}
`

export const generateFontImports = brand => `/* Font Imports */

${flatten(
  brand.families.map(family => [family.print_family_url, family.web_family_url])
)
  .filter(url => !!url)
  .map(url => `@import url('${url}');`)
  .join('\n')}
`

const generateFontFamilyVariables = families =>
  families
    .map(family => {
      const baseName = kebabCase(family.print_family)
      const printFamily = `"${family.print_family}", ${family.print_family_fallback}`
      const webFamily = family.web_family
        ? `"${family.web_family}", ${family.web_family_fallback}`
        : printFamily
      const emailFamily = family.email_family || webFamily

      return `/* ${family.print_family} */
:root {
  --font-family-${baseName}-print: ${printFamily};
  --font-family-${baseName}-web: ${webFamily};
  --font-family-${baseName}-email: ${emailFamily};
}

/* Set default font variables for "${family.print_family}" per export type */
body { --font-family-${baseName}: var(--font-family-${baseName}-print); }
[data-export-type='print'] body { --font-family-${baseName}: var(--font-family-${baseName}-print); }
[data-export-type='web'] body { --font-family-${baseName}: var(--font-family-${baseName}-web); }
[data-export-type='email'] body { --font-family-${baseName}: var(--font-family-${baseName}-email); }`
    })
    .join('\n\n')

const generateTypeScales = brand => {
  const typeScales = brand.body.filter(
    slice => slice.slice_type === 'type_scale'
  )
  return typeScales.map(
    scale => `/* Type scale ${scale.primary.name} */

${scale.items
  .map(item => {
    const dataAttr = `[data-type-scale="${kebabCase(scale.primary.name)}"]`
    return `/* ${scale.primary.name} ${item.name} */
${createSelectors(dataAttr, item.selectors)} {
  font-family: var(--font-family-${kebabCase(item.font_family)});
  font-size: ${item.size || 1}rem;
  margin: ${scale.primary.paragraph_spacing}rem 0;
  font-weight: ${item.weight};
  line-height: ${
    item.line_height ? item.line_height * item.size + 'rem' : '1rem'
  };
  letter-spacing: ${item.letter_spacing ? item.letter_spacing + 'px' : 0};
  text-transform: ${item.text_transform || 'none'};
  text-decoration: ${item.text_decoration || 'none'};
}`
  })
  .join('\n\n')}
`
  )
}

const createSelectors = (dataAttr, selectors) =>
  selectors
    .split(', ')
    .map(selector => `${dataAttr} ${selector}`)
    .join(',\n')
