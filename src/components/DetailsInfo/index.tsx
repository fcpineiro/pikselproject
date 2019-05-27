import * as React from 'react';
import { connect } from 'react-redux';
import { Moment } from "moment";
import MomentUtils from '@date-io/moment';
import {
    Button,
    Chip,
    FormControl,
    FormGroup,
    FormLabel,
    Input,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField
} from "@material-ui/core";
import {
    withStyles,
    WithStyles
} from "@material-ui/core/styles";
import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';
import ChipInput from 'material-ui-chip-input';
import {updateContent} from "../../modules/actions";
import { getEpisodes } from "../../modules/selectors";
import {
    ContentType,
    ContentsArrayType,
    ContentsGetContentType,
    ContentEditableKeysType,
} from "../../modules/types";
import { capitalize } from "../../utils";
import styles from './styles';

namespace DetailsInfo {
    interface PropTypes {
        content: ContentType,
        episodes: ContentsArrayType,
        getContent: ContentsGetContentType,
        saveContent: (content: ContentType) => void
    }
    export type StateTypes = {
        content: ContentType,
        releaseDateHolder: Date
    };
    export type Props = PropTypes & WithStyles<typeof styles>;
}

class DetailsInfo extends React.Component<DetailsInfo.Props, DetailsInfo.StateTypes> {
    state: DetailsInfo.StateTypes = {
        content: {
            id: -1,
            title: '',
            type: 'episode',
            categories: new Array<string>(),
            synopsis: '',
            releaseDate: new Date(),
            score: 0,
            imageUrl: ''
        },
        releaseDateHolder: new Date()
    };

    static getDerivedStateFromProps(props: DetailsInfo.Props, state: DetailsInfo.StateTypes) {
        return props.content.id !== state.content.id ? {
            ...state,
            content: { ...props.content },
            releaseDateHolder: new Date(props.content.releaseDate)
        } : state;
    }

    handleTextFieldChange = (field: ContentEditableKeysType) => (event: any) => {
        const value = event.target.value; // More of this TS shenanigans
        // Due for this to be a sink object injection I need to ignore the typing here in order to reuse this handler
        // @ts-ignore
        this.setState({ content: {
                ...this.state.content,
                ...{ [field]: value }
            }});
    };

    handleNumberFieldChange = (field: ContentEditableKeysType) => (event: any) => {
        const value = Number(event.target.value); // More of it
        // Same than previous
        // @ts-ignore
        this.setState({ content: {
            ...this.state.content,
            ...{ [field]: value }
        }});
    };

    handleChipInputAdd = (value: string) => {
        const { content } = this.state;
        const lowerCaseValue = value.toLowerCase();
        if (!content.categories.includes(lowerCaseValue)) {
            this.setState({ content: {
                ...content,
                categories: [...content.categories, lowerCaseValue].sort()
            }});
        }
    };

    handleChipInputDelete = (value: string) => {
        const { content } = this.state;
        this.setState({ content: {
            ...content,
            categories: content.categories.filter(
            (category: string) => category !== value.toLowerCase()
            )
        }});
    };

    handleDatePickerChange = (moment: Moment) => {
        this.setState({ releaseDateHolder: moment.toDate() });
    };

    handleDatePickerAccept = (moment: Moment) => {
        this.setState({
            content: {
                ...this.state.content,
                releaseDate: moment.toDate()
            }
        });
    };

    handleDatePickerClose = () => {
        this.setState({ releaseDateHolder: new Date(this.state.content.releaseDate) });
    };

    handleEpisodesSelectChange = (event: any) => {
        const value = event.target.value as Array<number>; // Weak typing due to TS shenanigans
        this.setState({
            content: {
                ...this.state.content,
                episodes: [...value.sort()]
            }
        });
    };

    hasContentChanged = () => (JSON.stringify(this.props.content) === JSON.stringify(this.state.content));

    handleSaveChanges = () => {
        this.props.saveContent({
            ...this.state.content
        })
    };

    render() {
        const {
            classes,
            episodes,
            getContent
        } = this.props;
        const {
            content,
            releaseDateHolder
        } = this.state;
        return (
            <Paper elevation={0} className={classes.paper}>
                <FormControl component="fieldset" className={classes.fieldset}>
                    <FormLabel component="legend">Info</FormLabel>
                    <FormGroup aria-label="info" row>
                        <TextField
                            disabled
                            label="ID"
                            value={content.id}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            disabled
                            label="Type"
                            value={capitalize(content.type)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Title"
                            value={content.title}
                            onChange={this.handleTextFieldChange('title')}
                            fullWidth
                            margin="normal"
                        />
                        <ChipInput
                            label="Categories"
                            value={content.categories.map(capitalize)}
                            onAdd={this.handleChipInputAdd}
                            onDelete={this.handleChipInputDelete}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            multiline
                            label="Synopsis"
                            value={content.synopsis}
                            onChange={this.handleTextFieldChange('synopsis')}
                            fullWidth
                            margin="normal"
                        />
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DatePicker
                                label="Release date"
                                views={["year", "month", "date"]}
                                format="MMMM Do, YYYY"
                                value={releaseDateHolder}
                                onChange={this.handleDatePickerChange}
                                onAccept={this.handleDatePickerAccept}
                                onClose={this.handleDatePickerClose}
                                fullWidth
                                margin="normal"
                            />
                        </MuiPickersUtilsProvider>
                        <TextField
                            label="Score"
                            value={content.score}
                            onChange={this.handleNumberFieldChange('score')}
                            fullWidth
                            margin="normal"
                        />
                        {
                            content.type === 'show' ? (
                                <FormControl margin="normal">
                                    <InputLabel htmlFor="select-multiple-chip">Episodes</InputLabel>
                                    <Select
                                        multiple
                                        value={content.episodes}
                                        onChange={this.handleEpisodesSelectChange}
                                        input={<Input id="episodesSelect" />}
                                        renderValue={
                                            (selectedEpisodes: Array<number>) => (
                                                <div className={classes.chips}>
                                                    {selectedEpisodes.map(selectedEpisode => (
                                                        <Chip
                                                            key={`${selectedEpisode}_Selected`}
                                                            label={getContent(selectedEpisode).title}
                                                            className={classes.chip}
                                                        />
                                                    ))}
                                                </div>
                                            )
                                        }
                                    >
                                        {episodes.map(episode => (
                                            <MenuItem key={`${episode.id}_MenuList`} value={episode.id}>
                                                {episode.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            ) : null
                        }
                        <TextField
                            label="Image URL"
                            value={content.imageUrl}
                            onChange={this.handleTextFieldChange('imageUrl')}
                            fullWidth
                            margin="normal"
                        />
                        <FormControl margin="normal">
                            <Button
                                disabled={this.hasContentChanged()}
                                onClick={this.handleSaveChanges}
                                variant="contained"
                                color="primary"
                            >
                                Save
                            </Button>
                        </FormControl>
                    </FormGroup>
                </FormControl>
            </Paper>
        );
    }
}

const mapStateToProps = (state: any) => ({
    episodes: getEpisodes(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    saveContent: (content: ContentType) => dispatch(updateContent(content))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(DetailsInfo));