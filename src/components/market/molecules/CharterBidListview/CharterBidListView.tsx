import { nanoid } from "nanoid";
import { Chip } from "@mui/material";
import { CharterBidListViewProps } from "./types";

export function CharterBidListView({ rows }: CharterBidListViewProps) {

  return (
    <table className="w-full border-separate border-spacing-y-[10px]">
      <thead>
        <tr>
          {[ "Experience", "My Bid", "Status"].map(
            (heading, index) => (
              <th
                key={nanoid()}
                className={`${index === 0 && "rounded-l-[12px] pl-[20px]"} ${
                  index === 2 && "rounded-r-[12px]"
                } text-[13px] font-[500] py-2 uppercase bg-[#EFEFEF] text-start`}
              >
                {heading}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody className="text-center">
        {rows && rows.map((rowData) => {
          return (
            <tr key={rowData.id} className="text-[#454545] h-[85px] outline outline-[#EFEFEF] bg-[#F9F9F9] rounded-[12px]">
              <td className="text-[16px] font-[400]">
                <div className="flex m-5 flex-col text-start">
                  <span className="max-w-[400px] text-[#2D3AAF] text-[14px] font-[500]">{rowData.experienceName}
                  <Chip
                  label={rowData.boatDuration}
                  sx={{
                    fontSize: "8px",
                    fontWeight: "500",
                    color: "#2D3AAF",
                    backgroundColor: "#E0E2F0",
                    height: "18px",
                    marginLeft: "5px"
                  }}
                /></span>
                  <span className="max-w-[400px] text-[400] text-[12px] mt-2">{rowData.departureDate}</span>
                  <span className="max-w-[400px] text-[400] text-[12px] mt-2">{rowData.streetAddress}</span>
                  <span className="max-w-[400px] text-[400] text-[12px] mt-2">{`${rowData.guestCapacity} ${rowData.guestCapacity > 1 ? "Guests" : "Guest" }`}</span>
                </div>
              </td>
              <td className="text-start">
                <span className="text-[#2D3AAF] text-[14px] font-[500]">${rowData.bidAmount}</span>
              </td>
              <td className="text-start">
                <Chip
                  label={rowData.status}
                  sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: rowData.status === "accepted" ? "#2B9251" : "#DA7501",
                    backgroundColor: rowData.status === "accepted" ? "#CBF1D9" : "#FBE6CE",
                  }}
                />
              </td>
            </tr>
          )})
        }
      </tbody>
    </table>
  );
}
