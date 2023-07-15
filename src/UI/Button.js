function Button({
    title="Click",
    disabled=false,
    busy=false,
    className,
    onClick
}){
    return <button
            type="button"
            className={`w-48 bg-blue-500 hover:bg-blue-600 rounded-md p-2 text-white font-bold disabled:bg-blue-200 shadow-md ${className}`}
            disabled={disabled}
            onClick={onClick}>
            {!busy && title}
            {busy && 'Please wait...'}
    </button>
}

export default Button
