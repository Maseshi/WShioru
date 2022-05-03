import { useState, useEffect } from 'react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

import Contents from './Contents/index'
import Tabs from './Tabs'

import CookieAccept from '../../components/CookieAccept/index'

import { getCookie } from '../../utils/functions/getCookie'

import './style.css'

export default function Documents() {
    const [documents, setDocuments] = useState()
    const [loaded, setLoaded] = useState(false)
    const [pages, setPages] = useState([])

    const language = getCookie('languageSelect') || window.navigator.userLanguage || window.navigator.language
    const translate = require('../../languages/' + language + '.json')

    document.title = translate.pages.documents.meta_title

    const url = new URL(window.location)
    const tabParam = url.searchParams.get('tab')
    const parameter = {
        tab: tabParam
    }

    useEffect(() => {
        const html = document.querySelector('html')
        const body = document.body
        const header = document.getElementsByTagName('header')[0]
        const footer = document.getElementsByTagName('footer')[0]

        html.style.overflow = 'hidden'
        body.style.overflowY = 'hidden'
        header.classList.add('header-static')
        footer.style.display = 'none'

        const docRef = doc(getFirestore(), 'Documents', 'shioru')
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const document = docSnap.data()[language]
                const pagesID = pages

                if (document) document.map(item => {
                    const data = item.data

                    return data.map(itemData => {
                        const itemTitle = itemData.title
                        const itemType = itemData.type
                        const itemSubData = itemData.data

                        const itemID = itemTitle.replace(' ', '-').toLowerCase()

                        if (itemSubData) itemSubData.map(itemDataSubData => {
                            const itemSubTitle = itemDataSubData.title
                            const itemSubType = itemDataSubData.type

                            const itemSubID = itemSubTitle.replace(' ', '-').toLowerCase()

                            return setPages(
                                [0, 1].includes(itemSubType) ? pagesID.push(itemID + '-' + itemSubID) : ''
                            )
                        })

                        return setPages(
                            [0, 1].includes(itemType) ? pagesID.push(itemID) : ''
                        )
                    })
                })

                setPages([...new Set(pages)])
                setDocuments(document)
                setLoaded(true)
            } else {
                setDocuments()
                setLoaded(true)
            }
        })
    }, [pages, language])

    return (
        <>
            <section className="documents">
                <button className="documents-navbar-toggle navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDocuments" aria-controls="offcanvasDocuments">
                    <i className="bi bi-three-dots-vertical"></i>
                </button>
                <div className="row">
                    <div className="documents-col-tab col-md-3">
                        <Tabs translate={translate} documents={documents} loaded={loaded} pages={pages} parameter={parameter} />
                    </div>
                    <div className="documents-col-content col-md-9">
                        <div className="documents-content d-flex flex-column">
                            <div className="documents-content-data">
                                <div className="container">
                                    <Contents translate={translate} documents={documents} loaded={loaded} pages={pages} parameter={parameter} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <CookieAccept />
        </>
    )
}
