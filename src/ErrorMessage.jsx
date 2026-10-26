// Fallback UI shown when an API request fails, with an optional "Try Again" button
function ErrorMessage({ message, onRetry }) {
    return (
        <div className="p-8 flex flex-col items-center gap-3 text-center" role="alert">
            <p className="text-red-600">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="py-2 px-4 rounded bg-teal-600 text-white hover:bg-teal-700"
                >
                    Try Again
                </button>
            )}
        </div>
    )
}

export default ErrorMessage
