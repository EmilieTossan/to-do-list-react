export default function Input({ type, placeholder, value, onChange, error }) {

    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {error && <p className="error-message">{error}</p>}
        </>
    )
}