import * as React from 'react';
import { Link as RouterLink  } from "@remix-run/react";

const Link = React.forwardRef(function AnchorOrLink(props, ref) {
  const {
    to,
    href,
    download,
    reload = false,
    prefetch,
    children,
    ...rest
  } = props;
  let toUrl = '';
  let shouldUserRegularAnchor = reload || download;

  if (!shouldUserRegularAnchor && typeof href === 'string') {
    shouldUserRegularAnchor = href.includes(':') || href.startsWith('#');
  }

  if (!shouldUserRegularAnchor && typeof to === 'string') {
    toUrl = to;
    shouldUserRegularAnchor = to.includes(':');
  }

  if (!shouldUserRegularAnchor && typeof to === 'object') {
    toUrl = `${to.pathname ?? ''}${to.hash ? `#${to.hash}` : ''}${
      to.search ? `?${to.search}` : ''
    }`;
    shouldUserRegularAnchor = to.pathname?.includes(':');
  }
  /*eslint-disable */
  if (shouldUserRegularAnchor) {
    return (
      <a {...rest} download={download} href={href ?? toUrl} ref={ref}>
        {children}
      </a>
    );
  } else {
    return (
      <RouterLink prefetch={prefetch} to={to ?? href ?? ''} {...rest} ref={ref}>
        {children}
      </RouterLink>
    );
  }
});

export default Link;