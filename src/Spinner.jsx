function Spinner({ label = 'Loading...' }) {
    return (
        <div className="p-8 flex flex-col items-center gap-3 text-gray-600" role="status">
            <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-700 rounded-full animate-spin" />
            <p>{label}</p>
        </div>
    )
}

export default Spinner
