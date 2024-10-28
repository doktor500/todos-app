import { v4 as uuidv4 } from "uuid";

const uniqueIdGenerator = {
  uuid: (): string => uuidv4(),
};

export default uniqueIdGenerator;
