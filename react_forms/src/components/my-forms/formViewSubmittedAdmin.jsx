import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.css";
import React, { useContext } from "react";
import axiosInstance from '../app/api';
import { Context } from "../app/context";

export default function FormViewSubmittedAdmin({formInfo}) {  

    const {userInfo, convertDate, handleFileDownload} = useContext(Context);

    const getPaymentActivationForm = () => {
      axiosInstance
      .get(
        '/api/payment-activation/'
      )
      .then(response => {
    })
      .catch(error => {
      console.log(error.response)})
    }
  

    return(

<div>
                    <Typography className="form-field-title" gutterBottom variant = 'h5'>Administrator - Payment Activation Form</Typography>
              <Typography gutterBottom variant = 'body2'>This form is used to activate payment.</Typography>
              <hr />
                <Typography className="form-field-title" gutterBottom variant = 'h6'>User Information</Typography>
                <hr />
                <Typography
                   gutterBottom
                   variant="body1"
                   className="form-field-title"
                 >
                   First Name
                 </Typography>
                 <Typography gutterBottom variant="body1">
                   {formInfo.first_name}
                 </Typography>
                 <Typography
                   gutterBottom
                   variant="body1"
                   className="form-field-title"
                 >
                   Last Name
                 </Typography>
                 <Typography gutterBottom variant="body1">
                   {formInfo.last_name}
                 </Typography>
                 <Typography
                   gutterBottom
                   variant="body1"
                   className="form-field-title"
                 >
                   Student Number
                 </Typography>
               
                 <Typography gutterBottom variant="body1">
                   {formInfo.student_number}
                 </Typography>
                 <Typography
                   gutterBottom
                   variant="body1"
                   className="form-field-title"
                 >
                   Email
                 </Typography>
                 <Typography gutterBottom variant="body1">
                   {formInfo.email}
                 </Typography>
                 <Typography
                   gutterBottom
                   variant="body1"
                   className="form-field-title"
                 >
                   Faculty
                 </Typography>
                 <Typography gutterBottom variant="body1">
                   {formInfo.faculty}
                 </Typography>
                 <Typography
                   gutterBottom
                   variant="body1"
                   className="form-field-title"
                 >
                   Graduate Unit (Department)
                 </Typography>
                 <Typography gutterBottom variant="body1">
                   {formInfo.graduate_unit}
                 </Typography>
                 <Typography
                   gutterBottom
                   variant="body1"
                   className="form-field-title"
                 >
                   Degree Program
                 </Typography>
                 <Typography gutterBottom variant="body1">
                   {formInfo.program}
                 </Typography>
                 <Typography
                   gutterBottom
                   variant="body1"
                   className="form-field-title"
                 >
                   Start date of degree program
                 </Typography>
                 <Typography gutterBottom variant="body1">
                   {formInfo.degree_start_date}
                 </Typography>
                 <Typography
                   gutterBottom
                   variant="body1"
                   className="form-field-title"
                 >
                   Funding agency (required)
                 </Typography>
                 <Typography gutterBottom variant="body1">
                   {formInfo.award}
                 </Typography>
                 <Typography
                   gutterBottom
                   variant="body1"
                   className="form-field-title"
                 >
                   Duration (required)
                 </Typography>
                 <Typography gutterBottom variant="body1">
                   {formInfo.award_duration}
                 </Typography>
     
                 {formInfo.award == 'Connaught' || formInfo.award == 'Trillium'?
                 <>
                 <Typography
                   gutterBottom
                   variant="body1"
                   className="form-field-title"
                 >
                   Type of payment requested (required)
                 </Typography>
                 <Typography variant = 'body1'>{formInfo.type_payment_request}</Typography>
                 </>
                 :null}
                 <Typography
                   gutterBottom
                   variant="body1"
                   className="form-field-title"
                 >
                   Requested start date (required)
                 </Typography>
                 <Typography variant = 'body1'> {formInfo.award_start_session}</Typography>
                 
                 <Typography variant="body1" className="form-field-title">
              Additional Documentation
            </Typography>
            {formInfo?.documents?.map((document) => (
              <Typography variant="subtitle2"><Link style = {{cursor:'pointer'}}underline = 'hover' onClick={() => {(handleFileDownload(document))}}>{document.name}</Link></Typography>
            ))}
               
                 <Typography
                   gutterBottom
                   variant="body1"
                   className="form-field-title"
                 >
                   Applicant Form Submitted: {convertDate(formInfo.submitted_at)}
                 </Typography>
     <hr/>
                 <Typography className="form-field-title" gutterBottom variant = 'h6'>Administration Information</Typography>
                 <hr/>

                 <Typography
                   gutterBottom
                   variant="body1"
                   className="form-field-title"
                 >
                   Submitted by
                 </Typography>
                 <Typography gutterBottom variant="body1">
                 {formInfo.admin_first_name} {formInfo.admin_last_name}
                 </Typography>

     {formInfo?.award_duration == 'CGS M (12 months)'?
     <>
                 <Typography
                   variant="body1"
                   className="form-field-title"
                 >
                   Indicate the nature of the research requirement(s) of the awardee's program (required)
                 </Typography>
                 <FormControl disabled component="fieldset">
                   <RadioGroup 
                     value={formInfo?.admin_research_requirement}

                     aria-label="start-date"
                     name="customized-radios"
                   >
                     <FormControlLabel
                       control={<Radio color="primary" />}
                       value="Thesis"
                       label="Thesis"
                     />
                     <FormControlLabel
                       control={<Radio color="primary" />}
                       value="Major Research Project/Paper"
                       label="Major Research Project/Paper"
                     />
                     <FormControlLabel
                       control={<Radio color="primary" />}
                       value="Other (specify)"
                       label="Other (specify)"
                     />
                   </RadioGroup>
                 </FormControl>
                 </>:null}
     
     
                 {formInfo?.award == 'OGS'?
     <>
                 <Typography
                   variant="body1"
                   className="form-field-title"
                 >
                   Matching portion will be paid from (required)
                 </Typography>
                 <FormControl disabled component="fieldset">
                   <RadioGroup
                     value={formInfo?.admin_matching_portion}
                     aria-label="start-date"
                     name="customized-radios"
                   >
                     <FormControlLabel
                       control={<Radio color="primary" />}
                       value="Non-RA Department resource (eg UTF or named OGS"
                       label="Non-RA Department resource (eg UTF or named OGS"
                     />
                     <FormControlLabel
                       control={<Radio color="primary" />}
                       value="Research assistantship through payroll"
                       label="Research assistantship through payroll"
                     />
                   </RadioGroup>
                 </FormControl>
                 </>:null}
                 {formInfo?.award == 'Connaught' || formInfo?.award == 'Trillium'?
                 <>
                 <Typography
                   variant="body1"
                   className="form-field-title"
                 >
     UTF (required)            
     </Typography>
     <TextField disabled
                     value={formInfo.admin_utf}
                     variant="outlined"
                     type="number"
                     InputProps={{
                       startAdornment: <InputAdornment position="start">$</InputAdornment>,
                     }}
                     fullWidth
                   />
     
     <Typography
                   variant="body1"
                   className="form-field-title"
                 >
     Departmental/Endowment (required)            
     </Typography>
     <TextField disabled
                     value={formInfo.admin_departmental_award}
                     variant="outlined"
                     type="number"
                     InputProps={{
                       startAdornment: <InputAdornment position="start">$</InputAdornment>,
                     }}
                     fullWidth
                   />
     
     <Typography
                   variant="body1"
                   className="form-field-title"
                 >
     Teaching Assistantship (required)            
     </Typography>
     <TextField disabled
                     value={formInfo.admin_ta}
                     variant="outlined"
                     type="number"
                     InputProps={{
                       startAdornment: <InputAdornment position="start">$</InputAdornment>,
                     }}
                     fullWidth
                   />
     
     <Typography
                   variant="body1"
                   className="form-field-title"
                 >
     Research Assistantship (required)            
     </Typography>
     <TextField disabled
                     value={formInfo.admin_ra}
                     variant="outlined"
                     type="number"
                     InputProps={{
                       startAdornment: <InputAdornment position="start">$</InputAdornment>,
                     }}
                     fullWidth
                   />
     
     <Typography
                   variant="body1"
                   className="form-field-title"
                 >
     Other Source (optional)            
     </Typography>
     <TextField  disabled
                     value={formInfo.admin_other_source}
                     variant="outlined"
                     type="number"
                     InputProps={{
                       startAdornment: <InputAdornment position="start">$</InputAdornment>,
                     }}
                     fullWidth
                   />
     
     <Typography
                   variant="body1"
                   className="form-field-title"
                 >
     Total            
     </Typography>
     <Typography
                   variant="body1"
                 >
     ${+formInfo.admin_utf + +formInfo.admin_departmental_award + +formInfo.admin_ta + +formInfo.admin_ra + +formInfo.admin_other_source}            
     </Typography>
     </>
     :null}
                 <Typography
                   variant="body1"
                   className="form-field-title"
                 >
     Payment Notes (optional)            
     </Typography>
     <TextField disabled value = {formInfo.admin_payment_notes} variant='outlined' fullWidth multiline rows = {5} rowsMax={10}/>
     <Typography
                   variant="body1"
                   className="form-field-title"
                 >
     Supplemental Award Letter Notes (optional)            
     </Typography>
     <TextField disabled value = {formInfo.admin_award_letter_notes} variant='outlined' fullWidth multiline rows = {5} rowsMax={10}/>

     <Checkbox disabled
                       checked='true'
                       color="primary"
                     />
                   <Typography style = {{marginLeft: 50, marginTop: -35, color: 'grey'}} variant="body2">
     
                     I confirm that above info is correct and                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                     enim ad minim veniam, quis nostrud exercitation ullamco laboris
                     nisi ut aliquip ex ea commodo consequat.
                   </Typography>
                 
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Administration Form Submitted: {convertDate(formInfo.admin_submitted_at)}
            </Typography>
        </div>
    )
}