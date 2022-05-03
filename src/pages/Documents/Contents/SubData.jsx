import { useState } from 'react'

import Error from './Error'

import { markdown } from '../../../utils/functions/markdown'

export default function SubData(props) {
    const [responses, setResponses] = useState()

    const translate = props.translate
    const documents = props.documents
    const parameter = props.parameter
    const data = props.data
    const id = props.id
    const subData = props.subData
    const index = props.index
    const dataIndex = props.dataIndex

    const getData = async (link) => {
        const response = await fetch(link)
        const text = await response.text()
        const xmlString = markdown(text)

        return setResponses(xmlString)
    }

    const addAnchorLink = (xmlString) => {
        const wrapper = document.createElement("div")
        wrapper.innerHTML = xmlString

        const headers = wrapper.querySelectorAll(["h1", "h2", "h3", "h4", "h5", "h6"])

        headers.forEach((header) => {
            let title = header;
            let content = title.textContent
            let link = content.toLowerCase()

            if (/\s/.test(link)) {
                for (let i = 0; i < link.length; i++) {
                    if (/\s\s+/g.test(link)) {
                        link = link.replace(/\s\s+/g, '')
                    }
                    link = link.replace(' ', '-')
                    if (link.indexOf(".")) {
                        link = link.substring(0, i + 1) + link.substring(i + 1).replace(/\./g, '');
                    }
                }
            }

            title.innerHTML = title.innerHTML + '<a class="documents-content-data-docs-link" href="#' + link + '"><i class="bi bi-link"></i></a>'
            title.setAttribute('id', link)
        })

        return wrapper.innerHTML
    }

    return subData.map((itemSubData, subDataIndex) => {
        const subTitle = itemSubData.title
        const subType = itemSubData.type
        const subLink = itemSubData.link
        const subContent = itemSubData.content
        const subID = subTitle.replace(' ', '-').toLowerCase()

        // Previous page data
        const previousPageTitle = subDataIndex !== 0 ? (
            subData.map((previousSubDataTitle) => data.map((previousDataTitle) => previousDataTitle.title)[dataIndex] + '-' + previousSubDataTitle.title)[subDataIndex - 1]
        ) : (
            data.map((previousDataTitle) => previousDataTitle.title)[dataIndex]
        )
        const previousTitle = subDataIndex !== 0 ? (
            subData.map((previousSubDataTitle) => previousSubDataTitle.title)[subDataIndex - 1]
        ) : (
            data.map((previousDataTitle) => previousDataTitle.title)[dataIndex]
        )
        const previousType = subDataIndex !== 0 ? (
            subData.map((previousSubDataType) => previousSubDataType.type)[subDataIndex - 1]
        ) : (
            data.map((previousDataType) => previousDataType.type)[dataIndex]
        )
        const previousLink = subDataIndex !== 0 ? (
            subData.map((previousSubDataLink) => previousSubDataLink.link)[subDataIndex - 1]
        ) : (
            data.map((previousDataLink) => previousDataLink.link)[dataIndex]
        )
        const previousID = previousPageTitle.replace(' ', '-').toLowerCase()

        // Next page data
        const nextPageTitle = subDataIndex !== subData.length - 1 ? (
            subData.map((nextSubDataTitle) => data.map((nextDataTitle) => nextDataTitle.title)[dataIndex] + '-' + nextSubDataTitle.title)[subDataIndex + 1]
        ) : (
            documents.map((nextData) => nextData.data.map((nextItemData) => nextItemData.title)[0])[index + 1]
        )
        const nextTitle = subDataIndex !== subData.length - 1 ? (
            subData.map((nextSubDataTitle) => nextSubDataTitle.title)[subDataIndex + 1]
        ) : (
            documents.map((nextData) => nextData.data.map((nextItemData) => nextItemData.title)[0])[index + 1]
        )
        const nextType = subDataIndex !== subData.length - 1 ? (
            subData.map((nextSubDataType) => nextSubDataType.type)[subDataIndex + 1]
        ) : (
            documents.map((nextData) => nextData.data.map((nextItemData) => nextItemData.type)[0])[index + 1]
        )
        const nextLink = subDataIndex !== subData.length - 1 ? (
            subData.map((nextSubDataLink) => nextSubDataLink.link)[subDataIndex + 1]
        ) : (
            documents.map((nextData) => nextData.data.map((nextItemData) => nextItemData.link)[0])[index + 1]
        )
        const nextID = nextPageTitle.replace(' ', '-').toLowerCase()

        return (
            <div
                className={
                    parameter.tab === (id + '-' + subID) ? (
                        "tab-pane fade show active"
                    ) : (
                        "tab-pane fade"
                    )
                }
                id={"v-pills-" + id + '-' + subID}
                role="tabpanel"
                aria-labelledby={"v-pills-" + id + '-' + subID + "-tab"}
                key={subID}
            >
                {
                    subType === 0 ? (
                        subContent ? (
                            <div
                                className="documents-content-data-docs"
                                dangerouslySetInnerHTML={
                                    {
                                        __html: addAnchorLink(markdown(subContent))
                                    }
                                }
                            ></div>
                        ) : <Error translate={translate} type={0} />
                    ) : subType === 1 ? (
                        subLink ? (
                            <div
                                className="documents-content-data-docs"
                                dangerouslySetInnerHTML={
                                    {
                                        __html: addAnchorLink(responses ? responses : getData(subLink))
                                    }
                                }
                            ></div>
                        ) : <Error translate={translate} type={3} />
                    ) : subType !== 2 ? <Error translate={translate} type={1} /> : <Error translate={translate} type={2} />
                }
                <div className="document-content-navigator">
                    <div className="row">
                        <div className="col-md-6 my-2">
                            <button className="btn card" type="button" onClick={
                                () => {
                                    if (previousType === 2) {
                                        window.open(previousLink, '_blank')
                                    } else {
                                        const previousEle = document.getElementById("v-pills-" + previousID + "-tab")

                                        previousEle.click()
                                    }
                                }
                            }>
                                <div className="card-body d-flex justify-content-between">
                                    {
                                        previousType === 2 ? (
                                            <i className="bi bi-box-arrow-up-right"></i>
                                        ) : (
                                            <i className="bi bi-caret-left"></i>
                                        )
                                    }
                                    <div className="documents-content-navigator-previous">
                                        <small className="text-muted">{translate.pages.documents.contents_data_previous}</small>
                                        <h5 className="card-title">
                                            {previousTitle}
                                        </h5>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div className="col-md-6 my-2">
                            {
                                index !== index.length - 1 ? (
                                    <button className="btn card" type="button" onClick={
                                        () => {
                                            if (nextType === 2) {
                                                window.open(nextLink, '_blank')
                                            } else {
                                                const nextEle = document.getElementById("v-pills-" + nextID + "-tab")

                                                nextEle.click()
                                            }
                                        }
                                    }>
                                        <div className="card-body d-flex justify-content-between">
                                            <div className="documents-content-navigator-next">
                                                <small className="text-muted">{translate.pages.documents.contents_data_next}</small>
                                                <h5 className="card-title">
                                                    {nextTitle}
                                                </h5>
                                            </div>
                                            {
                                                nextType === 2 ? (
                                                    <i className="bi bi-box-arrow-up-right"></i>
                                                ) : (
                                                    <i className="bi bi-caret-right"></i>
                                                )
                                            }
                                        </div>
                                    </button>
                                ) : ('')
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    })
}
