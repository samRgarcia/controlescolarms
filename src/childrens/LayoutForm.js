import React from "react";
import './css/index.css'

const LayoutForm = ({children}) => {
    return (
        <div className={"container-dp"}>
            <div className={'box-dp'}>
                {children}
            </div>
        </div>
    )
}

export default LayoutForm;
