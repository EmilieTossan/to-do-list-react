import "./input.css";

export default function Input({ type, max, min, name, placeholder, value, onChange, error }) {

    return (
        <>
            <input
                type={ type }
                {...(type === "range" && max) ? max={max} : ""}
                {...(type === "range" && min) ? min={min} : ""}
                name={ name }
                placeholder={ placeholder }
                value={ value }
                onChange={ onChange }
            />
            {error && <p className="error-message">{error}</p>}
        </>
    )
}