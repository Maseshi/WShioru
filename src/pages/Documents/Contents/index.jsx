import Data from './Data'

export default function Contents(props) {
    const translate = props.translate
    const documents = props.documents
    const loaded = props.loaded
    const pages = props.pages
    const parameter = props.parameter

    return (
        <div className="tab-content" id="v-pills-tabContent">
            <div
                className={
                    !loaded ? (
                        "tab-pane fade show active"
                    ) : (
                        "tab-pane fade"
                    )
                }
                id="v-pills-loading"
                role="tabpanel"
                aria-labelledby="v-pills-loading-tab"
            >
                <div className="documents-content-loading placeholder-wave">
                    <div className="text-center">
                        <h1>
                            <span className="placeholder col-2"></span>
                        </h1>
                    </div>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                    <br />
                    <br />
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                    <br />
                    <br />
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                </div>
            </div>
            <div
                className={
                    loaded && documents ? (
                        pages.includes(parameter.tab) ? (
                            "tab-pane fade"
                        ) : (
                            parameter.tab ? (
                                "tab-pane fade show active"
                            ) : (
                                "tab-pane fade"
                            )
                        )
                    ) : (
                        "tab-pane fade"
                    )
                }
                id="v-pills-not-found"
                role="tabpanel"
                aria-labelledby="v-pills-not-found-tab"
            >
                <div className="document-content-data-error">
                    <div className="container">
                        <i className="bi bi-journal-x"></i>
                        <h3>{translate.pages.documents.contents_page_not_found}</h3>
                        <p>{translate.pages.documents.contents_page_not_found_description}</p>
                        <br />
                        <small>ERR: DOCUMENT_NOT_FOUND</small>
                    </div>
                </div>
            </div>
            <div
                className={
                    loaded && !documents ? (
                        "tab-pane fade show active"
                    ) : (
                        "tab-pane fade"
                    )
                }
                id="v-pills-data-not-found"
                role="tabpanel"
                aria-labelledby="v-pills-data-not-found-tab"
            >
                <div className="documents-content-data-error">
                    <i className="bi bi-exclamation-circle"></i>
                    <h3>{translate.pages.documents.contents_error_data_not_found}</h3>
                    <p>{translate.pages.documents.contents_error_data_not_found_description}</p>
                    <div className="document-content-data-button">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => window.location.reload()}
                        >{translate.pages.documents.contents_error_refresh}</button>
                    </div>
                    <br />
                    <small>ERR: DOCUMENTS_DATA_NOT_FOUND</small>
                </div>
            </div>
            {
                documents ? (
                    documents.map((item, index) => {
                        const data = item.data

                        return (
                            <>
                                <div className="documents-content-key" key={index}></div>
                                <Data
                                    translate={translate}
                                    documents={documents}
                                    loaded={loaded}
                                    pages={pages}
                                    parameter={parameter}
                                    data={data}
                                    index={index}
                                />
                            </>
                        )
                    })
                ) : ('')
            }
        </div>
    )
}
