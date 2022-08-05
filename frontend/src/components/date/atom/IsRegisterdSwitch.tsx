import Switch from "@mui/material/Switch";

interface PROPS_IS_REGISTERD {
  is_registerd: boolean;
}

export const IsRegisterdSwitch = (props: PROPS_IS_REGISTERD) => {
  const { is_registerd } = props;
  return (
    <>
      <Switch checked={is_registerd} />
    </>
  );
};
