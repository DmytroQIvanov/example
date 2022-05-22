import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function AddressReport(props: { onClose: () => void }) {
  const { onClose } = props;
  return (
    <div className="flex h-full w-full flex-row overflow-auto rounded-lg bg-white p-3">
      <div className="">
        <AiOutlineCloseCircle
          onClick={onClose}
          className="h-6 w-6 hover:cursor-pointer hover:text-red-600"
        />
      </div>
      <div className="flex flex-auto flex-col p-10">
        <div className="text-center text-3xl tracking-wide">
          View Address Record for &lt;Name / PID&gt;
        </div>
        <div className="pt-3 text-lg font-extrabold ">Formatted Address</div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3 py-3 sm:flex-row">
            <div className="flex w-full flex-col sm:w-1/2">
              <div className="text-xs">Google Formatted</div>
              <div className="text-sm font-semibold ">
                6003 Calmfield Ave, Agoura Hills, CA 91301, USA
              </div>
            </div>
            <div className="flex w-full flex-col sm:w-1/2">
              <div className="text-xs ">Address Accuracy</div>
              <div className="text-sm font-semibold">ROOFTOP</div>
            </div>
          </div>
          <div className="flex flex-col gap-3 py-3 sm:flex-row">
            <div className="flex w-full flex-col sm:w-1/2">
              <div className="text-xs ">Normalized Address</div>
              <div className="text-sm font-semibold ">
                6003 Calmfield Ave, Agoura Hills, CA 91301, USA
              </div>
            </div>
            <div className="flex w-full flex-col sm:w-1/2">
              <div className="text-xs ">Address Coordinatates</div>
              <div className="text-xs font-semibold">
                (34, 1596384,-118, 7562152)
              </div>
            </div>
          </div>
          <hr className="border-black" />
        </div>
        <div className="py-3 text-lg font-extrabold ">Address Details</div>
        <div className="flex flex-col gap-3 pb-6 xl:flex-row">
          <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-1/2">
            <div className="flex w-full flex-row sm:w-1/2">
              <div className="flex flex-col gap-2">
                <div className="text-xs ">Street Number</div>
                <div className="text-sm font-semibold">6003</div>
              </div>
            </div>
            <div className="flex w-full flex-row sm:w-1/2">
              <div className="flex flex-col gap-2">
                <div className="text-xs ">Street Name</div>
                <div className="text-sm font-semibold">Calmfield Ave</div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-1/2">
            <div className="flex w-full flex-row sm:w-1/2">
              <div className="flex flex-col gap-2">
                <div className="text-xs ">Apt</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-3 xl:flex-row">
          <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-1/2">
            <div className="flex w-full flex-row sm:w-1/2">
              <div className="flex flex-col gap-2">
                <div className="text-xs ">City</div>
                <div className="text-sm font-semibold">Agoura Hill</div>
              </div>
            </div>
            <div className="flex w-full flex-row sm:w-1/2">
              <div className="flex flex-col gap-2">
                <div className="text-xs ">State</div>
                <div className="text-sm font-semibold">CA</div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-1/2">
            <div className="flex w-full flex-row sm:w-1/2">
              <div className="flex flex-col gap-2">
                <div className="text-xs ">Country</div>
                <div className="text-sm font-semibold">United States</div>
              </div>
            </div>
            <div className="flex w-full flex-row sm:w-1/2">
              <div className="flex flex-col gap-2">
                <div className="text-xs ">Source</div>
                <div className="text-sm font-semibold">Paper Card</div>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-black" />
        <div className="pt-3 text-lg font-extrabold ">Civic Details</div>
        <div className="flex flex-col gap-3 py-3 xl:flex-row">
          <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-1/2">
            <div className="flex w-full flex-row sm:w-1/2">
              <div className="flex flex-col gap-2">
                <div className="text-xs ">Congressional District</div>
                <div className="text-sm font-semibold">
                  Congressional District 28
                </div>
              </div>
            </div>
            <div className="flex w-full flex-row sm:w-1/2">
              <div className="flex flex-col gap-2">
                <div className="text-xs ">State Senate District</div>
                <div className="text-sm font-semibold">
                  California State Senate district 27
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-1/2">
            <div className="flex w-full flex-row sm:w-1/2">
              <div className="flex flex-col gap-2">
                <div className="text-xs ">Assembly District</div>
                <div className="text-sm font-semibold">
                  California Assembly district 50
                </div>
              </div>
            </div>
            <div className="flex w-full flex-row sm:w-1/2">
              <div className="flex flex-col gap-2">
                <div className="text-xs ">Civics Last Updated</div>
                <div className="text-sm font-semibold">04/21/2022</div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-3 border-black" />
        <div className="flex flex-col gap-3 pt-3 pb-12 xl:flex-row">
          <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-1/2">
            <div className="flex w-full flex-row sm:w-1/2">
              <div className="flex flex-col gap-2">
                <div className="text-xs ">Comments</div>
                <div className="text-sm font-semibold">
                  Comments about the propety go here
                </div>
              </div>
            </div>
            <div className="flex w-full flex-row sm:w-1/2">
              <div className="flex flex-col gap-2">
                <div className="text-xs ">Date Firset Known Valid</div>
                <div className="text-sm font-semibold">04/21/2022</div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-1/2">
            <div className="flex w-full flex-row sm:w-1/2">
              <div className="flex flex-col gap-2">
                <div className="text-xs ">Date Last Known Valid</div>
                <div className="text-sm font-semibold">04/26/2022</div>
              </div>
            </div>
            <div className="flex w-full flex-row sm:w-1/2">
              <div className="flex flex-col gap-2">
                <div className="text-xs ">Date Marked Invalid</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(AddressReport);
