'use client'

import HotjarProvider from "@/components/hotjar/HotjarProvider";
import NewRelicSnippet from "@/components/newRelic/NewRelicSnippet";

export default function Head() {

  const env = process.env.NEXT_PUBLIC_APP_ENVIRONMENT;

  return (
    <>
      {env === 'production' || env === 'staging' ? <NewRelicSnippet /> : null}
      {env === 'production' ? <HotjarProvider /> : null}
    </>
  );
}
