import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterJalali from "@date-io/date-fns-jalali";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import * as moment from "jalali-moment";
import style from "../cart.module.scss";

export default function LocalizedDatePicker(props) {
    const [value, setValue] = React.useState(new Date());

    let persianDate = moment(value).locale("fa").format("YYYY/M/D");
    
    React.useEffect(() => {
        props.setDateValue(persianDate);
    }, [value]);

    return (
        <LocalizationProvider
            className={style.inputDate}
            dateAdapter={AdapterJalali}
        >
            <DatePicker
                mask="____/__/__"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
