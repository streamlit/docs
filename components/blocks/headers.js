import QuickLink from '../utilities/quickLink'

export const H1 = (props) => (
  <QuickLink name={getName(props)}>
    <h1 {...props} />
  </QuickLink>
)

export const H2 = (props) => (
  <QuickLink name={getName(props)}>
    <h2 {...props} />
  </QuickLink>
)

export const H3 = (props) => (
  <QuickLink name={getName(props)}>
    <h3 {...props} />
  </QuickLink>
)

function getName(props) {
  if (props.name) {
    return props.name
  }

  let nodesToTraverse = Array.isArray(props.children) ?
    Array.from(props.children) : [ props.children ]

  while (nodesToTraverse.length) {
    const node = nodesToTraverse.pop()

    if (typeof(node) === "string") {
      return node
    }

    if (Array.isArray(node) && node.length > 0) {
      nodesToTraverse = nodesToTraverse.concat(node)
      continue
    }

    if (node?.props?.children) {
      nodesToTraverse.append(node.props.children)
      continue
    }

    break
  }

  return undefined
}
