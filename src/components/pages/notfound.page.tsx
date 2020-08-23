import React from "react"
import {Link} from "react-router-dom"

const NotfoundPage: React.FC = () => {
    return (<div>
            404 - <Link to="/">Go home</Link>
        </div>
    )
}
export {NotfoundPage}