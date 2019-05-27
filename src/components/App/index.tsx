import * as React from 'react';
import { connect } from "react-redux";
import {
    Route,
    RouteComponentProps
} from 'react-router-dom';
import {
    Container,
} from "@material-ui/core";
import {
    withStyles,
    WithStyles
} from "@material-ui/core/styles"
import {
    getContentById,
    getEpisodesByIds,
    getFilteredContents,
    getSettingsIsGridLayout
} from "../../modules/selectors";
import {
    ContentsArrayType,
    ContentsGetContentType,
    ContentsGetEpisodesType,
    SettingsIsGridLayoutType
} from "../../modules/types";
import Header from '../Header';
import Browse from '../Browse';
import Details from '../Details';
import styles from './styles';

namespace App {
    interface PropTypes {
        contents: ContentsArrayType,
        getContent: ContentsGetContentType,
        getEpisodes: ContentsGetEpisodesType,
        isGridLayout: SettingsIsGridLayoutType
    }
    export type Props = PropTypes & WithStyles<typeof styles>
}

class App extends React.Component<App.Props, {}> {
    render() {
        const {
            classes,
            contents,
            getContent,
            getEpisodes,
            isGridLayout
        } = this.props;
        return (
            <Container className={classes.root}>

                <Route
                    exact
                    path={['/', '/edit/:id']}
                    render={(routeProps: RouteComponentProps) => (
                        <Header {...routeProps} getContent={getContent}/>
                    )}
                />
                <Route
                    exact
                    path="/"
                    render={(routeProps: RouteComponentProps) => (
                        <Browse {...routeProps} contents={contents} isGridLayout={isGridLayout}/>
                    )}
                />
                <Route // This will keep warning for an "id" prop no matter what, when it's supposed to be a match param
                    path="/edit/:id"
                    render={(routeProps: RouteComponentProps<{ id: string }>) => (
                        <Details {...routeProps} getContent={getContent} getEpisodes={getEpisodes} />
                    )}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state: any) => ({
    contents: getFilteredContents(state),
    getContent: getContentById(state),
    getEpisodes: getEpisodesByIds(state),
    isGridLayout: getSettingsIsGridLayout(state)
});

export default connect(
    mapStateToProps,
)(withStyles(styles)(App));