import * as React from 'react';
import { connect } from "react-redux";
import {
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    Switch,
    Typography
} from "@material-ui/core";
import {
    withStyles,
    WithStyles
} from "@material-ui/core/styles"
import {
    toggleLayout
} from '../../modules/actions';
import {
    getSettingsIsGridLayout
} from "../../modules/selectors";
import {
    SettingsIsGridLayoutType
} from "../../modules/types";
import styles from "./styles";

namespace BrowseLayoutSwitch {
    interface PropTypes {
        isGridLayout: SettingsIsGridLayoutType,
        switchLayoutMode: () => void
    }
    export type Props = PropTypes & WithStyles<typeof styles>
}

class BrowseLayoutSwitch extends React.Component<BrowseLayoutSwitch.Props, {}> {

    handleChange = () => { this.props.switchLayoutMode() };

    render() {
        const {
            classes,
            isGridLayout,
            switchLayoutMode
        } = this.props;
        return (
            <FormControl component="fieldset">
                <FormLabel className={classes.legend} component="legend">Layout</FormLabel>
                <FormGroup aria-label="layout" row>
                    <Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>List</Grid>
                            <Grid item>
                                <FormControlLabel
                                    className={classes.switch}
                                    control={<Switch color="primary" checked={isGridLayout} onChange={switchLayoutMode}/>}
                                    label="Grid"
                                    labelPlacement="end"
                                />
                            </Grid>
                        </Grid>
                    </Typography>
                </FormGroup>
            </FormControl>
        );
    }
}

const mapStateToProps = (state: any) => ({
    isGridLayout: getSettingsIsGridLayout(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    switchLayoutMode: () => dispatch(toggleLayout())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(BrowseLayoutSwitch));