import Script from 'next/script'
import React from 'react'

const HotjarProvider = () => {
  return (
    <>
    <Script
      id="hotjar-analytics"
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{ 
        __html: `
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3844862,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
    
    }}
    ></Script>
  </>
  )
}

export default HotjarProvider