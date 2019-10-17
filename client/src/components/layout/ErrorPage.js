import React, {useEffect} from 'react'

const ErrorPage = () => {

    useEffect(() => {
        document.title = '404 not found'        
    }, [])

    return (
        <div>
            <h2>404 Page not found</h2>
            <p>The requested URL {window.location.pathname} was not found on this server.</p>
        </div>
    )
}

export default ErrorPage
