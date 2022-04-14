import { useState, useEffect } from 'react'

import './style.css'

export default function ScrollToTop() {
    const [top, setTop] = useState(true)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY === 0) {
                setTop(true)
            } else {
                setTop(false)
            }
        })
    }, [])

    return (
        <button type="button" className={top ? "scroll-to-top-hidden btn" : "scroll-to-top btn"} onClick={() => window.scrollTo(0, 0)}>
            <i className="bi bi-chevron-up"></i>
        </button>
    )
}
