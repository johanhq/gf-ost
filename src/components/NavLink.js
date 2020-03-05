/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import {
  Link,
  useRouteMatch
} from "react-router-dom";

import B from './block';

function NavLink({ to, children }) {
  let match = useRouteMatch({
    path: to,
    exact: true
  });

  let style = css({
    color: 'black',
    textDecoration: match ? 'underline' : 'none',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    ':hover':{ textDecoration: 'underline' }
  });

  return (
    <B component="li" style={{color: 'black', paddingRight: '1rem'}}>
      <Link to={to} css={style}>{children}</Link>
    </B>
  );
}

export default NavLink;
