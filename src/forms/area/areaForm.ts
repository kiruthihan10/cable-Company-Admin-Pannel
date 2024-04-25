import * as Yup from "yup";

export interface IAreaForm {
  name: string;
  agentId: string;
}

export const AreaFromInitialValues: IAreaForm = {
  name: "",
  agentId: "",
};

export const AreaFormValidation: Yup.ObjectSchema<IAreaForm> =
  Yup.object().shape({
    name: Yup.string().required(),
    agentId: Yup.string().required(),
  });
