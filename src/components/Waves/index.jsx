import './style.css'

export default function Waves(props) {
    const positionProps = props.position
    const classProps = props.class
    let rProps = props.r ? props.r : 240
    let gProps = props.g ? props.g : 240
    let bProps = props.b ? props.b : 250

    // Condition of R color
    if (typeof rProps === 'string') {
        rProps = 240
        console.log('Color R must be a number only.')
    }
    if ((typeof rProps === 'number' && rProps > 255) || (typeof rProps === 'number' && rProps < 0)) {
        rProps = (rProps > 255 ? 255 : rProps) || (rProps < 0 ? 0 : rProps)

        console.log('Color R should not be greater than 255 and less than 0.')
    }

    // Condition of G color
    if (typeof gProps === 'string') {
        gProps = 240
        console.log('Color G must be a number only.')
    }
    if ((typeof gProps === 'number' && gProps > 255) || (typeof gProps === 'number' && gProps < 0)) {
        gProps = (gProps > 255 ? 255 : gProps) || (gProps < 0 ? 0 : gProps)

        console.log('Color G should not be greater than 255 and less than 0.')
    }

    // Condition of B color
    if (typeof bProps === 'string') {
        bProps = 250
        console.log('Color B must be a number only.')
    }
    if ((typeof bProps === 'number' && bProps > 255) || (typeof bProps === 'number' && bProps < 0)) {
        bProps = (bProps > 255 ? 255 : bProps) || (bProps < 0 ? 0 : bProps)

        console.log('Color B should not be greater than 255 and less than 0.')
    }

    return (
        <div className={
            positionProps ? (
                positionProps === 'top' ? (
                    "waves-top " + classProps
                ) : (
                    "waves-bottom " + classProps
                )
            ) : (
                !positionProps && classProps ? (
                    classProps
                ) : (
                    "waves-top"
                )
            )
        }>
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                    <path id={"waves-gentle-wave"} d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="waves-parallax">
                    <use xlinkHref={"#waves-gentle-wave"} x="48" y="0" fill={"rgba(" + rProps.toString() + ", " + gProps.toString() + ", " + bProps.toString() + ", 0.7)"} />
                    <use xlinkHref={"#waves-gentle-wave"} x="48" y="3" fill={"rgba(" + rProps.toString() + ", " + gProps.toString() + ", " + bProps.toString() + ", 0.5)"} />
                    <use xlinkHref={"#waves-gentle-wave"} x="48" y="5" fill={"rgba(" + rProps.toString() + ", " + gProps.toString() + ", " + bProps.toString() + ", 0.3)"} />
                    <use xlinkHref={"#waves-gentle-wave"} x="48" y="7" fill={"rgba(" + rProps.toString() + ", " + gProps.toString() + ", " + bProps.toString() + ", 1)"} />
                </g>
            </svg>
        </div>
    )
}
