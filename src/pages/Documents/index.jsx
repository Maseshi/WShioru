import { useState, useEffect } from 'react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import DocumentMeta from 'react-document-meta'

import Contents from './Contents/index'
import Tabs from './Tabs/index'

import CookieAccept from '../../components/CookieAccept/index'

import { translator } from '../../utils/functions/translator'

import './style.css'

export default function Documents() {
    const [documents, setDocuments] = useState()
    const [loaded, setLoaded] = useState(false)
    const [pages, setPages] = useState([])

    const meta = {
        title: translator().translate.pages.documents.meta_title,
        description: translator().translate.pages.documents.meta_description,
        canonical: '/',
        meta: {
            name: {
                keywords: 'shioru, shioru-discord, discord-bot, bot',
                subject: translator().translate.pages.documents.meta_subject,
                language: 'TH',
                robots: 'index, follow',

                'og:type': 'website',
                'og:image': '/shioru_banner.jpg',
                'og:site_name': 'Shioru'
            }
        }
    }

    const url = new URL(window.location)
    const tabParam = url.searchParams.get('tab')
    const parameter = {
        tab: tabParam
    }

    useEffect(() => {
        const docRef = doc(getFirestore(), 'Documents', 'shioru')
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const document = docSnap.data()[translator().code]
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
    }, [pages])

    return (
        <DocumentMeta {...meta}>
            <section className="documents">
                <div className="navbar-expand-lg">
                    <button className="documents-navbar-toggle navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDocuments" aria-controls="offcanvasDocuments">
                        <i className="bi bi-three-dots-vertical"></i>
                    </button>
                </div>
                <div className="row">
                    <div className="documents-col-tab col-md-3">
                        <Tabs translate={translator().translate} documents={documents} loaded={loaded} pages={pages} parameter={parameter} />
                    </div>
                    <div className="documents-col-content col-md-9">
                        <div className="documents-content d-flex flex-column">
                            <div className="documents-content-data">
                                <div className="container">
                                    <Contents translate={translator().translate} documents={documents} loaded={loaded} pages={pages} parameter={parameter} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <CookieAccept />
        </DocumentMeta>
    )
}
