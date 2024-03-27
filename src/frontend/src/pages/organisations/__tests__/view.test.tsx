import React from 'react';
import { render, screen } from '@testing-library/react';
import ViewOrganisationPage from "../view";
import { MemoryRouter } from 'react-router-dom';
import { Organisation } from '../../../services/api/interface';

describe('view organisation page', () => {
    it('should render page with labels', () => {

        const organisation: Organisation = {
            id: '123',
            resourceType: 'organization',
            type: 'Test',
            name: 'Test Organisation',
            active: '',
            Address: [],
            createdBy: '',
            createdDateTime: '',
            modifiedBy: '',
            modifiedDateTime: '',
            identifier: {
                type: '',
                use: '',
                value: ''
            }
        };

        render(
            <MemoryRouter initialEntries={[{ pathname: '/organisations/view/1', state: { organisation: organisation } }]}>
                <ViewOrganisationPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Summary')).toBeInTheDocument();
        expect(screen.getByText('Organisation')).toBeInTheDocument();
      });
});
