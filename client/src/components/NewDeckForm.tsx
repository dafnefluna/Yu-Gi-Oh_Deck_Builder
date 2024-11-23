import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



const NewDeckModal: React.FC = () => {
    const [show, setShow] = useState<boolean | undefined>(undefined);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // note: will need to create a function for maping the types: 'main', 'side', 'extra', 'draft'
    // saving form data from the user and set it to createnewdeckmutation

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create New Deck
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>My New Deck</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Deck Name</InputGroup.Text>
                        <Form.Control placeholder="e.g. Meteor Dragon Red-Eyes Impact" aria-label="e.g. Meteor Dragon Red-Eyes Impact" aria-describedby="basic-addon1" />
                        <Form>
                            {/* this is a switch that does the true or false */}
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label="Check if Playable"
                            />
                            {/* this is a checkbox component  */}
                            {['checkbox', 'radio'].map((type) => (
                                <div key={`default-${type}`} className="mb-3">
                                    <Form.Check // prettier-ignore
                                        // type={type}
                                        id={`default-${type}`}
                                        label={`default ${type}`}
                                    />
                                </div>
                            ))}
                        </Form>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save New Deck
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewDeckModal




