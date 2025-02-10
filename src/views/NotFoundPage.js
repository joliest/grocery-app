import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const NotFoundPage = () => {
    return (
        <>
            <Typography variant="h2">404 not found</Typography>
            <Link to="/">Home</Link>
        </>
    );
}

export default NotFoundPage;