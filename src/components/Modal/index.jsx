import './style.css'

export default function Modal(props) {
    const id = props.id
    const title = props.title
    const body = props.body

    return (
        <div className="main-modal modal fade" id={id + 'Modal'} tabIndex="-1" aria-labelledby={id + 'ModalLabel'} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id={id + 'ModalLabel'}>
                            {title}
                        </h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <hr />
                    <div className="modal-body">
                        {body}
                    </div>
                </div>
            </div>
        </div>
    )
}
