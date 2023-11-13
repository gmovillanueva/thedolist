import {Circle, CheckCircle, PencilSimpleLine, TrashSimple} from "@phosphor-icons/react";

const objectDummy = {
  "0": {
    "id": 3,
    "description": "^",
    "is_completed": true,
    "is_pending": false,
    "created_at": "2023-11-12T19:38:44.058Z",
    "updated_at": "2023-11-12T19:38:44.058Z"
  },
  "status": 200,
  "jsonOutput": true
};

export function TaskCard() {
  return (
      <>
        <div className="flex justify-between items-center text-center w-full h-16 px-6 bg-gray-100 rounded-md border-2 border-violet-600 ">
          <div className="px-2 py-2">
            <Circle size={32} />
          </div>
          <p className="px-6 py-2 text-violet-600">{objectDummy["0"].description}</p>
          <div className="flex justify-center">
            <div className="px-2 py-2">
              <PencilSimpleLine size={24} />
            </div>
            <div className="px-2 py-2">
              <TrashSimple size={24} />
            </div>
          </div>
        </div>
      </>
  );
}
