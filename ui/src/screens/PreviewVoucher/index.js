import { Box, Container, Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import ExplicitTable, { StyledTableCell, StyledTableRow } from "../../components/ExplicitTable"
import logo from '../Login/logo.jpg'
import JsPDF from 'jspdf';


const PreviewVoucher = ({ title, drawerUser, studentsList, classList }) => {


    return (
        <Container sx={{
            '&.MuiContainer-root': {
                paddingLeft: '10px',
                paddingRight: '10px',
                paddingTop: '10px',
                paddingBottom: '10px'
            }
        }} >
            <Grid container maxWidth={'191pt'}>
                <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography sx={{
                        textAlign: "center",
                        background: "#000",
                        color: "#fff",
                        px: 0.75,
                        py: 0.25,
                        maxWidth: "fit-content",
                        margin: "auto",
                        fontSize: 10
                    }}>{title} Copy</Typography>
                </Grid>

                <Grid item xs={3} >
                    <Box sx={{
                        width: 50,
                        margin: "auto",
                        mb: 0.25
                    }}>
                        <img width={"100%"} src={logo} alt="logo" />
                    </Box>
                </Grid>

                <Grid container item xs={9} sx={{ mb: 0.5}}>
                    <Grid item xs={12}>
                        <Typography sx={{
                            maxWidth: "fit-content",
                            margin: "auto",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            fontSize: 12,
                        }}>

                            Encore Group Of Colleges
                        </Typography>
                    </Grid>

                    <Grid item xs={3.5} >
                        <Typography sx={{
                            fontSize: 8
                        }}>
                            Student Name
                        </Typography>
                    </Grid>
                    <Grid item xs={8.5} >
                        <Typography sx={{
                            fontSize: 8,
                            fontWeight: "bold"
                        }}>
                            {studentsList.find(student => student.id === drawerUser.studentId).name}
                        </Typography>
                    </Grid>

                    <Grid item xs={3.5} >
                        <Typography sx={{
                            fontSize: 8
                        }}>Roll Number
                        </Typography>
                    </Grid>
                    <Grid item xs={8.5} >
                        <Typography sx={{
                            fontSize: 8,
                            fontWeight: "bold"
                        }}>
                            {drawerUser.studentId}
                        </Typography>
                    </Grid>

                    <Grid item xs={3.5} >
                        <Typography sx={{
                            fontSize: 8
                        }}>Class
                        </Typography>
                    </Grid>
                    <Grid item xs={8.5} >
                        <Typography sx={{
                            fontSize: 8,
                            fontWeight: "bold"
                        }}>
                            {classList.find(cl => cl.id === drawerUser.classId).name}
                        </Typography>
                    </Grid>


                </Grid>




                <Grid item xs={3} >
                    <Typography sx={{
                        fontSize: 8
                    }}>
                        Account No
                    </Typography>
                </Grid>
                <Grid item xs={9} >
                    <Typography sx={{
                        fontSize: 8,
                        fontWeight: "bold"
                    }}>
                        PK94HABB0013017900778003
                    </Typography>
                </Grid>


                <Grid item xs={3} >
                    <Typography sx={{
                        fontSize: 8
                    }}>
                        Account Title
                    </Typography>
                </Grid>
                <Grid item xs={9} >
                    <Typography sx={{
                        fontSize: 8,
                        fontWeight: "bold"
                    }}>
                        ANSAR ABBAS KHAN
                    </Typography>
                </Grid>
                <Grid item xs={3} >
                    <Typography sx={{
                        fontSize: 8
                    }}>
                        Bank Name
                    </Typography>
                </Grid>
                <Grid item xs={9} >
                    <Typography sx={{
                        fontSize: 8,
                        fontWeight: "bold",
                        mb: 0.5
                    }}>
                        Habib Bank Limited
                    </Typography>
                </Grid>


                <Grid item xs={3} >
                    <Typography sx={{
                        fontSize: 8
                    }}>
                        Account No
                    </Typography>
                </Grid>
                <Grid item xs={9} >
                    <Typography sx={{
                        fontSize: 8,
                        fontWeight: "bold"
                    }}>
                        PK52UNIL0109000224860985
                    </Typography>
                </Grid>


                <Grid item xs={3} >
                    <Typography sx={{
                        fontSize: 8
                    }}>
                        Account Title 
                    </Typography>
                </Grid>
                <Grid item xs={9} >
                    <Typography sx={{
                        fontSize: 8,
                        fontWeight: "bold"
                    }}>
                        ANSAR ABBAS KHAN
                    </Typography>
                </Grid>
                <Grid item xs={3} >
                    <Typography sx={{
                        fontSize: 8,
                        mb: 0.5
                    }}>
                        Bank Name
                    </Typography>
                </Grid>
                <Grid item xs={9} >
                    <Typography sx={{
                        fontSize: 8,
                        fontWeight: "bold"
                    }}>
                       United Bank Limited
                    </Typography>
                </Grid>

                <Grid item xs={3} >
                    <Typography sx={{
                        fontSize: 8
                    }}>
                        Account No
                    </Typography>
                </Grid>
                <Grid item xs={9} >
                    <Typography sx={{
                        fontSize: 8,
                        fontWeight: "bold"
                    }}>
                        +923083960931
                    </Typography>
                </Grid>


                <Grid item xs={3} >
                    <Typography sx={{
                        fontSize: 8
                    }}>
                        Account Title
                    </Typography>
                </Grid>
                <Grid item xs={9} >
                    <Typography sx={{
                        fontSize: 8,
                        fontWeight: "bold"
                    }}>
                        ANSAR ABBAS KHAN
                    </Typography>
                </Grid>
                <Grid item xs={3} >
                    <Typography sx={{
                        fontSize: 8
                    }}>
                        Bank Name
                    </Typography>
                </Grid>
                <Grid item xs={9} >
                    <Typography sx={{
                        fontSize: 8,
                        fontWeight: "bold"
                    }}>
                        Easypaisa / JazzCash
                    </Typography>
                </Grid>







                <Grid item xs={12} >
                    <Table size="small">
                        <TableHead >
                            <TableCell sx={{ fontWeight: "bold", fontSize: 8, p: 0 }}>Fee Type</TableCell>
                            <TableCell sx={{ textAlign: "right", fontSize: 8, p: 0, fontWeight: "bold" }}>Fee Amount</TableCell>
                        </TableHead>
                        <TableBody>
                            {drawerUser.config.fee_details.map(fee => (
                                <TableRow key={fee.fee_type}>
                                    <TableCell sx={{ fontSize: 8, p: 0 }} >{fee.fee_type}</TableCell>
                                    <TableCell sx={{ textAlign: "right", p: 0, fontSize: 8 }} ><b>PKR {fee.fee_amount} /-</b></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>

                <Grid item xs={6} ></Grid>
                <Grid item xs={6} >
                    <Table size="small">
                        <TableBody>
                            <TableRow >
                                <TableCell sx={{ fontSize: 8, p: 0 }} >Total Amount</TableCell>
                                <TableCell sx={{ textAlign: "right", fontSize: 8, p: 0 }} ><b>PKR {drawerUser.config.total_amount} /-</b></TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell sx={{ fontSize: 8, p: 0 }} >Discount</TableCell>
                                <TableCell sx={{ textAlign: "right", fontSize: 8, p: 0 }} ><b>{drawerUser.config.discount}%</b></TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell sx={{ fontSize: 8, p: 0 }} >Sub Total</TableCell>
                                <TableCell sx={{ textAlign: "right", fontSize: 8, p: 0 }} ><b>PKR {drawerUser.config.sub_total} /-</b></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>

                <Grid item xs={12}>
                    <Typography sx={{ fontSize: 8 }} >Important Notice</Typography>
                </Grid>
                <Grid item xs={12} sx={{ mb: 2 }}>
                    <Table>
                        <TableBody>
                            <TableRow sx={{ verticalAlign: "top" }}>
                                <TableCell sx={{ padding: 0, fontSize: 8, p: 0 }}>1</TableCell>
                                <TableCell sx={{ padding: 0, fontSize: 8, p: 0 }} width={"95%"} >There is no refund or transfer of submitted fee in any case </TableCell>
                            </TableRow>
                            <TableRow sx={{ verticalAlign: "top" }}>
                                <TableCell sx={{ padding: 0, fontSize: 8, p: 0 }}>2</TableCell>
                                <TableCell sx={{ padding: 0, fontSize: 8, p: 0, textDecoration: "underline" }} width={"95%"} >Tuition Fee must be paid before the last date of payment stated on the Fee Bill. A fine of <b>Rs. 100/- per day</b> will be charged after lapse of last date of payment.</TableCell>
                            </TableRow>
                            <TableRow sx={{ verticalAlign: "top" }}>
                                <TableCell sx={{ padding: 0, fontSize: 8, p: 0 }}>3</TableCell>
                                <TableCell sx={{ padding: 0, fontSize: 8, p: 0, }} width={"95%"} >If a student fails to pay tuition fee within 5 days after the last date of payment. He/She will not be permitted to sit in the class.</TableCell>
                            </TableRow>
                            <TableRow sx={{ verticalAlign: "top" }}>
                                <TableCell sx={{ padding: 0, fontSize: 8, p: 0 }}>4</TableCell>
                                <TableCell sx={{ padding: 0, fontSize: 8, p: 0, }} width={"95%"} > If a student fails to give fee bill to his/her parents. It is the responsibility of the parents to bring it to the notice of the school account officer <b>Rs. 100/-</b> will be charged if a fee bill is reported lost and duplicate copy asked for </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                </Grid>


                <Grid item xs={6} sx={{ mb: 1, display: "flex", gap: 1 }}>
                    <Typography sx={{
                        fontSize: 8
                    }}>
                        Date Issued
                    </Typography>
                    <Typography sx={{
                        fontSize: 8,
                        fontWeight: "bold"
                    }}>
                        {drawerUser.date_issued}
                    </Typography>
                </Grid>

                <Grid item xs={6} sx={{ mb: 1, display: "flex", gap: 1, justifyContent: "end" }}>
                    <Typography sx={{
                        fontSize: 8
                    }}>
                        Due Date
                    </Typography>
                    <Typography sx={{
                        fontSize: 8,
                        fontWeight: "bold"
                    }}>
                        {drawerUser.date_expiry}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default PreviewVoucher