import * as React from 'react';
import { Link } from "@material-ui/core";
import { NavLink } from 'react-router-dom';

const LinkRouter = (props: any) => <Link {...props} component={NavLink} />;

export default LinkRouter;