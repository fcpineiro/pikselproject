import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
    Grid,
    Typography
} from "@material-ui/core";
import {
    withStyles,
    WithStyles
} from "@material-ui/core/styles";
import {
    ContentsGetContentType,
    ContentsGetEpisodesType
} from "../../modules/types";
import ContentGrid from '../ContentGrid';
import DetailsInfo from '../DetailsInfo';
import styles from './styles';

namespace Details {
    interface PropTypes {
        getContent: ContentsGetContentType,
        getEpisodes: ContentsGetEpisodesType
    }
    export type Props = PropTypes & WithStyles<typeof styles> & RouteComponentProps<{ id: string }>;
}

class Details extends React.Component<Details.Props, {}> {
    showEpisodes = (ids: Array<number>) => {
        const {
            classes,
            getEpisodes
        } = this.props;
        return (
            <Grid item className={classes.container}>
                <Typography color="textSecondary">
                    {ids.length > 0 ? 'Episodes' : 'This show doesn\'t have episodes'}
                </Typography>
                <ContentGrid contents={getEpisodes(ids)} />
            </Grid>
        );
    };

    render() {
        const {
            classes,
            getContent,
            match
        } = this.props;
        const content = getContent(Number(match.params.id));
        return (
            <Grid className={classes.container} direction="column" justify="flex-start" container>
                <Grid item container alignItems="flex-start" spacing={3}>
                    <Grid item xs={3}>
                        <img className={classes.image} src={content.imageUrl} alt=""/>
                    </Grid>
                    <Grid item xs>
                        <DetailsInfo content={content} getContent={getContent} />
                    </Grid>
                </Grid>
                {content.type === 'show' ? this.showEpisodes(content.episodes) : null}
            </Grid>
        );
    }
}

export default withStyles(styles)(Details);