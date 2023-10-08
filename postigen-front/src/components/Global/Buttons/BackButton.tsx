import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Buttons.css';

type BackButtonProps = {
    to: string;
    label: string;
};

const BackButton: React.FC<BackButtonProps> = ({ to, label }) => {
    return (
        <Button component={Link} to={to} className="custom-button">
            <ArrowBackIcon />
        </Button>
    );
};

export default BackButton;
