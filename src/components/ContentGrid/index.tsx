import * as React from 'react';
import {
    Avatar,
    ButtonBase,
    GridList,
    GridListTile,
    GridListTileBar,
} from '@material-ui/core';
import {
    withStyles,
    WithStyles
} from "@material-ui/core/styles"
import { ContentsArrayType } from "../../modules/types";
import AdapterLink from '../AdapterLink';
import styles from "./styles";

namespace ContentGrid {
    interface PropTypes {
        contents: ContentsArrayType
    }
    export type Props = PropTypes & WithStyles<typeof styles>
}

const ContentGrid = (props: ContentGrid.Props) =>{
    const { contents, classes } = props;
    return (
        <GridList className={classes.container} cellHeight={230} spacing={50} cols={4}>
            {contents.map(content => (
                    <GridListTile key={content.id} cols={1}>
                        <ButtonBase
                            href={null}
                            focusRipple
                            className={classes.button}
                            focusVisibleClassName={classes.focusVisible}
                            component={AdapterLink}
                            to={`/edit/${content.id}`}
                        >
                            <img height={230} src={content.imageUrl} alt={content.title} />
                            <span className={classes.imageBackdrop} />
                            <GridListTileBar
                                title={content.title}
                                subtitle={
                                    <Avatar className={classes.score} component="span">
                                        {content.score}
                                    </Avatar>
                                }
                            />
                        </ButtonBase>
                    </GridListTile>
            ))}
        </GridList>
    );
};

export default withStyles(styles)(ContentGrid);