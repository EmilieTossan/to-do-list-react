export default function FilterButton({ content, className, newFilter, onFiltered }) {
    return (
      <button
          className={ className }
          onClick={() => onFiltered(newFilter)}
      >
          {content}
      </button>
    )
  }