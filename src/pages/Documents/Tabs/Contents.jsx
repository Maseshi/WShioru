export default function Contents(props) {
    const translate = props.translate
    const documents = props.documents
    const loaded = props.loaded
    const pages = props.pages
    const parameter = props.parameter

    const setParameter = (title, id) => {
        document.title = title + ' - ' + translate.pages.documents.meta_title

        const url = new URL(window.location)

        url.searchParams.set('tab', id)
        window.history.pushState({}, '', url)
    }

    return (
        <div className="nav nav-pills flex-column" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            {
                loaded ? (
                    documents ? (
                        documents.map((item, index) => {
                            const header = item.header
                            const data = item.data

                            return (
                                <>
                                    {
                                        header ? <h5 key={index}>{header}</h5> : ''
                                    }
                                    {
                                        data.map((itemData, dataIndex) => {
                                            const title = itemData.title
                                            const type = itemData.type
                                            const link = itemData.link
                                            const subData = itemData.data
                                            const id = title.replace(' ', '-').toLowerCase()

                                            const firstChild = index === 0 && dataIndex === 0
                                            const collapse = subData ? "documents-tab-dropdown nav-link" : "nav-link"
                                            const collapseActive = subData ? "documents-tab-dropdown nav-link active" : "nav-link active"
                                            const buttonClass = firstChild ? (
                                                pages.includes(parameter.tab) ? (
                                                    parameter.tab === id ? collapseActive : collapse
                                                ) : (
                                                    parameter.tab ? collapse : collapseActive
                                                )
                                            ) : (
                                                parameter.tab === id ? collapseActive : collapse
                                            )
                                            const buttonSelected = firstChild ? (
                                                pages.includes(parameter.tab) ? (
                                                    parameter.tab === id ? "true" : "false"
                                                ) : (
                                                    parameter.tab ? "false" : "true"
                                                )
                                            ) : (
                                                parameter.tab === id ? "true" : "false"
                                            )

                                            return (
                                                <>
                                                    {
                                                        type === 0 || type === 1 ? (
                                                            <button
                                                                className={buttonClass}
                                                                id={"v-pills-" + id + "-tab"}
                                                                data-bs-toggle="pill"
                                                                data-bs-target={"#v-pills-" + id}
                                                                type="button"
                                                                role="tab"
                                                                aria-controls={"v-pills-" + id}
                                                                aria-selected={buttonSelected}
                                                                onClick={() => setParameter(title, id)}
                                                                key={dataIndex}
                                                            >
                                                                {
                                                                    subData ? (
                                                                        <div
                                                                            className="documents-tab-dropdown-toggle"
                                                                            data-bs-toggle="collapse"
                                                                            data-bs-target={"#collapse-" + id}
                                                                            aria-expanded={
                                                                                parameter.tab === id ? "true" : (
                                                                                    subData.map(itemSubData => {
                                                                                        const subTitle = itemSubData.title

                                                                                        return id + '-' + subTitle.replace(' ', '-').toLowerCase()
                                                                                    }).includes(parameter.tab) ? "true" : "false"
                                                                                )
                                                                            }
                                                                            aria-controls={"collapse-" + id}
                                                                        >
                                                                            {title}
                                                                        </div>
                                                                    ) : title
                                                                }
                                                            </button>
                                                        ) : type === 2 ? (
                                                            <a
                                                                className="documents-tab-link nav-link"
                                                                href={link}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                key={dataIndex}
                                                            >
                                                                <div className="documents-tab-link-toggle">
                                                                    {title}
                                                                </div>
                                                            </a>
                                                        ) : (
                                                            <button
                                                                className={buttonClass}
                                                                id={"v-pills-" + id + "-tab"}
                                                                data-bs-toggle="pill"
                                                                data-bs-target={"#v-pills-" + id}
                                                                type="button"
                                                                role="tab"
                                                                aria-controls={"v-pills-" + id}
                                                                aria-selected={buttonSelected}
                                                                onClick={() => setParameter(title, id)}
                                                                key={dataIndex}
                                                            >
                                                                {title}
                                                            </button>
                                                        )
                                                    }
                                                    {
                                                        subData ? (
                                                            <nav className={
                                                                parameter.tab === id ? "documents-tab-collapse collapse show" : (
                                                                    subData.map(itemSubData => {
                                                                        const subTitle = itemSubData.title

                                                                        return id + '-' + subTitle.replace(' ', '-').toLowerCase()
                                                                    }).includes(parameter.tab) ? "documents-tab-collapse collapse show" : "documents-tab-collapse collapse"
                                                                )
                                                            } id={"collapse-" + id}>
                                                                <div className="nav nav-pills ms-3 flex-column">
                                                                    {
                                                                        subData.map((itemSubData, subDataIndex) => {
                                                                            const subTitle = itemSubData.title
                                                                            const subType = itemSubData.type
                                                                            const subLink = itemSubData.link
                                                                            const subID = id + '-' + subTitle.replace(' ', '-').toLowerCase()

                                                                            return (
                                                                                subType === 0 || subType === 1 ? (
                                                                                    <button
                                                                                        className={parameter.tab === subID ? "nav-link ms-3 active" : "nav-link ms-3"}
                                                                                        id={"v-pills-" + subID + "-tab"}
                                                                                        data-bs-toggle="pill"
                                                                                        data-bs-target={"#v-pills-" + subID}
                                                                                        type="button"
                                                                                        role="tab"
                                                                                        aria-controls={"v-pills-" + subID}
                                                                                        aria-selected="false"
                                                                                        onClick={() => setParameter(subTitle, subID)}
                                                                                        key={subDataIndex}
                                                                                    >
                                                                                        {subTitle}
                                                                                    </button>
                                                                                ) : subType === 2 ? (
                                                                                    <a
                                                                                        className="documents-tab-link nav-link ms-3"
                                                                                        href={subLink}
                                                                                        target="_blank"
                                                                                        rel="noreferrer"
                                                                                        key={subDataIndex}
                                                                                    >
                                                                                        <div className="documents-tab-link-toggle">
                                                                                            {subTitle}
                                                                                        </div>
                                                                                    </a>
                                                                                ) : (
                                                                                    <button
                                                                                        className={parameter.tab === subID ? "nav-link ms-3 active" : "nav-link ms-3"}
                                                                                        id={"v-pills-" + subID + "-tab"}
                                                                                        data-bs-toggle="pill"
                                                                                        data-bs-target={"#v-pills-" + subID}
                                                                                        type="button"
                                                                                        role="tab"
                                                                                        aria-controls={"v-pills-" + subID}
                                                                                        aria-selected="false"
                                                                                        onClick={() => setParameter(subTitle, subID)}
                                                                                        key={subDataIndex}
                                                                                    >
                                                                                        {subTitle}
                                                                                    </button>
                                                                                )
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </nav>
                                                        ) : ('')
                                                    }
                                                </>
                                            )
                                        })
                                    }
                                </>
                            )
                        })
                    ) : (
                        <div className="documents-tab-loading">
                            <span className="placeholder col-12"></span>
                            <span className="placeholder col-12"></span>
                            <span className="placeholder col-12"></span>
                            <h4>
                                <span className="placeholder col-4"></span>
                            </h4>
                            <span className="placeholder col-12"></span>
                            <span className="placeholder col-12"></span>
                            <h4>
                                <span className="placeholder col-4"></span>
                            </h4>
                            <span className="placeholder col-12"></span>
                            <span className="placeholder col-12"></span>
                        </div>
                    )
                ) : (
                    <div className="documents-tab-loading placeholder-glow">
                        <span className="placeholder col-12"></span>
                        <span className="placeholder col-12"></span>
                        <span className="placeholder col-12"></span>
                        <h4>
                            <span className="placeholder col-4"></span>
                        </h4>
                        <span className="placeholder col-12"></span>
                        <span className="placeholder col-12"></span>
                        <h4>
                            <span className="placeholder col-4"></span>
                        </h4>
                        <span className="placeholder col-12"></span>
                        <span className="placeholder col-12"></span>
                    </div>
                )
            }
        </div>
    )
}
