import Contents from './Contents'

export default function Tabs(props) {
    const translate = props.translate
    const documents = props.documents
    const loaded = props.loaded
    const pages = props.pages
    const parameter = props.parameter

    return (
        <nav className="documents-tab-navbar navbar navbar-expand-lg">
            <div className="offcanvas offcanvas-start border-0" tabIndex="-1" id="offcanvasDocuments" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasLabel">{translate.pages.documents.tabs_documents_list}</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="documents-tab d-flex flex-column">
                        <div className="documents-tab-content">
                            <Contents translate={translate} documents={documents} loaded={loaded} pages={pages} parameter={parameter} />
                        </div>
                        <div className="documents-tab-footer">
                            <div className="container">
                                <span>
                                    <a href="https://maseshi.web.app/privacy-policy" target="_blank" rel="noreferrer">
                                        {translate.pages.documents.tabs_policy}
                                    </a>
                                    <span> • </span>
                                    <a href="https://maseshi.web.app/terms-of-service" target="_blank" rel="noreferrer">
                                        {translate.pages.documents.tabs_condition}
                                    </a>
                                </span>
                                <br />
                                <span dangerouslySetInnerHTML={{__html: translate.pages.documents.tabs_all_rights_reserved}}></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
