import React from 'react'

const CharterBidDiscountTag = ({tagName}: {tagName: string}) => {

    let textColor;
    let bgColor;

    switch(tagName) {
        case 'veteran': {
            textColor = '#008BD0';
            bgColor = '#D9EEF7';
            break;
        }
        case 'military': {
            textColor = '#3F8E84';
            bgColor = '#D9F5F2';
            break;
        }
        case 'veteran': {
            textColor = '#008BD0';
            bgColor = '#D9EEF7';
            break;
        }
        case 'first responders': {
            textColor = '#543EAB';
            bgColor = '#E5E3F0';
            break;
        }

        default: {
            textColor = '#008BD0';
            bgColor = '#D9EEF7';
            break;
        }
    }


  return (
    <div className={`bg-[${bgColor}] h-[31px] px-[14px] py-[6px] rounded-[25px] flex items-center w-fit`}>
        <p className={`font-medium text-[12px] leading-[18px] text-[${textColor}] capitalize`}>{tagName}</p>
    </div>
  )
}

export default CharterBidDiscountTag