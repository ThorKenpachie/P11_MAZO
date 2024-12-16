import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { API_ENDPOINT } from './Api';

function RegisterVotingSystem() {
    const navigate = useNavigate();

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true); // Start loading state

        try {
            // Ensure correct interpolation of API_ENDPOINT
            const response = await axios.post(`${API_ENDPOINT}/auth/register`, {
                fullname,
                username,
                password,
            });

            if (response.status === 201 || response.status === 200) {
                setError('');
                setSuccess('Registration successful! Redirecting to dashboard...');

                // Clear form after success
                setFullname('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');

                // Redirect to dashboard after a short delay
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                throw new Error('Unexpected response from server');
            }
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Failed to register. Please try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <>
            {/* Navbar */}
            <Navbar style={{ backgroundColor: '#0056b3' }} variant="dark" className="shadow">
                <Container>
                    <Navbar.Brand>Voting System</Navbar.Brand>
                </Container>
            </Navbar>

            {/* Registration Form */}
            <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
                <div className="w-100" style={{ maxWidth: '400px' }}>
                    <div className="text-center mb-4">
                        <h5>Register to Participate in Voting</h5>
                    </div>
                    <div className="card p-4 shadow-sm rounded">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formFullname" className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Full Name"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formUsername" className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formConfirmPassword" className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            {/* Error Message */}
                            {error && <p className="text-danger">{error}</p>}

                            {/* Success Message */}
                            {success && <p className="text-success">{success}</p>}

                            <Button
                                style={{ backgroundColor: '#0056b3', borderColor: '#0056b3' }}
                                type="submit"
                                className="w-100 mb-3"
                                disabled={loading} // Disable button when loading
                            >
                                {loading ? 'Registering...' : 'Register Now'}
                            </Button>

                            {/* Back to Dashboard Button */}
                            <Button
                                variant="outline-secondary"
                                type="button"
                                className="w-100"
                                onClick={() => navigate('/dashboard')}
                            >
                                Back to Dashboard
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterVotingSystem;