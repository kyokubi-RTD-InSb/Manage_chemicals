import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { editChemPutIsRegisterd, selectChemPutInfo } from "../../../features/chemical/chemicalSlice";


interface PROPS_IS_REGISTERD {
  is_registerd: boolean;
  is_edit: boolean | undefined
}

export const IsRegisterdSwitch = (props: PROPS_IS_REGISTERD) => {
  const { is_registerd, is_edit } = props;

  const dispatch: AppDispatch = useDispatch()
  const chemPutInfo = useSelector(selectChemPutInfo)

  const handlePutChange = () => {
    dispatch(editChemPutIsRegisterd(!chemPutInfo.is_registerd));
  };

  return (
    <>
      <Switch checked={is_registerd} disabled={!is_edit} onChange={handlePutChange} />
    </>
  );
};
