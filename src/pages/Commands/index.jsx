import { useState, useEffect } from 'react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import DocumentMeta from 'react-document-meta'

import Header from './Header'
import Body from './Body'

import CookieAccept from '../../components/CookieAccept/index'
import ScrollToTop from '../../components/ScrollToTop/index'
import Waves from '../../components/Waves/index'

import { translator } from '../../utils/functions/translator'

import './style.css'

export default function Commands() {
    const [info, setInfo] = useState()
    const [loaded, setLoaded] = useState(false)

    const meta = {
        title: translator().translate.pages.commands.meta_title,
        description: translator().translate.pages.commands.meta_description,
        canonical: '/commands',
        meta: {
            name: {
                keywords: 'shioru, shioru-discord, discord-bot, bot',
                subject: translator().translate.pages.commands.meta_subject,
                language: 'TH',
                robots: 'index, follow',

                'og:type': 'website',
                'og:image': '/shioru_banner.jpg',
                'og:site_name': 'Shioru'
            }
        }
    }

    useEffect(() => {
        const docRef = doc(getFirestore(), "Information", "shioru");

        getDoc(docRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data()
                const commands = data.commands

                setInfo(commands)
                setLoaded(true)
            } else {
                console.log("Command information not found in the database.")
                setInfo()
                setLoaded(true)
            }
        })
    }, [])

    return (
        <DocumentMeta {...meta}>
            <div className="commands">
                <Header translate={translator().translate} />
                <Waves class={'commands-waves'} r={255} g={255} b={255} />
                {/*
                    <section className="commands-info" id="scroll">
                        <div className="container">
                            <div className="commands-info-working">
                                <div className="row row-cols-1 row-cols-md-2 g-4">
                                    <div className="col">
                                        <div className="commands-info-icon">
                                            <i className="bi bi-robot"></i>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="commands-info-content">
                                            <h2>มันทำงานอย่างไร?</h2>
                                            <p>หลักการทำงานของบอทจะเริ่มต้นจากที่ผู้ใช้ส่งคำสั่งจากแอปพลิเคชั่น Discord จะทำการประมวลผลแล้วส่งข้อมูลในรูปแบบ REST API กลับไปยังเซิร์ฟเวอร์ของผู้ให้บริการเพื่อประมวลผลคำสั่งตามที่ผู้ใช้งานร้องขอ จากนั้นบอทจะส่งข้อมูลที่ประมวลผลแล้วในรูปแบบ Function จากเซิร์ฟเวอร์ผู้ให้บริการไปยัง Discord แล้วดำเนินการตรวจสอบข้อมูลจากนั้นจะส่งข้อมูลกลับให้ผู้ใช้งานทราบถึงผลลัพธ์</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                */}
                <Body translate={translator().translate} code={translator().code} info={info} loaded={loaded} />
            </div>
            <CookieAccept />
            <ScrollToTop />
        </DocumentMeta>
    )
}
