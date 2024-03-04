import React from 'react';
import CardGroup from '../../components/cardGroup';
import Banner from '../../components/banner';
import { cards } from './cards';

const OrganisationsPage: React.FC = () => {
    return (
        <>
            <Banner
                heading='Organisations'
                text='If you wish to add a new entry, first search to check it does not already exist'
            />
            <div className="nhsuk-width-container">
                <div className="nhsuk-u-padding-top-8">
                    <CardGroup cards={cards} />
                </div>
            </div>
        </>
    );
};

export default OrganisationsPage;
