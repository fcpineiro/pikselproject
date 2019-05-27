import * as React from 'react';
import { Link } from 'react-router-dom';

const AdapterLink = React.forwardRef((props: any, ref) => <Link innerRef={ref} {...props} />);

export default AdapterLink;