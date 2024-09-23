import "./select.css";

export default function Select({ name, value, onChange, placeholder, options, error}) {
    return (
        <>
            <select
                name={ name }
                value={ value }
                onChange={ onChange }
            >
                <option value="" disabled>
                    { placeholder }
                </option>

                { options.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                )) }
                
            </select>
            {error !== "" ? <p className="error-message">{error}</p> : ""}
        </>
    )
}