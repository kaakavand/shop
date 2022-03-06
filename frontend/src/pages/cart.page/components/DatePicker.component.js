// import moment from "moment";
// import React, { useState } from "react";
// import HijriUtils from "@date-io/hijri";
// import {
//     TimePicker,
//     DateTimePicker,
//     DatePicker,
//     MuiPickersUtilsProvider,
// } from "@material-ui/pickers";
// import "moment/locale/ar-sa";

// function HijriExample() {
//     const [selectedDate, handleDateChange] = useState(moment());

//     return (
//         <MuiPickersUtilsProvider utils={HijriUtils}>
//             <DatePicker
//                 clearable
//                 okLabel="موافق"
//                 cancelLabel="الغاء"
//                 clearLabel="مسح"
//                 labelFunc={(date) => (date ? date.format("iYYYY/iMM/iDD") : "")}
//                 value={selectedDate}
//                 onChange={() => console.log('yes')}
//                 minDate="1937-03-14"
//                 maxDate="2076-11-26"
//                 onClick={(e) => e.preventDefault()}
//             />
//         </MuiPickersUtilsProvider>
//     );
// }

// export default HijriExample;
