import React, { useState, useEffect } from 'react';
import { Markup } from 'interweave';

import { getUsageAgreementContent } from '../../../api/StaticContentApi';

const TermsOfUse = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getUsageAgreementContent().then((res) =>
      setContent(res.data.usage_agreement)
    );
  }, []);

  return (
    <div className="terms-wrapper">
      <div className="container home">
        <div className="terms-of-use">
          <Markup content={content} />
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
