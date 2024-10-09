import React from 'react';
import { Select } from 'nhsuk-react-components';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ForwardRefSelect = React.forwardRef((props : any) => {
    return <Select {...props}  />;
});

ForwardRefSelect.displayName = 'ForwardRefSelect';

export default ForwardRefSelect;
