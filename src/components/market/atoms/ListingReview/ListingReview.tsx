import { AnchorIcon } from "@/components/shared/general/atoms/icons/AnchorIcon";
import { ListingReviewProps } from "./types";
import moment from 'moment';

export function ListingReview({
  rating,
  date,
  comment,
  customersName,
  experienceName,
}: ListingReviewProps) {

  function formatDate(date: any) {
    return moment(date).format('MMM D, YYYY');
  }

  // select anchor opacity
  function selectAnchorOpacity(index: number) {
    return index >= rating ? 'opacity-50' : '';
  }

  return (
    <div className="text-[#454545] py-[28px] px-[36px] bg-white rounded-[12px] border border-[#EFEFEF] flex flex-col gap-[20px]">
      <div>
        <div className="flex items-center gap-[13px] mb-[10px]">
          <div className={`text-[#2D3AAF] flex item gap-[3px]`}>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <AnchorIcon key={index} size={20} className={ selectAnchorOpacity(index) } />
            ))}
          </div>
          <p className="text-[16px] font-[700]"> {rating }/5</p>
        </div>
        <p className="text-[11px] font-[500] opacity-50">{ formatDate(date) }</p>
      </div>
      <div>
        {
          /*
            <h3 className="text-[20px] font-[700]">
              Great service and experience!
            </h3>
          */
        }
        <p className="text-[16px] font-[400]">
          { comment }
        </p>
      </div>
      <div>
        <p className="text-[13px] font-[500]">
          { customersName }
          <span className="opacity-50">| { experienceName }</span>
        </p>
      </div>
    </div>
  );
}
