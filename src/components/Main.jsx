import { Container, Row, Col } from "react-bootstrap"
import Jumbotron from "./Jumbotron/Index"
import { useCallback, useEffect, useState } from "react"

export default function Main() {

    const [myProfile, setMyProfile] = useState()
   
    const getMyProfile = useCallback(() => {
        fetch("https://striveschool-api.herokuapp.com/api/profile/me",{
            headers: {
                Authorization: "Bearer ...."
                }
        
        })
        .then((r) => r.json())
        .then(setMyProfile)
    }, [])

    useEffect(()=> {
        getMyProfile()
    },[getMyProfile])


    return (
        <Container className="mt-4">
            <Row>
                <Col xs={8}>
                    {myProfile && <Jumbotron myProfile={myProfile}/>}
                </Col>
            </Row>
        </Container>
    )
}