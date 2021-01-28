import React from "react";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { ContactSupport } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { CopyToClipboardText } from "../../../components/CopyToClipboardText";
import { NATIONALITY_HUMAN_NAMES } from "../../../components/constants/nationality";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export function ContactsTable({ data }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} data-testid="contacts-table-container">
      <Table className={classes.table} aria-label="contacts table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Full name</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((contact) => (
            <TableRow key={contact.login.uuid}>
              <TableCell component="th" scope="row">
                <Avatar alt="" src={contact.picture.thumbnail} />
              </TableCell>
              <TableCell>{contact.name.first}</TableCell>
              <TableCell>
                <Typography>
                  {format(parseISO(contact.dob.date), "MM/dd/yyyy")}
                </Typography>
                <Typography>{contact.dob.age} years</Typography>
              </TableCell>
              <TableCell>
                <CopyToClipboardText text={contact.phone} />
              </TableCell>
              <TableCell>
                <CopyToClipboardText text={contact.email} />
              </TableCell>
              <TableCell>
                <Typography>{contact.location.country}</Typography>
                <Typography>{contact.location.city}</Typography>
                <Typography>
                  {contact.location.street.name},
                  {contact.location.street.number}
                </Typography>
              </TableCell>
              <TableCell align="right">
                {NATIONALITY_HUMAN_NAMES[contact.nat]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
