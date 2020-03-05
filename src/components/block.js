import { css, jsx } from '@emotion/core'; 

const DEFAULT_COMPONENT = 'div';

const Block = ({ component = DEFAULT_COMPONENT, style, children, ...props }) => {
    return jsx(
        component,
        {
            css: css(style),
            ...props
        },
        children
    );
}

export default Block;