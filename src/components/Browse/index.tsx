import * as React from 'react';
import { RouteComponentProps } from "react-router";
import {
    Grid,
    Paper
} from "@material-ui/core";
import {
    withStyles,
    WithStyles
} from "@material-ui/core/styles"
import {
    ContentsArrayType,
    SettingsIsGridLayoutType
} from "../../modules/types";
import BrowseFilter from '../BrowseFilter';
import BrowseLayoutSwitch from '../BrowseLayoutSwitch';
import ContentGrid from '../ContentGrid';
import ContentList from '../ContentList';
import styles from './styles';

namespace Browse {
    interface PropTypes {
        contents: ContentsArrayType,
        isGridLayout: SettingsIsGridLayoutType
    }
    export type Props = PropTypes & WithStyles<typeof styles> & RouteComponentProps
}

class Browse extends React.Component<Browse.Props, {}> {
    getContentsDisplayComponent = () => {
        const {
            contents,
            isGridLayout
        } = this.props;
        return isGridLayout ? (
            <ContentGrid contents={contents} />
        ) : (
            <ContentList contents={contents} />
        )
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper elevation={0} className={classes.paper}>
                <Grid className={classes.headerContainer} container justify="space-between" alignItems="center" spacing={1}>
                    <Grid item>
                        <BrowseFilter />
                    </Grid>
                    <Grid item>
                        <BrowseLayoutSwitch />
                    </Grid>
                </Grid>
                {this.getContentsDisplayComponent()}
            </Paper>
        );
    }
}

export default withStyles(styles)(Browse);