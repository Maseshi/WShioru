import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database'
import Waves from '../../components/Waves/index'

export default function Survey(props) {
    const [survey, setSurvey] = useState()

    const translate = props.language

    useEffect(() => {
        const childRef = ref(getDatabase(), 'Shioru/data/survey')
        onValue(childRef, snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.val()

                setSurvey(data)
            } else {
                set(childRef, {
                    "commands": 0,
                    "members": 0,
                    "servers": 0,
                    "working": 0
                })
            }
        })
    }, [])

    return (
        <>
            <Waves position="top" r={173} g={216} b={230} />
            <section className="home-survey">
                <div className="row">
                    <div className="col-md-3">
                        <i className="bi bi-code-slash"></i>
                        <h3>{survey ? survey.commands : "-:-"}</h3>
                        <span>{translate.pages.home.survey_commands}</span>
                    </div>
                    <div className="col-md-3">
                        <i className="bi bi-server"></i>
                        <h3>{survey ? survey.servers : "-:-"}</h3>
                        <span>{translate.pages.home.survey_servers}</span>
                    </div>
                    <div className="col-md-3">
                        <i className="bi bi-people"></i>
                        <h3>{survey ? survey.members : "-:-"}</h3>
                        <span>{translate.pages.home.survey_members}</span>
                    </div>
                    <div className="col-md-3">
                        <i className="bi bi-check2-circle"></i>
                        <h3>{survey ? survey.working : "-:-"}</h3>
                        <span>{translate.pages.home.survey_worked}</span>
                    </div>
                </div>
            </section>
            <Waves position="bottom" r={173} g={216} b={230} />
        </>
    )
}
