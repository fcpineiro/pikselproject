import * as React from 'react';
import { connect } from "react-redux";
import {
    Checkbox,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel
} from "@material-ui/core";
import { toggleFilterValue } from '../../modules/actions';
import { getSettingsFilter } from "../../modules/selectors";
import {
    SettingsFilterType,
    SettingsFilterValuesType
} from "../../modules/types";

namespace BrowseFilter {
    export interface PropTypes {
        filter: SettingsFilterType,
        changeFilterValue: (value: SettingsFilterValuesType) => void
    }
}

class BrowseFilter extends React.Component<BrowseFilter.PropTypes, {}> {

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement; // TS won't even recognize that event.target has a value prop
        const value = target.value as SettingsFilterValuesType; // TS typing shenanigan over here. I'm pretty sad.
        this.props.changeFilterValue(value);
    };

    render() {
        const { filter } = this.props;
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">Filter</FormLabel>
                <FormGroup aria-label="filter" onChange={this.handleChange} row>
                    <FormControlLabel
                        checked={filter.has('show')}
                        value="show"
                        control={<Checkbox color="primary" inputProps={{
                            'aria-label': 'Shows filter checkbox'
                        }} />}
                        label="Shows"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        checked={filter.has('episode')}
                        value="episode"
                        control={<Checkbox color="primary" inputProps={{
                            'aria-label': 'Episodes filter checkbox'
                        }}  />}
                        label="Episodes"
                        labelPlacement="end"
                    />
                </FormGroup>
            </FormControl>
        );
    }
}

const mapStateToProps = (state: any) => ({
    filter: getSettingsFilter(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    changeFilterValue: (value: SettingsFilterValuesType) => dispatch(toggleFilterValue(value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BrowseFilter);