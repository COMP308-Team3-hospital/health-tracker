import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button, Form, Container, Alert } from 'react-bootstrap';

const ADD_EMERGENCY_MUTATION = gql`
  mutation AddEmergency($userId: String!, $description: String!, $status: String!) {
    addEmergency(userId: $userId, description: $description, status: $status) {
      id
      userId
      description
      status
      dateCreated
    }
  }
`;

function AlertsComponent() {
    const [description, setDescription] = useState('');
    const [sending, setSending] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [addEmergency] = useMutation(ADD_EMERGENCY_MUTATION, {
        onCompleted: () => {
            setSending(false);
            setShowConfirmation(true);
            setDescription('');
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description.trim()) return;
        setSending(true);
        const userId = 'user_id_placeholder';
        const status = 'New'; // You might adjust this depending on your requirements
        await addEmergency({ variables: { userId, description, status } });
    };

    return (
        <Container>
            <h2>Add Emergency Alert</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter emergency description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={sending}>
                    {sending ? 'Sending...' : 'Submit Emergency Alert'}
                </Button>
            </Form>

            {showConfirmation && (
                <Alert variant="success" className="mt-3">
                    Emergency alert has been forwarded to first responders.
                </Alert>
            )}
        </Container>
    );
}

export default AlertsComponent;
