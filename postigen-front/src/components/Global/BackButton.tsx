import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

type BackButtonProps = {
    to: string;
    label: string;
};

const BackButton: React.FC<BackButtonProps> = ({ to, label }) => {
    return (
        <Button component={Link} to={to} variant="outlined">
            {label}
        </Button>
    );
};

export default BackButton;
