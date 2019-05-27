import { Theme } from "@material-ui/core/styles";
import {
    createStyles
} from '@material-ui/core/styles';

const styles = ({
    palette,
    transitions
}: Theme) => createStyles({
    container: {
        padding: '20px 40px',
    },
    button: {
        position: 'relative',
        height: '100%',
        width: '100%',
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.05,
            },
        }
    },
    focusVisible: {},
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: palette.common.black,
        opacity: 0.3,
        transition: transitions.create('opacity'),
    },
    score: {
        marginTop: 2,
        marginBottom: 6,
        backgroundColor: '#6c3',
        color: '#fff',
        fontSize: 14,
        lineHeight: '15px',
        height: 28,
        width: 28
    }
});

export default styles;