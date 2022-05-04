const Input = ({label, id, onChange, help, type = "text"}) => {

    let inputClass = "form-control";
    if(help) {
        inputClass += " is-invalid";
    }

    return (
        <div className="mb-3">
            <label className="form-label" htmlFor={id}>
                {label}
            </label>

            <input
                className={inputClass}
                name={id}
                id={id}
                onChange={onChange}
                type={type}
            />
            {help && <span className="invalid-feedback">{help}</span>}
        </div>
    )
}

export default Input;