import { ErrorBoundary } from "react-error-boundary"

function ErrorHandler({error}){
    return (
        <div role="alert">
            <p>An error occurred!</p>
            <pre>{error.message}</pre>
        </div>
    )

}
function City({name}){
    try{
        return <h1>Hello, kindly visit {name.toUpperCase()}</h1>
    }catch(error){
        return <ErrorHandler error={error}/>
    }
    
}
function Country({capital}){
    try{
        return <h1>Hello, kindly visit {capital.toUpperCase()}</h1>
    }catch(error){
        return <ErrorHandler error={error}/>
    }
}
function ReactCity({name}){
    return <h1>Hello, kindly visit {name.toUpperCase()}</h1>
}
function ReactCountry({capital}){
    return <h1>Hello, kindly visit {capital.toUpperCase()}</h1>
}
function ErrorHandling({props}){
    return (
        <div style={{width:'20%',  margin:'25px auto', 'padding': '25px', 'border': '10px solid red'}} >
            <h3>React Error Boundary using try/catch</h3>
            <p>This Error Bounday is applied on Child component using try/catech sattements </p>
            <City/>
            <Country/>
        </div>
    )
}
export function ReactErrorHandling({props}){
    return (
        <div style={{width:'20%',  margin:'25px auto', 'padding': '25px', 'border': '10px solid red'}} >
            <h3>React Error Boundary using Library</h3>
            <p>This Error Bounday is applied on parent component with FallbackComponent </p>
            <ErrorBoundary FallbackComponent={ErrorHandler}>
                <ReactCity/>
                <ReactCountry/>
            </ErrorBoundary>
        </div>
    )
}
export default ErrorHandling