import { Theme } from "@material-ui/core";
import {
    createStyles
} from '@material-ui/core/styles';

const styles = ({ spacing }: Theme) => createStyles({
    root: {
        width: '100%',
        marginTop: spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    row: {
        cursor: 'pointer'
    }
});

export default styles;