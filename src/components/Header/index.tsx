import * as React from 'react';
import {
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import {
    Breadcrumbs,
    Paper,
    Typography
} from "@material-ui/core";
import {
    withStyles,
    WithStyles
} from "@material-ui/core/styles"
import { ContentsGetContentType } from "../../modules/types";
import LinkRouter from '../LinkRouter';
import styles from './styles';

namespace Header {
    interface PropTypes {
        getContent: ContentsGetContentType,
    }
    export type Props = PropTypes & WithStyles<typeof styles> & RouteComponentProps<{ id: string }>;
}

class Header extends React.Component<Header.Props, {}> {
    getLinkComponent = (text: string) => this.props.match.path !== '/' ? (
        <LinkRouter color="inherit" to="/">{text}</LinkRouter>
    ) : (
        <Typography color="inherit">{text}</Typography>
    );

    getPageTitle = () => {
        const {
            getContent,
            match
        } = this.props;
        return match.path === '/'
            ? 'Browse'
            : getContent(Number(match.params.id)).title;
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper elevation={0} className={classes.paper}>
                <Breadcrumbs separator=">" aria-label="Breadcrumb">
                    {this.getLinkComponent('Contents')}
                    <Typography color="textPrimary">{this.getPageTitle()}</Typography>
                </Breadcrumbs>
            </Paper>
        );
    }
}

export default withRouter(withStyles(styles)(Header));