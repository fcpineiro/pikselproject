import * as React from 'react';
import {
    RouteComponentProps,
    withRouter
} from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import {
    withStyles,
    WithStyles
} from "@material-ui/core/styles"
import { ContentsArrayType } from "../../modules/types";
import { capitalize } from "../../utils";
import styles from "./styles";

namespace ContentList {
    interface PropTypes {
        contents: ContentsArrayType
    }
    export type Props = PropTypes & WithStyles<typeof styles> & RouteComponentProps;
}

class ContentList extends React.Component<ContentList.Props, {}> {
    navigateToDetails = (id: number) => () => {
        this.props.history.push(`/edit/${id}`);
    };

    render() {
        const { contents, classes } = this.props;
        return (
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contents.map(content => (
                        <TableRow
                            hover
                            key={content.id}
                            className={classes.row}
                            onClick={this.navigateToDetails(content.id)}
                        >
                            <TableCell component="th" scope="row">
                                {content.title}
                            </TableCell>
                            <TableCell align="right">
                                {capitalize(content.type)}
                            </TableCell>
                            <TableCell align="right">{content.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }
}

export default withRouter(withStyles(styles)(ContentList));