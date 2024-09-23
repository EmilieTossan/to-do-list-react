export default function Button({ content, className, setFilter, filter}) {
  
  return (
    <button
      className={ className }
      onClick={() => setFilter(filter)}
    >
      { content }
    </button>
  )
}