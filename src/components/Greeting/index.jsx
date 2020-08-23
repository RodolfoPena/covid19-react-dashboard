import React from 'react'

function Greeting(props) {
    return (
        <h1 className="text-center m-5">{props.greeting}</h1>
    )
}

export default Greeting