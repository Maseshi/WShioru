import { useState } from 'react'

import Error from './Error'
import SubData from './SubData'

import { markdown } from '../../../utils/functions/markdown'

export default function Data(props) {
    const [responses, setResponses] = useState()

    const documents = props.documents
    const translate = props.translate
    const pages = props.pages
    const parameter = props.parameter
    const data = props.data
    const index = props.index

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

    return data.map((itemData, dataIndex) => {
        const title = itemData.title
        const type = itemData.type
        const link = itemData.link
        const content = itemData.content
        const subData = itemData.data
        const id = title.replace(' ', '-').toLowerCase()

        const firstChild = index === 0 && dataIndex === 0

        // Previous page data
        const previousPageTitle = index !== 0 ? (
            documents.map((previousData) => previousData.data ? (
                previousData.data.map((previousItemData) => previousItemData.data ? (
                    previousItemData.data.map((previousItemSubData) => previousData.data.map((previousDataTitle) => previousDataTitle.title)[data.length - 1] + '-' + previousItemSubData.title)[previousData.data.length]
                ) : (
                    previousItemData.title
                ))[previousData ? previousData.data.length - 1 : dataIndex - 1]
            ) : (
                previousData.title
            ))[index - 1]
        ) : (
            data.map((previousDataTitle) => previousDataTitle.title)[dataIndex - 1]
        )
        const previousTitle = index !== 0 ? (
            documents.map((previousData) => previousData.data ? (
                previousData.data.map((previousItemData) => previousItemData.data ? (
                    previousItemData.data.map((previousItemSubData) => previousItemSubData.title)[previousData.data.length]
                ) : (
                    previousItemData.title
                ))[previousData ? previousData.data.length - 1 : dataIndex - 1]
            ) : (
                previousData.title
            ))[index - 1]
        ) : (
            data.map((previousDataTitle) => previousDataTitle.title)[dataIndex - 1]
        )
        const previousType = index !== 0 ? (
            documents.map((previousData) => previousData.data ? (
                previousData.data.map((previousItemData) => previousItemData.data ? (
                    previousItemData.data.map((previousItemSubData) => previousItemSubData.type)[previousData.data.length]
                ) : (
                    previousItemData.type
                ))[previousData ? previousData.data.length - 1 : dataIndex - 1]
            ) : (
                previousData.type
            ))[index - 1]
        ) : (
            data.map((previousDataType) => previousDataType.type)[dataIndex - 1]
        )
        const previousLink = index !== 0 ? (
            documents.map((previousData) => previousData.data ? (
                previousData.data.map((previousItemData) => previousItemData.data ? (
                    previousItemData.data.map((previousItemSubData) => previousItemSubData.link)[previousData.data.length]
                ) : (
                    previousItemData.link
                ))[previousData ? previousData.data.length - 1 : dataIndex - 1]
            ) : (
                previousData.link
            ))[index - 1]
        ) : (
            data.map((previousDataLink) => previousDataLink.link)[dataIndex - 1]
        )
        const previousID = previousPageTitle ? previousPageTitle.replace(' ', '-').toLowerCase() : ''

        // Next page data
        const nextPageTitle = subData ? (
            subData.map((nextSubDataTitle) => data.map((nextDataTitle) => nextDataTitle.title)[dataIndex] + '-' + nextSubDataTitle.title)[0]
        ) : (
            data.map((nextDataTitle) => nextDataTitle.title)[dataIndex + 1]
        )
        const nextTitle = subData ? (
            subData.map((nextSubDataTitle) => nextSubDataTitle.title)[0]
        ) : (
            data.map((nextDataTitle) => nextDataTitle.title)[dataIndex + 1]
        )
        const nextType = subData ? (
            subData.map((nextSubDataType) => nextSubDataType.type)[0]
        ) : (
            data.map((nextDataType) => nextDataType.type)[dataIndex + 1]
        )
        const nextLink = subData ? (
            subData.map((nextSubDataLink) => nextSubDataLink.link)[0]
        ) : (
            data.map((nextDataLink) => nextDataLink.link)[dataIndex + 1]
        )
        const nextID = nextPageTitle ? nextPageTitle.toLowerCase() : ''

        return (
            <>
                <div
                    className={
                        firstChild ? (
                            pages.includes(parameter.tab) ? (
                                parameter.tab === id ? (
                                    "tab-pane fade show active"
                                ) : (
                                    "tab-pane fade"
                                )
                            ) : (
                                parameter.tab ? (
                                    "tab-pane fade"
                                ) : (
                                    "tab-pane fade show active"
                                )
                            )
                        ) : (
                            parameter.tab === id ? (
                                "tab-pane fade show active"
                            ) : (
                                "tab-pane fade"
                            )
                        )
                    }
                    id={"v-pills-" + id}
                    role="tabpanel"
                    aria-labelledby={"v-pills-" + id + "-tab"}
                    key={id}
                >
                    {
                        type === 0 ? (
                            content ? (
                                <div
                                    className="documents-content-data-docs"
                                    dangerouslySetInnerHTML={
                                        {
                                            __html: addAnchorLink(markdown(content))
                                        }
                                    }
                                ></div>
                            ) : <Error translate={translate} type={0} />
                        ) : type === 1 ? (
                            link ? (
                                <div
                                    className="documents-content-data-docs"
                                    dangerouslySetInnerHTML={
                                        {
                                            __html: addAnchorLink(responses ? responses : getData(link))
                                        }
                                    }
                                ></div>
                            ) : <Error translate={translate} type={3} />
                        ) : type !== 2 ? <Error translate={translate} type={1} /> : <Error translate={translate} type={2} />
                    }
                    <div className="document-content-navigator">
                        <div className="row">
                            <div className="col-md-6 my-2">
                                {
                                    dataIndex !== index ? (
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
                                    ) : ('')
                                }
                            </div>
                            <div className="col-md-6 my-2">
                                {
                                    dataIndex !== data.length ? (
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
                {
                    subData ? (
                        <SubData
                            translate={translate}
                            documents={documents}
                            parameter={parameter}
                            data={data}
                            id={id}
                            subData={subData}
                            index={index}
                            dataIndex={dataIndex}
                        />
                    ) : ('')
                }
            </>
        )
    })
}
