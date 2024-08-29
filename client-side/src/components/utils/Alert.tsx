interface alertProps {
    background: string;
    text: string
}

function Alert({background, text}: alertProps) {
    return (
        <div className={`fixed bottom-10 mt-10 p-2 min-w-60 mb-4 font-medium text-white rounded ${background} z-50`} role="alert">
           <p className="text-center">{text}</p>
        </div>
    )
}

export default Alert;