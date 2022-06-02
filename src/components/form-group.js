import React from "react";

function FormGroup(props) {
    return(
        <div className="form-group mb-2">
            <label htmlFor={props.htmlFor}>{props.label}</label>
            {props.children}
        </div>
    )
}

export default FormGroup