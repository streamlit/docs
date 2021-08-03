import HeaderLink from '../utilities/headerLink'


export const H1 = (props) => (
  <HeaderLink level={1} name={getName(props)} className={props.className}>
    {getBody(props)}
  </HeaderLink>
)

export const H2 = (props) => (
  <HeaderLink level={2} name={getName(props)} className={props.className}>
    {getBody(props)}
  </HeaderLink>
)

export const H3 = (props) => (
  <HeaderLink level={3} name={getName(props)} className={props.className}>
    {getBody(props)}
  </HeaderLink>
)

function getBody(props) {
  const length = Object.keys(props).length;

  if (length > 1) {
    return props.children;
  } else {
    let body = (
      <>
        <a aria-hidden="true" tabIndex="-1" href={`#${cleanHref(props.children)}`}><span className="icon icon-link"></span></a>
        {props.children}
      </>
    )
    return body;
  }
}

function cleanHref(name) {
  const clean = String(name).replace('.', '').replace(' ', '-');
  return clean;
}

function getName(props) {
  if (props.name) {
    return props.name
  }

  let nodesToTraverse = Array.isArray(props.children) ?
    Array.from(props.children) : [props.children]

  while (nodesToTraverse.length) {
    const node = nodesToTraverse.pop()

    if (typeof (node) === "string") {
      return node
    }

    if (Array.isArray(node) && node.length > 0) {
      nodesToTraverse = nodesToTraverse.concat(node)
      continue
    }

    if (node?.props?.children) {
      nodesToTraverse.push(node.props.children)
      continue
    }

    break
  }

  return undefined
}
