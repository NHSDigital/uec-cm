import React from 'react';
import { TextInput } from 'nhsuk-react-components';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ForwardRefInput = React.forwardRef((props: any, ref : unknown) => {
    return <TextInput {...props} inputRef={ref} />;
});

ForwardRefInput.displayName = 'ForwardRefInput';

export default ForwardRefInput;
