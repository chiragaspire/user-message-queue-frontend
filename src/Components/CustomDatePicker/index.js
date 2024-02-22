import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

const CustomDatePicker = (props) => {
    const { label, onChange, value } = props
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DemoItem >
            <DatePicker label={label} onChange={(event) => onChange(event)} value={value} />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    );
  }

  export default CustomDatePicker;