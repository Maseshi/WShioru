import React from 'react'

export default function Error(props) {
    const translate = props.translate
    const type = props.type

    return (
        <div className="documents-content-data-error">
            {
                type === 0 ? (
                    <div className="container">
                        <i className="bi bi-file-earmark"></i>
                        <h3>{translate.pages.documents.contents_error_content_not_found}</h3>
                        <p>{translate.pages.documents.contents_error_content_not_found_description}</p>
                        <br />
                        <small>ERR: EMPTY_CONTENT</small>
                    </div>
                ) : type === 1 ? (
                    <div className="container">
                        <i className="bi bi-info-circle"></i>
                        <h3>{translate.pages.documents.contents_error_unknown_type}</h3>
                        <p>{translate.pages.documents.contents_error_unknown_type_description}</p>
                        <br />
                        <small>ERR: UNKNOWN_TYPE</small>
                    </div>
                ) : type === 2 ? (
                    <div className="container">
                        <i className="bi bi-hash"></i>
                        <h3>{translate.pages.documents.contents_error_empty_type}</h3>
                        <p>{translate.pages.documents.contents_error_empty_type_description}</p>
                        <br />
                        <small>ERR: EMPTY_TYPE</small>
                    </div>
                ) : type === 3 ? (
                    <div className="container">
                        <i className="bi bi-link-45deg"></i>
                        <h3>{translate.pages.documents.contents_error_link_not_found_type}</h3>
                        <p>{translate.pages.documents.contents_error_link_not_found_type_description}</p>
                        <br />
                        <small>ERR: LINK_NOT_FOUND</small>
                    </div>
                ) : (
                    <div className="container">
                        <i className="bi bi-exclamation-triangle"></i>
                        <h3>{translate.pages.documents.contents_error_unknown_error}</h3>
                        <p>{translate.pages.documents.contents_error_unknown_error_description}</p>
                        <br />
                        <small>ERR: UNKNOWN_ERROR</small>
                    </div>
                )
            }
        </div>
    )
}
