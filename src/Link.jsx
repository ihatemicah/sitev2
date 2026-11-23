import { hrefFor, navigate } from './router.js'

/** An <a> that routes in place, but still opens in a new tab on cmd/ctrl/middle click. */
function Link({ to, onClick, children, ...rest }) {
    const handleClick = (event) => {
        onClick?.(event)
        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return
        }
        event.preventDefault()
        navigate(to)
    }

    return (
        <a href={hrefFor(to)} onClick={handleClick} {...rest}>
            {children}
        </a>
    )
}

export default Link
