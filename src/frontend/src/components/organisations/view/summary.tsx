import React from 'react';
import { SummaryList } from 'nhsuk-react-components';
import { OrganisationSummaryProps } from './interface';
import './styles.css';

const OrganisationSummary: React.FC<OrganisationSummaryProps> = ({ organisation }) => {
    return (
        <div data-testid='organisation-summary'>
            <SummaryList>
                <SummaryList.Row>
                    <SummaryList.Key className='summary-key'>
                        Name
                    </SummaryList.Key>
                    <SummaryList.Value data-testid='organisation-name'>
                        {organisation.name}
                    </SummaryList.Value>
                </SummaryList.Row>
            </SummaryList>
        </div>
    );
};

export default OrganisationSummary;
