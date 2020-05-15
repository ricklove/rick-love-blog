import React from 'react';


export const Footer = (props: { copyrights: string }) => {
  const { copyrights } = props;

  return (
    <footer>
      {copyrights ? (
        <div dangerouslySetInnerHTML={{ __html: copyrights }} />
      ) : (
          <>
            <span className="footerCopyrights">
              © 2020 Built with
            {' '}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </span>
            <span className="footerCopyrights">
              tarter created by
            {' '}
              <a href="https://radoslawkoziel.pl">panr</a>
            </span>
          </>
        )}
    </footer>
  );
};
