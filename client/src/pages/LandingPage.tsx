// import fs from 'fs';
// import path from 'path';

import { Button, Form, Input, Card } from 'antd';

import {
    Container,
    Row,
} from 'react-bootstrap'

import Auth from '../utils/auth';


const LandingPage = () => {

    return (
        <Container className='mt-5'>
            <Row className='justify-content-center'>
                <Card
                    style={{ width: 250 }}
                    cover={
                        <>
                            <img
                                alt='Landing Page Cover Picture'
                                src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3bf2e45d-2253-4b84-a45b-fbdec02fcd49/dhh7m81-c2929be0-8eda-42d9-840b-2ceb6ef6c44b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNiZjJlNDVkLTIyNTMtNGI4NC1hNDViLWZiZGVjMDJmY2Q0OVwvZGhoN204MS1jMjkyOWJlMC04ZWRhLTQyZDktODQwYi0yY2ViNmVmNmM0NGIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.WUw7JFK6bc8qF6Et7rgB64YU60-VKbv2VPaJFlHt7x8'
                            />

                            <Form>
                                <Form.Item>
                                    <Input placeholder="Username" />
                                </Form.Item>
                                <Form.Item>
                                    <Input placeholder="Password" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary">Submit</Button>
                                </Form.Item>
                            </Form>
                        </>
                    }
                >
                </Card>
            </Row>
        </Container>
    );
};

export default LandingPage;