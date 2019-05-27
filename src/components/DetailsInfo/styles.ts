import { Theme } from "@material-ui/core";
import {
    createStyles
} from '@material-ui/core/styles';

const styles = ({ spacing }: Theme) => createStyles({
    paper: {
        padding: spacing(1, 2),
    },
    fieldset: {
        width: '100%'
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2
    }
});

export default styles;