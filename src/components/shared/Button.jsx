import "./buttons.css";

export default function Button({ content, className, setFilter, filter}) {
  
  return (
    <button
      className={ className }
      onClick={setFilter & filter ? () => setFilter(filter) : undefined }
    >
      { content }
    </button>
  )
}