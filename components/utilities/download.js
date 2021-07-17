// Simple horizontal flex container used for MDX.
const Download = ({ href, children }) => {
  return (
    <a href={href} rel="nofollow noopener" download>
      {children}
    </a>
  )
}

export default Download
