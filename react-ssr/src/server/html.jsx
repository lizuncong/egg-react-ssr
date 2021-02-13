import React from 'react';

export default function Html({
  title,
  description,
  cssLinks,
  children,
  state,
  scriptTags,
  linkTags,
  styleTags,
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {linkTags}
        {styleTags}
        {
            cssLinks.map((csslink) => (
              <link key={csslink} href={csslink} rel="stylesheet" />
            ))
        }
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
        <script
          dangerouslySetInnerHTML={{ __html: `window.INITIAL_STATE=${JSON.stringify(state)}` }}
        />
        {scriptTags}
      </body>
    </html>
  );
}
