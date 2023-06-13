import { Assign } from "../../commons/models";
import { formatMediumDate } from "../../utils/dateFormat";

/** Get student enrolled day */
export const getEnrolledDate = (studentId: string, assigned: Assign[]) => {
  // TODO studentId type
  const result = assigned.filter((item) => item.student === studentId);

  return formatMediumDate(
    result && result.length > 0 ? result[0].assignedAt : ""
  );
};
