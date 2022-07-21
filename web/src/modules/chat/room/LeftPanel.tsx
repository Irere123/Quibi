import avatar from "../../../img/avatar.jpg";
import avatar2 from "../../../img/avatar2.jpg";
import avatar3 from "../../../img/avatar3.jpg";
import { BoxedIcon } from "../../../ui/BoxedIcon";
import { PlusIcon } from "../../../icons";

import { SingleUser } from "../../../ui/UserAvatar";
import { useModalStore } from "../../../stores/useModalStore";
import { Modal } from "../../../ui/Modal";

const groups = [
  {
    id: 1,
    avatar: avatar.src,
  },
  {
    id: 2,
    avatar: avatar2.src,
  },
  {
    id: 3,
    avatar: avatar3.src,
  },
];

export const LeftPanel: React.FC = () => {
  const { openAddRoomModal, setOpenAddRoomModal } = useModalStore();
  return (
    <div className="flex flex-col items-center gap-5 cursor-pointer ">
      {groups.map((u: any, idx: number) => (
        <SingleUser key={idx + u.name} src={u.avatar} size="sm" outline />
      ))}
      <div onClick={() => setOpenAddRoomModal(!openAddRoomModal)}>
        <BoxedIcon circle>
          <PlusIcon />
        </BoxedIcon>
      </div>
      {openAddRoomModal && (
        <Modal
          isOpen={openAddRoomModal}
          onRequestClose={() => setOpenAddRoomModal(!openAddRoomModal)}
        >
          <p>Hello world</p>
        </Modal>
      )}
    </div>
  );
};
