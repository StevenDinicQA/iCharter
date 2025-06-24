import { snippet } from './snippet';
import {snippet as snippet_staging } from './snippet_staging';

const env = process.env.NEXT_PUBLIC_APP_ENVIRONMENT;

const NewRelicSnippet = () => {
  
    return (
      <>
        <meta httpEquiv="x-ua-compatible" content="ie=edge"></meta>
        <script
          id="newrelic"
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: env === 'production' ? snippet : snippet_staging }}
        ></script>
      </>
    )
  }
  export default NewRelicSnippet