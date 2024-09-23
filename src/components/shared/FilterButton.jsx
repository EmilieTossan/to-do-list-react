export default function FilterButton({ content, className, setFilter, filterName}) {

  function onFiltered(newFilter) {
    setFilter(newFilter)
  }
  
  return (
    <button
        className={ className }
        onClick={() => onFiltered(filterName)}
    >
        { content }
    </button>
  )
}