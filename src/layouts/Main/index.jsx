import { Routes, Route } from 'react-router-dom'

// Pages
import PageNotFound from '../../pages/404/index'
import Documents from '../../pages/Documents/index'
import Home from '../../pages/Home/index'
import Invited from '../../pages/Invited/index'

export default function Main() {
    return (
        <main>
            <Routes>
                <Route path="*" element={<PageNotFound />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/" element={<Home />} />
                <Route path="/thanks-you" element={<Invited />} />
            </Routes>
        </main>
    )
}
