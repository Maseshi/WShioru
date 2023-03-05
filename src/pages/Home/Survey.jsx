import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, child, set } from 'firebase/database'
import Waves from '../../components/Waves/index'

export default function Survey(props) {
    const [statistics, setStatistics] = useState()

    const translate = props.language

    useEffect(() => {
        const statisticsRef = ref(getDatabase(), 'statistics/shioru')
        onValue(statisticsRef, snapshot => {
            if (snapshot.exists()) {
                setStatistics(snapshot.val())
            } else {
                set(child(statisticsRef, 'size'), {
                    "commands": 0,
                    "guilds": 0,
                    "users": 0,
                    "worked": 0
                })
            }
        })
    }, [])

    return (
        <>
            <Waves position="top" r={173} g={216} b={230} />
            <section className="home-survey">
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        <div className="col">
                            <i className="bi bi-code-slash"></i>
                            <h3>{statistics ? statistics.size.commands.toLocaleString() : "-:-"}</h3>
                            <span>{translate.pages.home.survey_commands}</span>
                        </div>
                        <div className="col">
                            <i className="bi bi-server"></i>
                            <h3>{statistics ? statistics.size.guilds.toLocaleString() : "-:-"}</h3>
                            <span>{translate.pages.home.survey_servers}</span>
                        </div>
                        <div className="col">
                            <i className="bi bi-people"></i>
                            <h3>{statistics ? statistics.size.users.toLocaleString() : "-:-"}</h3>
                            <span>{translate.pages.home.survey_members}</span>
                        </div>
                        <div className="col">
                            <i className="bi bi-check2-circle"></i>
                            <h3>{statistics ? statistics.size.worked.toLocaleString() : "-:-"}</h3>
                            <span>{translate.pages.home.survey_worked}</span>
                        </div>
                    </div>
                </div>
            </section>
            <Waves position="bottom" r={173} g={216} b={230} />
        </>
    )
}
