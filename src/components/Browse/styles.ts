import { Theme } from "@material-ui/core";
import {
    createStyles
} from '@material-ui/core/styles';

const styles = ({ spacing }: Theme) => createStyles({
    paper: {
        marginTop: 20,
        padding: spacing(1, 2),
    },
    headerContainer: {
        paddingTop: 10,
        paddingBottom: 20
    }
});

export default styles;