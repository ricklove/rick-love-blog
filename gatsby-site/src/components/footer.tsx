// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-danger */
import React from 'react';


export const Footer = ({ copyrights }: { copyrights: string }) => {

  return (
    <footer>
      {copyrights ? (
        <div dangerouslySetInnerHTML={{ __html: copyrights }} />
      ) : (
          <>
            <span className='footerCopyrights'>
              © 2020 Built with
            {' '}
              <a href='https://www.gatsbyjs.org'>Gatsby</a>
            </span>
            <span className='footerCopyrights'>
              tarter created by
            {' '}
              <a href='https://radoslawkoziel.pl'>panr</a>
            </span>
          </>
        )}
    </footer>
  );
};
