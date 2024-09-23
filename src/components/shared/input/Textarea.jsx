import "./textarea.css";

export default function Textarea({name, rows, placeholder, value, onChange}) {
    return (
        <textarea
            name={ name }
            rows={ rows }
            placeholder={ placeholder }
            value={ value }
            onChange={ onChange }
        />
    )
} 