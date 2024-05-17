import { create, getTasks, updateTask } from "@/store/taskStore";
import { z, ZodType } from "zod";

type FormData1 = {
  createdBy?: string;
  assignedTo?: string;
  project?: string;
  sprint?: string;
  taskId?: string;
  taskDesc: string;
  taskType: string;
  estimate?: number;
  status?: string;
  startDate?: Date;
  endDate?: Date;
};
// This will be the schema for the form, it'll be used to validate the form when submitting.
//z.coerce.date() is used to convert the string to a date object.
const dateSchema: ZodType<FormData1> = z
  .object({
    createdBy: z.coerce.string(),
    assignedTo: z.coerce.string(),
    project:z.coerce.string(),
    sprint:z.coerce.string(),
    taskId: z.coerce.string(),
    taskDesc: z.coerce.string().min(1),
    taskType: z.coerce.string(),
    estimate: z.coerce.number(),
    status: z.coerce.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date cannot be earlier than start date.",
    path: ["endDate"],
  });

const getValue = (data: FormDataEntryValue | null): string => {
  if (!data) return "";
  else return data.toString();
};

async function addTask(
  prevState:
    | {
        project?: string;
        sprint?: string;
        createdBy?: string;
        assignedTo?: string;
        taskId?: string;
        taskDesc?: string;
        taskType?: string;
        estimate?: number;
        status?: string;
        startDate?: string;
        endDate?: string;
      }
    | undefined,
  formData: FormData,
): Promise<{
  createdBy?: string;
  assignedTo?: string;
  project?: string;
  sprint?: string;
  taskId?: string;
  taskDesc?: string;
  taskType?: string;
  estimate?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
}> {
  const result = dateSchema.safeParse({
    createdBy: formData.get("createdBy"),
    assignedTo: formData.get("assignedTo"),
    project: formData.get("project"),
    sprint: formData.get("sprint"),
    taskId: formData.get("taskId"),
    taskDesc: formData.get("taskDesc"),
    taskType: formData.get("taskType"),
    estimate: formData.get("estimate"),
    status: formData.get("status"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  });
  console.log(result);
  try {
    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);
      const { startDate, endDate, taskDesc } =
        result.error.formErrors.fieldErrors;
      return new Promise((resolve) => {
        resolve({ endDate: endDate ? endDate[0] : "" });
      });
    } else {
      await create({ ...result.data, status: "assigned", createdBy: "hari" });
      return {};
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getTaskList(username: string | undefined) {
  const x = await getTasks(username);
  console.log(x);
  return x;
}

// const result = UpdateTaskList(
//   const x= await updateTask(taskId: string, status: string, path: string, data:any);
//   console.log(x)
//   // employeeID,
//   // `leaves.${year}.${leave.type}.${startDateKey}`,
//   // leaveEntry,
// );

export { addTask, getTaskList };
