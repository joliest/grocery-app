import {render, screen} from '@testing-library/react';
import CardTiles from './CardTiles';

const props = {
    list: [
        {
            name: 'name 1',
            id: 'id 1',
            body1: 'body1 1',
            body2: 'body2 1',
        },
        {
            name: 'name 2',
            id: 'id 2',
            body1: 'body1 2',
            body2: 'body2 2',
        },
    ],
}

const setup = () => {
    const utils = render(<CardTiles {...props} />);
    return {
        ...utils,
    }
}

describe('<CardTiles />', () => {
    let utils;
    beforeEach(() => {
        (utils = setup());
    });
    it.each([
        'name 1', 'name 2',
    ])('renders %s name', (name) => {
        expect(screen.getByRole('heading', { level: 5, name })).toBeInTheDocument();
    });
    it.each([
        'body1 1', 'body1 2',
    ])('renders %s body1', (body1) => {
        expect(screen.getByText(body1)).toBeInTheDocument();
    });
    it.each([
        'body2 1', 'body2 2',
    ])('renders %s body2', (body2) => {
        expect(screen.getByText(body2)).toBeInTheDocument();
    });
})