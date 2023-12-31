import { Box, Checkbox, Chip, Container, Fab, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Stack, SwipeableDrawer, TextField, Tooltip, Typography } from "@mui/material"
import AppBreadCrumbs from "../../components/BreadCrumbs"
import { BREADCRUMBS, TABLE_HEADS } from "./constants"
import ExplicitTable, { StyledTableCell, StyledTableRow } from "../../components/ExplicitTable"
import { useNavigate } from "react-router"
import Icons from "../../common/icons"
import { ROUTES } from "../../Layout/Navigation/constants"
import { useDispatch, useSelector } from "react-redux"
import { classesRequested, expiringVouchersRequested, getClassSearch, getClassesList, getDialogOpen, getDrawerOpen, getDrawerUSer, getDueDateSearch, getPaymentStatusSearch, getRerence, getSearch, getShowExpiring, getStartDateSearch, getStudentSearch, getStudentsList, getVouchersList, handleChangeDrawerOpen, handleChangeDrawerUser, handleChangeDueDateSearch, handleChangePaymentModeSearch, handleChangeShowExpiring, handleChangeStartDateSearch, handleChangeVoucherID, handleChangeVoucherModalOpen, handleChangeVoucherPaid, handleChangeVoucherPaymentMode, handleChangeVoucherPaymentReference, handleChangeVoucherSearch, handleChangeVoucherSearchClass, handleChangeVoucherSearchStudent, studentsRequested, vouchersRequested } from "./voucherSlice"
import React from "react"
import PreviewVoucher from "../PreviewVoucher"
import Dialog from "../../components/Dialog"
import { openErrorToast, openSuccessToast } from "../../common/toast"
import { deleteVoucherApi, putVoucherApi } from "../../api"
import EasyPaisaIcon from './media/easypaisa.png'
import JazzCashIcon from './media/jazzcash.png'
import BankIcon from './media/bank.png'
import NothingFound from "../../components/NothingFound"
import { handleAddLoading, handleRemoveLoading } from "../../common/commonSlice"
import JsPDF from 'jspdf';
import TablePaginationActions from "../../components/TablePaginationActions"

const Vouchers = () => {
    const navigate = useNavigate()
    const vouchersList = useSelector(getVouchersList)
    const studentsList = useSelector(getStudentsList)
    const classList = useSelector(getClassesList)
    const dispatch = useDispatch()
    const drawerOpen = useSelector(getDrawerOpen)
    const drawerUser = useSelector(getDrawerUSer)
    const dialogOpen = useSelector(getDialogOpen)
    const reference = useSelector(getRerence)
    const search = useSelector(getSearch)
    const showExpiring = useSelector(getShowExpiring)

    const classSearch = useSelector(getClassSearch)
    const studentSearch = useSelector(getStudentSearch)
    const paymentStatusSearch = useSelector(getPaymentStatusSearch)
    const startDateSearch = useSelector(getStartDateSearch)
    const dueDateSearch = useSelector(getDueDateSearch)

    const [searchArr, setSearchArr] = React.useState([])

    const [currentPage, setCurrentPage] = React.useState(0)
    const [recordsPerPage, setRecordsPerPage] = React.useState(10)
    const [recordsFound, setRecordsFound] = React.useState(0)


    const generatePDF = () => {

        const report = new JsPDF('l', 'pt', 'a4');
        report.html(document.querySelector('#report'), {
            margin: 1.25
        }).then(() => {
            report.save('report.pdf');
        })
    }


    const tableActionButtons = [
        {
            label: "Challans",
            variant: "contained",
            action: (student) => {
                dispatch(handleChangeDrawerOpen(true))
                dispatch(handleChangeDrawerUser(student))
            },
            icon: Icons.ReceiptLong,
            color: "warning"
        },
        {
            label: "Edit",
            variant: "contained",
            action: (student) => {
                dispatch(handleChangeDrawerUser(student))
                dispatch(handleChangeVoucherModalOpen(true))
            },
            icon: Icons.BorderColor,
            color: "primary"
        },
        {
            label: "Delete",
            variant: "contained",
            action: async (student) => {
                try {
                    await deleteVoucherApi({ id: student.id })
                    dispatch(vouchersRequested()).unwrap()
                    openSuccessToast("Record Deleted")
                } catch (err) {
                    openErrorToast(err.message ? err.message : err)
                }
            },
            icon: Icons.Delete,
            color: "error"
        }
    ]

    React.useEffect(() => {
        dispatch(handleAddLoading())
        dispatch(studentsRequested()).unwrap()
        dispatch(classesRequested()).unwrap()
        dispatch(vouchersRequested()).unwrap()
        dispatch(handleRemoveLoading())

        return () => {
            dispatch(studentsRequested()).unwrap()
            dispatch(classesRequested()).unwrap()
            dispatch(vouchersRequested()).unwrap()
        }
    }, [])

    React.useEffect(() => {
        if (search) {
            if (searchArr.length > 0) {
                setSearchArr(searchArr.filter(ele => ele.voucher_id.toLowerCase().includes(search.toLowerCase())))
                setRecordsFound(searchArr.filter(ele => ele.voucher_id.toLowerCase().includes(search.toLowerCase())).length)
            } else {
                setSearchArr(vouchersList.filter(ele => ele.voucher_id.toLowerCase().includes(search.toLowerCase())))
                setRecordsFound(vouchersList.filter(ele => ele.voucher_id.toLowerCase().includes(search.toLowerCase())).length)
            }
        } else {
            setSearchArr(vouchersList)
        }
    }, [search])

    React.useEffect(() => {
        if (classSearch) {
            if (searchArr.length > 0) {
                setSearchArr(searchArr.filter(ele => ele.classId === classSearch))
                setRecordsFound(searchArr.filter(ele => ele.classId === classSearch).length)
            } else {
                setSearchArr(vouchersList.filter(ele => ele.classId === classSearch))
                setRecordsFound(vouchersList.filter(ele => ele.classId === classSearch).length)

            }
        } else {
            setSearchArr(vouchersList)
        }
    }, [classSearch])


    React.useEffect(() => {
        if (studentSearch) {
            if (searchArr.length > 0) {
                setSearchArr(searchArr.filter(ele => ele.studentId === studentSearch))
                setRecordsFound(searchArr.filter(ele => ele.studentId === studentSearch).length)
            } else {
                setSearchArr(vouchersList.filter(ele => ele.studentId === studentSearch))
                setRecordsFound(vouchersList.filter(ele => ele.studentId === studentSearch).length)
            }
        } else {
            setSearchArr(vouchersList)
        }
    }, [studentSearch])

    React.useEffect(() => {
        if (startDateSearch) {
            if (searchArr.length > 0) {
                setSearchArr(searchArr.filter(ele => new Date(ele.createdAt).getTime() >= new Date(startDateSearch).getTime()))
                setRecordsFound(searchArr.filter(ele => new Date(ele.createdAt).getTime() >= new Date(startDateSearch).getTime()).length)
            } else {
                setSearchArr(vouchersList.filter(ele => new Date(ele.createdAt).getTime() >= new Date(startDateSearch).getTime()))
                setRecordsFound(vouchersList.filter(ele => new Date(ele.createdAt).getTime() >= new Date(startDateSearch).getTime()).length)
            }
        } else {
            setSearchArr(vouchersList)
        }
    }, [startDateSearch])

    React.useEffect(() => {
        if (dueDateSearch) {
            if (searchArr.length > 0) {
                setSearchArr(searchArr.filter(ele => new Date(ele.createdAt).getTime() <= new Date(dueDateSearch).getTime()))
                setRecordsFound(searchArr.filter(ele => new Date(ele.createdAt).getTime() <= new Date(dueDateSearch).getTime()).length)
            } else {
                setSearchArr(vouchersList.filter(ele => new Date(ele.createdAt).getTime() <= new Date(dueDateSearch).getTime()))
                setRecordsFound(vouchersList.filter(ele => new Date(ele.createdAt).getTime() <= new Date(dueDateSearch).getTime()).length)
            }

        } else {
            setSearchArr(vouchersList)
        }
    }, [dueDateSearch])

    React.useEffect(() => {
        if (paymentStatusSearch === "paid") {
            setSearchArr(vouchersList.filter(ele => ele.is_paid))
        }
        else if (paymentStatusSearch === "unpaid") {
            setSearchArr(vouchersList.filter(ele => ele.is_paid === false))
        }
        else {
            setSearchArr(vouchersList)
        }
    }, [paymentStatusSearch])


    React.useEffect(() => {
        if (vouchersList.length > 0) {
            setSearchArr(vouchersList)
        }
    }, [vouchersList])

    const loadExpiring = async () => {
        try {
            dispatch(handleAddLoading())
            dispatch(studentsRequested()).unwrap()
            dispatch(classesRequested()).unwrap()
            dispatch(expiringVouchersRequested()).unwrap()
            dispatch(handleRemoveLoading())
        } catch (err) {
            openErrorToast(err.message ? err.message : err)
        }
    }

    const loadGeneral = async () => {
        try {
            dispatch(handleAddLoading())
            dispatch(studentsRequested()).unwrap()
            dispatch(classesRequested()).unwrap()
            dispatch(vouchersRequested()).unwrap()
            dispatch(handleRemoveLoading())
        } catch (err) {
            openErrorToast(err.message ? err.message : err)
        }
    }

    React.useEffect(() => {
        if (showExpiring) {
            loadExpiring()
        } else {
            loadGeneral()
        }
    }, [showExpiring])

    React.useEffect(() => {
        setRecordsFound(vouchersList.length)
    }, [vouchersList])

    return (
        <Container maxWidth="xl">
            <AppBreadCrumbs counts={recordsFound} pageTitle={"Vouchers"} paths={BREADCRUMBS} />
            <Grid container maxWidth="xl" sx={{
                p: 2,
                mb: 2,
                boxShadow: theme => theme.shadows[5],
                background: theme => theme.palette.background.paper,
            }}>
                <Grid container spacing={1} item xs={!2} md={12} sx={{
                    mb: 1,
                    pt: 1
                }} >
                    <Grid item xs={12} md={2}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Search By Voucher Id"
                            value={search}
                            onChange={e => {
                                dispatch(handleChangeVoucherSearch(e.target.value))
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <FormControl required fullWidth size="small">
                            <InputLabel>Class</InputLabel>
                            <Select
                                label="Class"
                                value={classSearch || ""} onChange={e => {
                                    dispatch(handleChangeVoucherSearchClass(e.target.value))
                                }}>
                                <MenuItem value={""}>{"Please select"}</MenuItem>
                                {classList.length > 0 ?
                                    classList.map(c => (
                                        <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                                    ))
                                    : ""}

                            </Select>

                        </FormControl>
                    </Grid>


                    <Grid item xs={12} md={2}>
                        <FormControl required fullWidth size="small">
                            <InputLabel>Student</InputLabel>
                            <Select
                                label="Student"
                                value={studentSearch || ""} onChange={e => {
                                    dispatch(handleChangeVoucherSearchStudent(e.target.value))
                                }}>
                                <MenuItem value={""}>{"Please select"}</MenuItem>
                                {studentsList.length > 0 ?
                                    studentsList.map(c => (
                                        <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                                    ))
                                    : ""}

                            </Select>

                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField
                            type="date"
                            fullWidth
                            size="small"
                            label="Start Date"
                            value={startDateSearch}
                            onChange={e => dispatch(handleChangeStartDateSearch(e.target.value))}
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField
                            type="date"
                            fullWidth
                            size="small"
                            label="End Date"
                            value={dueDateSearch}
                            onChange={e => dispatch(handleChangeDueDateSearch(e.target.value))}
                        />
                    </Grid>


                    {/* <Grid item xs={12} md={1.5}>
                        <FormControl required fullWidth size="small">
                            <InputLabel>Payment Status</InputLabel>
                            <Select
                                label="Payment Status"
                                value={paymentStatusSearch} onChange={e => {
                                    dispatch(handleChangePaymentModeSearch(e.target.value))
                                }}>
                                <MenuItem value={""}> Please Select </MenuItem>
                                <MenuItem value={""}>Paid</MenuItem>
                                <MenuItem value={"unpaid"}>Unpaid</MenuItem>

                            </Select>

                        </FormControl>
                    </Grid> */}
                    <Grid item xs={12} md={2}>
                        <FormControlLabel label="Show Expiring" control={<Checkbox checked={showExpiring} onChange={e => {
                            dispatch(handleChangeShowExpiring(e.target.checked))
                        }} icon={<Icons.Rule />} checkedIcon={<Icons.Rule />} />} />
                    </Grid>



                </Grid>
                <Grid item xs={!2} md={12} sx={{

                }}>
                    {(searchArr.length > 0 && studentsList.length > 0 && classList.length > 0) ?
                        <ExplicitTable tableSize="small" columns={TABLE_HEADS}>
                            {(searchArr.length > 0 ? searchArr.slice(currentPage * recordsPerPage, (currentPage * recordsPerPage) + recordsPerPage) : searchArr).map(v => (
                                <StyledTableRow key={v.id} sx={{
                                    background: theme => (new Date(v.date_expiry) <= new Date() && !v.is_paid) ? theme.palette.error.light : theme.palette.background.paper,
                                }}>
                                    <StyledTableCell >{v.voucher_id}</StyledTableCell>
                                    <StyledTableCell >{studentsList.find(std => std.id === v.studentId).name}</StyledTableCell>
                                    <StyledTableCell >{classList.find(c => c.id === v.classId).name}</StyledTableCell>
                                    <StyledTableCell >{v.date_issued}</StyledTableCell>
                                    <StyledTableCell >{v.date_expiry}</StyledTableCell>
                                    <StyledTableCell >{v.is_paid ? <Chip label="Paid" color="success" size="small" sx={{ px: 2 }} /> : <Chip label="UnPaid" color="error" size="small" sx={{ px: 2 }} />}</StyledTableCell>
                                    <StyledTableCell sx={{}}>
                                        Mode: {v.payment_mode}<br />
                                        {v.config.reference ? "Ref: " + v.config.reference : ""}

                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {tableActionButtons.map(btn => (
                                            <IconButton color={btn.color} onClick={() => btn.action(v)}>
                                                <btn.icon />
                                            </IconButton>
                                        ))}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </ExplicitTable>

                        : <NothingFound pageIcon={{
                            icon: Icons.ReceiptLong
                        }} pageTitle="Voucher" action={() => navigate(`/${ROUTES.setupVoucher}`)} />}
                </Grid>
            </Grid>


            <Grid container maxWidth="xl" sx={{
                p: 2,
                boxShadow: theme => theme.shadows[5],
                background: theme => theme.palette.background.paper,
            }}>

                <Grid item xs={!2} md={12}>
                    <TablePaginationActions
                        count={recordsFound}
                        page={currentPage}
                        rowsPerPage={recordsPerPage}
                        onPageChange={(e, val) => {
                            setCurrentPage(val)
                        }}
                        onRowsPerPageChange={(e) => { setRecordsPerPage(e.target.value) }}
                    />
                </Grid>
            </Grid>



            <Tooltip placement="top" title="Add New Student">
                <Fab color="primary" onClick={() => { navigate(`/${ROUTES.setupVoucher}`) }} sx={{
                    position: "absolute",
                    right: 50,
                    bottom: 50
                }}>
                    <Icons.Add />
                </Fab>
            </Tooltip>


            {drawerUser &&
                <SwipeableDrawer
                    PaperProps={{
                        sx: { px: 2 },
                    }}
                    anchor={"right"}
                    open={drawerOpen}
                    onClose={() => { }}
                    onOpen={() => {
                        dispatch(handleChangeDrawerOpen(true))
                    }}
                >
                    <Box>
                        <IconButton color="error" onClick={() => {
                            dispatch(handleChangeDrawerOpen(false))
                            dispatch(handleChangeDrawerUser(null))
                        }}>
                            <Icons.Close />
                        </IconButton>
                    </Box>
                    {drawerUser.is_paid ? <Typography sx={{
                        fontSize: 36,
                        fontWeight: 700,
                        border: "3px dashed green",
                        maxWidth: "fit-content",
                        px: 1,
                        py: 0.5,
                        color: "green",
                        position: "absolute",
                        transform: "rotate(45deg)",
                        top: 150,
                        right: 25,
                        zIndex: 1000
                    }}>PAID</Typography> : <Typography sx={{
                        fontSize: 36,
                        fontWeight: 700,
                        border: "3px dashed red",
                        maxWidth: "fit-content",
                        px: 1,
                        py: 0.5,
                        color: "red",
                        position: "absolute",
                        transform: "rotate(45deg)",
                        top: 150,
                        right: 25,
                        zIndex: 1000
                    }}>UNPAID</Typography>}
                    <Stack flexDirection={"row"} gap={1} id="report" onClick={generatePDF}>
                        {["Parents", "Office", "Bank"].map(e => (
                            <Box sx={{
                                border: '1px solid',
                                margin: "auto",
                                boxSizing: "content-box",
                                position: "relative",
                            }}>
                                <PreviewVoucher title={e} drawerUser={drawerUser} studentsList={studentsList} classList={classList} />
                            </Box>
                        ))}
                    </Stack>
                </SwipeableDrawer>
            }

            <Dialog dailogOpen={dialogOpen} hasCloseIcon={true} clickAwayListener={false} size={"md"} title="Update Voucher Payment"
                handleClose={() => {
                    dispatch(handleAddLoading())
                    dispatch(handleChangeVoucherModalOpen(false))
                    dispatch(handleChangeVoucherPaid(false))
                    dispatch(handleChangeVoucherPaymentMode(""))
                    dispatch(handleChangeVoucherPaymentReference(""))
                    dispatch(handleRemoveLoading())
                }}
                actionsButtonArray={[
                    {
                        label: "Done",
                        color: "primary",
                        variant: "contained",
                        action: async () => {
                            try {
                                dispatch(handleAddLoading())
                                await putVoucherApi({
                                    id: drawerUser.id,
                                    date_issued: drawerUser.date_issued,
                                    date_expiry: drawerUser.date_expiry,
                                    config: drawerUser.config,
                                    payment_mode: drawerUser.payment_mode,
                                    is_paid: drawerUser.is_paid,
                                    classId: drawerUser.classId, studentId: drawerUser.studentId
                                })
                                dispatch(handleChangeVoucherModalOpen(false))
                                dispatch(vouchersRequested()).unwrap()
                                openSuccessToast("Record Updated")
                                dispatch(handleChangeVoucherPaid(false))
                                dispatch(handleChangeVoucherPaymentMode(""))
                                dispatch(handleChangeVoucherPaymentReference(""))
                                dispatch(handleRemoveLoading())
                            } catch (err) {
                                openErrorToast(err)
                                dispatch(handleRemoveLoading())
                            }
                        },
                        size: "small"
                    }
                ]}
            >
                {drawerUser && <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField label="Payment Status" fullWidth size="small" select value={drawerUser.is_paid} onChange={e => {
                            dispatch(handleChangeVoucherPaid(e.target.value))
                            if (e.target.value === false) {
                                dispatch(handleChangeVoucherPaymentMode(""))
                            }
                        }} >
                            <MenuItem value={false}>UnPaid</MenuItem>
                            <MenuItem value={true}>Paid</MenuItem>
                        </TextField>
                    </Grid>
                    {drawerUser.is_paid && <Grid item xs={12}>
                        <TextField label="Payment Mode" fullWidth size="small" select value={drawerUser.payment_mode} onChange={(e) => dispatch(handleChangeVoucherPaymentMode(e.target.value))} >
                            <MenuItem value={"cash"}>Cash</MenuItem>
                            <MenuItem value={"bank-deposit"}>Bank Deposit</MenuItem>
                            <MenuItem value={"easypaisa"}>Easypaisa</MenuItem>
                            <MenuItem value={"jazzcash"}>JazzCash</MenuItem>
                            <MenuItem value={"bank"}>Bank Transfer</MenuItem>
                        </TextField>
                    </Grid>}

                    {(drawerUser.is_paid) && <Grid item xs={12}>
                        <TextField label="Reference ID" fullWidth size="small" value={drawerUser.config.reference ? drawerUser.config.reference : reference} onChange={(e) => dispatch(handleChangeVoucherPaymentReference(e.target.value))} />
                    </Grid>}

                </Grid>}
            </Dialog>
        </Container>
    )
}

export default Vouchers